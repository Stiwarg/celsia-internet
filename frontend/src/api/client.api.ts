import type { IClientAttribute, IClientAttributeUpdate } from '../types/celsia.types';
import api from './axiosConfig';

class ClientApi {
    
    static createClient = async ( newDataClient: IClientAttribute ) => {
        const response = await api.post('/client/clientAdd', newDataClient);

        return response.data;

    }

    static findClient = async ( identificacion: string ) => {
        const response = await api.get( `/client/clientFind/${identificacion}`)

        return response.data;
    }

    static updateDataClient = async ( identificacion: string, dataUpdate: IClientAttributeUpdate ) => {
        const response = await api.put( `/client/clientUpdate/${identificacion}`, 
        dataUpdate);

        return response.data;
    }

    static deleteClient = async ( identificacion: string ) => {
        const response = await api.delete( `/client/clientDelete/${identificacion}`);

        return response.data;
    }
}

export default ClientApi;