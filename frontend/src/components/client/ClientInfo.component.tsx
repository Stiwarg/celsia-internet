import { useState } from "react"
import ClientApi from "../../api/client.api"
import type { IClientInfoProps } from "../../types/celsia.types"
import { AxiosError } from "axios";

export const ClientInfo = ( {client, onEdit, onDelete }: IClientInfoProps ) => {

    //if (!client) return null;
    const [ serverError, setServerError ] = useState("");
    const [ isDeleting, setIsDeleting ] = useState( false );

    const handleDelete = async () => {
        if ( !client ) return;
        try {

            setIsDeleting( true );
            setServerError("");
            await ClientApi.deleteClient( client.identificacion );
            alert('Cliente eliminado correctamente.')
            onDelete?.();            
        } catch (error) {
            console.error(error);
            if ( error instanceof AxiosError ) {
                setServerError(
                    error.response?.data?.message ?? "Ocurrio un error."
                );
            }

        } finally {
            setIsDeleting(false);
        }

        
    }

    return (
        <div className="bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-700 mb-6">

            <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-semibold text-white">Información del cliente</h2>
                <p className="text-sm text-zinc-400 mt-2">Datos completos del cliente seleccionado.</p>
            </div>
            {
                serverError && (
                    <div className="mb-4 rounded-lg border border-red-500 bg-red-500/10 p-3 text-red-300">
                        { serverError }
                    </div>
                )
            }

            {client ? (
                <>
                    <div className="bg-zinc-900/50 rounded-lg p-4 md:p-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">

                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                    Identificación
                                </span>
                                <span className="text-white font-medium mt-1">
                                    { client.identificacion }
                                </span>
                            </div>

                            <div className="flex flex-col" >
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                    Nombre
                                </span>
                                <span className="text-white font-medium mt-1">
                                    { client.nombres }
                                </span>
                            </div>


                            <div className="flex flex-col" >
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                    Apellidos
                                </span>
                                <span className="text-white font-medium mt-1">
                                    { client.apellidos }
                                </span>
                            </div>

                            <div className="flex flex-col" >
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                    Tipo de Identificación
                                </span>
                                <span className="text-white font-medium mt-1">
                                    { client.tipoIdentificacion }
                                </span>
                            </div>

                            <div className="flex flex-col" >
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                    Celular
                                </span>
                                <span className="text-white font-medium mt-1">
                                    { client.numeroCelular }
                                </span>
                            </div>

                            <div className="flex flex-col"> 
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                    Correo
                                </span>
                                <span className="text-white font-medium mt-1">
                                    { client.correoElectronico }
                                </span>
                            </div>

                            <div className="flex flex-col md:col-span-2">
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                    Fecha de Nacimiento
                                </span>
                                <span className="text-white font-medium mt-1">
                                    { new Date( client.fechaNacimiento ).toLocaleDateString('es-CO') }
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-zinc-700">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold cursor-pointer border rounded-xl px-6 py-2.5 transition-all duration-200 flex items-center justify-center gap-2"
                        onClick={ onEdit }>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                        </button>

                        <button 
                            className="flex-1 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold cursor-pointer border rounded-xl px-6 py-2.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={ handleDelete }
                            disabled={ isDeleting }
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            { isDeleting ? 'Eliminando...' : 'Eliminar' }
                        </button>
                    </div>
                </>
            ) : (
                <div className="bg-zinc-900/50 rounded-lg p-8 text-center">
                    <p className="text-zinc-400">No hay ningún cliente seleccionado</p>
                    <p className="text-sm text-zinc-500 mt-1">Busque un cliente usnado el formulario de búsqueda</p>
                </div>
            )}
        </div>
    )
}