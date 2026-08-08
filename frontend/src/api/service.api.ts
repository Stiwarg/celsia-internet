import type { IServiceUpdate, IServicios } from '../types/celsia.types';
import api from './axiosConfig';

class ServiceApi {
    static createService = async ( newDataService: IServicios ) => {
        const response = await api.post('/service/servicesAdd', newDataService );

        return response.data;

    }

    static contractedServices = async ( identificacion: string ) => {
        const response = await api.get( `/service/contractedServices/${identificacion}`);

        return response.data
    }


    static updateDataService = async ( identificacion: string, dataUpdate: IServiceUpdate, serviceCurrent: string ) => {
        const response = await api.put(`/service/servicesUpdate/${ identificacion }`,{ dataUpdate, serviceCurrent } );

        return response.data;

    }

    static deleteService = async ( identificacion: string, service: string ) => {
        const response = await api.delete(`/service/servicesDelete/${ identificacion }`, 
            { data: { service } }
        );

        return response.data;
    }

}

export default ServiceApi;