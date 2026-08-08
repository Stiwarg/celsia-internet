import { useState } from "react"
import type { IServiceListProps, IServicios } from "../../types/celsia.types"
import ServiceApi from "../../api/service.api";
import { AxiosError } from "axios";

export const ServiceList = ( { services, onEdit, onDelete }: IServiceListProps ) => {

    const [ serverError, setServerError ] = useState("");
    const [ deletingService, setDeletingService ] = useState< string | null >(null)
    console.log('Estos son los servicios:',services );
    console.log('Estos es un array?:',Array.isArray( services ));
    const handleDelete = async ( service: IServicios ) => {

        try {
            setDeletingService( service.servicio );
            setServerError("");

            await ServiceApi.deleteService(
                service.identificacion,
                service.servicio
            )
            alert('El servicio se ha eliminado correctamente.');
            onDelete?.( service );
        } catch (error) {
            console.error(error);
            if ( error instanceof AxiosError ) {
                setServerError(
                    error.response?.data.message ?? 'Ocurrio un error.'
                );
            }
        } finally {
            setDeletingService( null );
        }
    }

    return (
        <div className="bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-700 mb-6">

            <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-semibold text-white">Servicios Contratados</h2>
                <p className="text-sm text-zinc-400 mt-2">
                    Lista de servicios contratados por el cliente.
                </p>
            </div>

            {
                serverError && (
                    <div 
                        className="mb-4 rounded-lg border border-red-500 bg-red-500/10 p-3 text-red-300"
                    >
                        { serverError }
                    </div>
                )
            }

            <div className="space-y-3">
                { services.map(( service ) => (
                    <div
                        key={`${service.identificacion}-${ service.servicio }`}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/50 rounded-lg p-4 hover:bg-zinc-900/70 transition"
                    >
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">

                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                    Servicio    
                                </span>
                                <span className="text-white font-medium">
                                    { service.servicio }
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                    Fecha Inicio
                                </span>
                                <span className="text-sm text-white">
                                    { new Date( service.fechaInicio ).toLocaleDateString('es-CO') }
                                </span>
                            </div>


                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                    última Facturación
                                </span>
                                <span className="text-sm text-white">
                                    { new Date( service.ultimaFacturacion ).toLocaleDateString('es-CO') }
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                    último Pago
                                </span>
                                <span className="text-white font-medium">
                                    { service.ultimoPago }
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2 shrink-0 lg:flex-col xl:flex-row">
                            <button 
                                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-medium cursor-pointer border rounded-lg px-4 py-1.5 transition-all duration-200 flex items-center justify-center gap-1 w-full sm:w-auto"
                                type="button"
                                onClick={ () => onEdit( service ) }
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Editar
                            </button>
                            <button 
                                className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-medium cursor-pointer border rounded-lg px-4 py-1.5 transition-all duration-200 flex items-center justify-center gap-1 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                type="button"
                                onClick={ () => handleDelete( service ) }
                                disabled={ deletingService === service.servicio }
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                { deletingService === service.servicio ? 'Eliminando...' : 'Eliminar' }
                            </button>
                        </div>
                    </div>
                ))}


                {/* Mensaje cuando no hay servicios */}
                {
                    services.length === 0 && (
                        <div className="bg-zinc-900/50 rounded-lg p-8 text-center">
                            <p className="text-zinc-400">
                                No hay servicios contratados
                            </p>
                            <p className="text-sm text-zinc-500 mt-1">
                                Agregue un nuevo servicio usando el formulario
                            </p>
                        </div>
                    )
                }
            </div>

        </div>
    )
}