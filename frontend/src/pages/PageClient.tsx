import { ClientForm } from "../components/client/ClientForm.component"
import { ClientInfo } from "../components/client/ClientInfo.component"
import { ClientServices } from "../components/services/ClientServices.component"
import { FindClient } from "../components/client/FindClient.component"
import { Header } from "../components/client/Header.component"
import { useState } from "react"
import type { IClientAttribute } from "../types/celsia.types"

export const ClientsPage = () => {
    const [ client, setClient ] = useState< IClientAttribute | null >(null);
    const [ formMode, setFormMode ] = useState< "create" | "edit" >("create");

    const handleEdit = () => {
        setFormMode('edit');
    }
    return (
        <main  className="min-h-screen flex justify-center bg-zinc-900">
            <div className="w-full max-w-7xl px-4 py-8 md:py-12">
                <Header />
                <ClientForm  
                    mode={ formMode } 
                    client={ client } 
                    onSuccess={ ( updatedClient ) => {
                        if ( updatedClient ) setClient( updatedClient );
                        setFormMode('create');
                    }} 
                    
                />
                <FindClient onClientFound={ setClient }/>
                <ClientInfo 
                    client={ client } 
                    onEdit={ handleEdit }
                    onDelete={() => {
                        setClient( null );
                        setFormMode('create');
                    }}
                />
                {
                    client && (
                        <ClientServices client={ client } />
                    )
                }
            </div>
        </main>
    )
}