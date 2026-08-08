import { InputField } from '../../shared/InputField';
import { useForm, type SubmitHandler,  } from 'react-hook-form';
import type { IApiErrorResponse, IBackendValidationError, IClientAttribute, IClientFormProps } from '../../types/celsia.types';
import ClientApi from '../../api/client.api';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { TYPE_IDENTIFICATION_OPTIONS } from '../../utils/const';

export const ClientForm = ({ mode, client, onSuccess }: IClientFormProps ) => {

    // setErrores = Permite crear errores manualmente
    // errors = Contiene todos los errores para mostrarlos en los campos 
    const [ serverError, setServerError ] = useState("");
    const { 
        register,
        handleSubmit, 
        reset,
        setError,
        clearErrors,
        formState: { isSubmitting, errors }
    } = useForm< IClientAttribute >({
        defaultValues: {
            tipoIdentificacion: "CC",
        }
    });

    const onSubmit: SubmitHandler< IClientAttribute > = async ( data ) => {
        clearErrors();
        setServerError("");
        console.log( "Datos a enviar: ", data );
        try {

            if ( mode === "edit" && client ) {
                await ClientApi.updateDataClient(
                    client.identificacion,
                    data
                );
                
                alert(`Los datos del cliente con identificación ${ client.identificacion } fueron actualizados correctamente.` );
                const updatedClient =await ClientApi.findClient( client.identificacion );
                onSuccess( updatedClient );
            } else {
                console.log( data );
                await ClientApi.createClient( data );
                alert('Se ha creado correctamente el cliente');
                reset();
                onSuccess?.()
            }

        } catch (error ) {
            console.error( error );

            if ( error instanceof AxiosError ) {
                
                const response = error.response?.data as IApiErrorResponse<IClientAttribute>;
                if ( !response ) return; 
                // Limpiar mensaje general anterior
                setServerError("");
                
                // Errores de zod
                if ( response.errors ) {
                    response.errors.forEach( ( err : IBackendValidationError<IClientAttribute>) => {
                        setError(
                            err.field as keyof IClientAttribute,
                            {
                                type: "server",
                                message: err.message
                            }
                        );
                    });

                    return;
                }
                // Error general
                setServerError( response.message );
            }
        }
    }


    // use
    useEffect(() => {
        if ( mode === "edit" && client ) {
            reset({ 
                ...client,
                fechaNacimiento: client.fechaNacimiento.split("T")[0]
        });
        } else {
            reset({
                identificacion: "",
                nombres: "",
                apellidos: "",
                correoElectronico: "",
                fechaNacimiento: "",
                numeroCelular: "",
                tipoIdentificacion: "CC"
            })
        }
    }, [ mode, client, reset ])

    const today = new Date().toISOString().split("T")[0];
    return (
        <div className="bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-700 mb-6">

            <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-semibold text-white">{ mode === "create" ? "Registrar Cliente" : "Editar Cliente" }</h2>
                <p className="text-sm text-zinc-400 mt-2">
                    { 
                        mode === "create" 
                        ? "Complete la información del cliente." 
                        : "Actualice la información del cliente."
                    }
                </p>
            </div>
            {
                serverError && (
                    <div className='mb-4 rounded-lg border border-red-500 bg-red-500/10 p-3 text-red-300'>
                        { serverError }
                    </div>
                )
            }
            <form onSubmit={ handleSubmit( onSubmit ) } className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField 
                    label="Identificación"
                    type='text'
                    placeholder='Ingrese la identificación'
                    id='identificacion'
                    { ...register('identificacion') }
                    error={ errors.identificacion?.message }
                    disabled={ mode === 'edit' }
                />
                <InputField 
                    label="Nombre"
                    type='text'
                    placeholder='Ingrese el nombre'
                    id='nombres'
                    { ...register('nombres') }
                    error={ errors.nombres?.message }

                />
                <InputField 
                    label="Apellido"
                    type='text'
                    placeholder='Ingrese el apellido'
                    id='apellidos'
                    { ...register('apellidos') }
                    error={ errors.apellidos?.message }
                />
                <InputField 
                    label="Correo"
                    type='email'
                    placeholder='Ingrese el correo'
                    id='correoElectronico'
                    { ...register("correoElectronico") }
                    error={ errors.correoElectronico?.message }
                />
                <InputField 
                    label="Fecha de Nacimiento"
                    type='date'
                    id='fechaNacimiento'
                    { ...register("fechaNacimiento") }
                    error={ errors.fechaNacimiento?.message }
                    max={ today }
                />
                <InputField 
                    label="Celular"
                    type='text'
                    placeholder='Ingrese el celular'
                    id='numeroCelular'
                    { ...register("numeroCelular") }
                    error={ errors.numeroCelular?.message }
                />
    
                <div className="flex flex-col gap-2">
                    <label 
                    htmlFor='tipoIdentificacion'
                    className="text-sm font-medium text-zinc-300">Seleccione el tipo de identificación:</label>
                    <select 
                    className="w-full rounded-lg border border-zinc-600 px-4 py-2 text-white placeholder:text-zinc-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition appearance-none cursor-pointer" id="tipo-identificacion"
                    {...register("tipoIdentificacion") }
                    >
                        { 
                            TYPE_IDENTIFICATION_OPTIONS.map(({ value, label }) => (
                                <option key={ value } value={ value } className='bg-zinc-800'>
                                    { label }
                                </option>
                            ))
                        }
                    </select>
                    {errors.tipoIdentificacion?.message && (
                        <span className="text-sm text-red-400">{errors.tipoIdentificacion.message}</span>
                    )}
                </div>

                <div className="md:col-span-2 flex justify-center mt-4">
                    <button 
                        className="bg-yellow-500 hover:bg-yellow-400 active:scale-95 text-black font-semibold cursor-pointer border rounded-xl px-8 py-2.5 w-full md:w-auto min-w-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                    type="submit"
                    disabled={ isSubmitting }
                    >
                        { isSubmitting ? "Enviando datos..." : mode === "create" ? "Crear Cliente" : "Actualizar Cliente"}
                    </button>
                </div>

            </form>
        </div>
    );
}
