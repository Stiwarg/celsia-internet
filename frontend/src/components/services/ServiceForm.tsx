import { useEffect, useState } from "react";
import type { IApiErrorResponse, IBackendValidationError, IServiceFormProps, IServiceUpdate, IServicios } from "../../types/celsia.types";
import { useForm, type SubmitHandler } from "react-hook-form";
import ServiceApi from "../../api/service.api";
import { AxiosError } from "axios";
import { TYPES_SERVICES_OPTIONS } from "../../utils/const";

export const ServiceForm = ({ mode, onSuccess, service, client, onCancel }: IServiceFormProps ) => {


    const [ serverError, setServerError ] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: { isSubmitting, errors }
    } = useForm<IServicios>()

    const onSubmit: SubmitHandler< IServicios > = async ( data ) => {
        clearErrors();
        setServerError("");

        if ( mode === "create" && !client ) return;
        try {
            if ( mode === "edit" && service ) {
                const updateData: IServiceUpdate = {
                    serviceNew: data.servicio
                }
                await ServiceApi.updateDataService(
                    service.identificacion,
                    updateData,
                    service.servicio
                )
                //reset( data );
                onSuccess?.()
            } else {
                if ( !client ) return;
                
                await ServiceApi.createService({ 
                    ...data,
                    identificacion: client.identificacion 
                });
                alert('Se ha creado correctamente el servicio.');
                reset();
                onSuccess?.()
            }
        } catch (error) {
            console.error( error );

            if ( error instanceof AxiosError ) {
                
                if ( mode === "create" ) {
                    const response = error.response?.data as IApiErrorResponse< IServicios >;
                    
                    if ( !response ) return;

                    if ( response.errors ) {
                        response.errors.forEach(( err: IBackendValidationError< IServicios > ) => {
                            setError(
                                err.field as keyof IServicios,
                                {
                                    type: "server",
                                    message: err.message
                                }
                            );
                        });
                    }
                    setServerError( response.message );
                } else {
                    const response = error.response?.data as IApiErrorResponse< IServiceUpdate >;

                    if ( !response ) return;

                    if ( response.errors ) {
                        response.errors.forEach(( err: IBackendValidationError< IServiceUpdate >) => {
                            if ( err.field === "serviceNew" ) {
                                setError("servicio",
                                    {
                                        type: 'server',
                                        message: err.message
                                    }
                                )

                            }
       
                        })
                    }
                    setServerError( response.message );
                 }
                
                return;

            }
        }
    }

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if ( mode === 'edit' && service ) {
            reset({
                ...service,
                fechaInicio: service.fechaInicio.split("T")[0],
                ultimaFacturacion: service.ultimaFacturacion.split("T")[0]
            });        
        } else {
            reset({
                servicio: "Internet 200 MB",
                fechaInicio: new Date().toISOString().split("T")[0],
                ultimaFacturacion: new Date().toISOString().split("T")[0],
                ultimoPago: 180000
            });
        }
    },[ reset, service, mode ]);

    return (
        <div className="bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-700 mb-6">

            <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-semibold text-white">{ mode  === "create" ? 'Agregar' : 'Editar' } Servicio</h2>
                <p className="text-sm text-zinc-400 mt-2">
                    { mode === "create" 
                        ? 'Complete la información del servicio.': 'Actualice la información del servicio.' 
                    }
                </p>

                {
                    serverError && (
                        <div className="mb-4 rounded-lg border border-red-500 bg-red-500/10 p-3 text-red-300">
                            { serverError }
                        </div>
                    )
                }

                <form 
                    onSubmit={ handleSubmit( onSubmit ) } 
                    className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div className="flex flex-col gap-1.5">
                        <label 
                            htmlFor="servicio"
                            className="text-sm font-medium text-zinc-300">
                            Servicio:
                        </label>
                        <select
                            className="w-full rounded-lg border border-zinc-600 bg-zinc-700/50 px-4 py-2.5 text-white placeholder:text-zinc-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition appearance-none cursor-pointer" 
                            id="servicio"
                            { ...register('servicio') }
                        >
                            {
                                TYPES_SERVICES_OPTIONS.map(({ value, label }) => (
                                    <option className="bg-zinc-800" value={ value } key={ value }>{ label }</option>
                                ))
                            }
                        </select>
                        {
                            errors.servicio?.message && (
                                <span className="text-sm text-red-400">
                                    { errors.servicio.message }
                                </span>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label 
                            className="text-sm font-medium text-zinc-300 "
                            htmlFor="fechaInicio"
                        >
                            Fecha Inicio:
                        </label>
                        <input 
                            className="w-full rounded-lg border border-zinc-600 bg-zinc-700/50 px-4 py-2.5 text-white placeholder:text-zinc-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition [color-schema:dark] disabled:bg-zinc-800 disabled:text-zinc-400 disabled:cursor-not-allowed"
                            type="date"
                            id="fechaInicio"
                            { ...register('fechaInicio') }
                            disabled={ mode === "edit" } 
                            max={ today }
                        />
                        {
                            errors.fechaInicio?.message && (
                                <span className="text-sm text-red-400">
                                    { errors.fechaInicio.message }
                                </span>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label 
                            className="text-sm font-medium text-zinc-300"
                            htmlFor="ultimaFacturacion"
                        >
                            Última Facturación:
                        </label>
                        <input 
                            className="w-full rounded-lg border border-zinc-600 bg-zinc-700/50 px-4 py-2.5 text-white placeholder:text-zinc-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition [color-schema:dark]
                            disabled:bg-zinc-800 disabled:text-zinc-400 disabled:cursor-not-allowed"
                            type="date"
                            id="ultimaFacturacion" 
                            { ...register('ultimaFacturacion') }
                            disabled={ mode === "edit" }
                            max={ today }
                        />
                        {
                            errors.ultimaFacturacion?.message && (
                                <span className="text-sm text-red-400">
                                    { errors.ultimaFacturacion.message }
                                </span>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label 
                            className="text-sm font-medium text-zinc-300"
                            htmlFor="ultimoPago"
                        >
                            Último Pago:
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                $
                            </span>
                            <input 
                                className="w-full rounded-lg border border-zinc-600 bg-zinc-700/50 pl-8 pr-4 py-2.5 text-white placeholder:text-zinc-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition disabled:bg-zinc-800 disabled:text-zinc-400 disabled:cursor-not-allowed"
                                type="number"
                                placeholder="0"
                                id="ultimoPago" 
                                { ...register('ultimoPago', { valueAsNumber: true } ) }
                                disabled={ mode === "edit" }
                                />
                        </div>
                        {
                            errors.ultimoPago?.message && (
                                <span className="text-sm text-red-400">
                                    { errors.ultimoPago.message }
                                </span>
                            )
                        }
                    </div>


                    <div className="md:col-span-2 flex justify-center gap-4 mt-2">
                        <button 
                            className="bg-yellow-500 hover:bg-yellow-400 active:scale-95 text-black font-semibold cursor-pointer border rounded-xl px-8 py-2.5 w-full md:w-auto min-w-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={ isSubmitting }
                        >
                            {
                                isSubmitting ? "Enviando datos..." :
                                mode === 'create' ? "Guardar Servicio" :
                                "Actualizar Servicio"
                            }
                        </button>
                        {
                            mode === "edit" && (
                                <button
                                    type="button"
                                    className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-xl px-8 py-2.5"
                                    onClick={ () => onCancel?.() }
                                >
                                    Cancelar
                                </button>
                            )
                        }
                    </div>

                </form>
            </div>
        </div>
    );
}