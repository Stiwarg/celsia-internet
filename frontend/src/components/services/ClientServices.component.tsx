import { useEffect, useState } from "react"
import type { IClientProps, IServicios } from "../../types/celsia.types"
import { ServiceForm } from "./ServiceForm"
import { ServiceList } from "./ServiceList"
import ServiceApi from "../../api/service.api"

export const ClientServices = ({ client }: IClientProps ) => {

    const [ services, setServices ] = useState<IServicios[]>([]);
    const [ mode, setMode ] = useState< "create" | "edit" >("create");
    const [ selectedService, setSelectedService ] = useState< IServicios | null >( null );

    const resetForm = () => {
        setMode("create");
        setSelectedService( null );
    }

    const handleEditService = ( service: IServicios ) => {
        setSelectedService( service );
        setMode('edit');
    }
 
    const handleDeleteService = async () => {
        await loadServices();
        resetForm();
    }

    const loadServices = async () => {
        if ( !client ) return;
        
        const response = await ServiceApi.contractedServices( client.identificacion );

        console.log('response del cliente: ', response.services );
        setServices( response.services );
    }
    
    useEffect(() => {

        loadServices();
    }, [ client ]);

    return (
        <>
            <ServiceList 
                onDelete={ handleDeleteService } 
                onEdit={ handleEditService } 
                services={ services } 
            />
            <ServiceForm 
                client={ client }
                mode= { mode }
                service={ selectedService }
                onSuccess={ async () => {
                    await loadServices();
                    resetForm();
                }}
                onCancel={() => {
                    setMode('create');
                    setSelectedService( null );
                }}
            />
        </>
    )
}