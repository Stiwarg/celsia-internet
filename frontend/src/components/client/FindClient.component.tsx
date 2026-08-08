import { useState } from "react";
import type { IApiErrorResponse, IBackendValidationError, IdentificacionKey, IFindClientProps } from "../../types/celsia.types";
import { useForm, type SubmitHandler } from "react-hook-form";
import ClientApi from "../../api/client.api";
import { AxiosError } from "axios";

export const FindClient = ({ onClientFound }: IFindClientProps ) => {


    const [ serverError, setServerError ] = useState("");
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<IdentificacionKey>();

    const onSubmit: SubmitHandler<{ identificacion: string }> = async ( data ) => {
        clearErrors();
        setServerError("");
        try {
            const client = await ClientApi.findClient( data.identificacion );
            onClientFound( client );

        } catch (error) {
            console.error( error );
            if ( error instanceof AxiosError ) {
                const response = error.response?.data as IApiErrorResponse<IdentificacionKey>;

                if ( !response ) return;

                setServerError("");

                if ( response.errors ) {
                    response.errors.forEach(( err: IBackendValidationError<IdentificacionKey> ) => {
                        setError(
                            err.field,{
                                type: "server",
                                message: err.message
                            }
                        );
                    });

                    return;
                }

                setServerError( response.message );
            }
        }
    }

    return (
        <div className="bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-700 mb-6">

            <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-semibold text-white">Buscar Cliente:</h2>
            </div>
            {
                serverError && (
                    <div className="mb-4 rounded-lg border border-red-500 bg-red-500/10 p-3 text-red-300">
                        { serverError }
                    </div>
                )
            }
            <form 
                onSubmit={ handleSubmit( onSubmit) } 
                className="flex flex-col md:flex-row items-end gap-4">
                <div className="flex-1 w-full">
                    <label
                        htmlFor="identificacion" 
                        className="text-sm font-medium text-zinc-300 block mb-1.5">Identificación:</label>
                    <input 
                        className="w-full rounded-lg border border-zinc-600 px-4 py-2.5 text-white placeholder:text-zinc-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition" type="text" 
                        placeholder="Ingrese la identificación"
                        { ...register('identificacion') }
                        id="identificacion"
                    />
                    { errors.identificacion?.message && (
                        <span className="mt-2 text-sm text-red-600">
                            { errors.identificacion.message }
                        </span>
                    )}

                </div>

                <button 
                    className="bg-yellow-500 hover:bg-yellow-400 active:scale-95 text-black font-semibold cursor-pointer border rounded-xl px-8 py-2.5 w-full md:w-auto min-w-37.5 transition-all duration-200 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed" 
                    type="submit"
                    disabled={ isSubmitting }
                >
                        { 
                            isSubmitting ? 'Buscando datos...' : 'Buscar'
                        }
                </button>
            </form>
        </div>
    );
}