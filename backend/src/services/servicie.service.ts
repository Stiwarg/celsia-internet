import type { IServicios } from "../interface/models.interface.js";
import Servicios from "../models/servicio.model.js";

class ServiciesCelsia {
    static contractedServices = async ( clientIdentification: string ) => {

        try {
            const servicesClients = await Servicios.findAll({
                where: { clienteIdentificacion: clientIdentification }
            });
    
            if ( !servicesClients ) {
                console.log( `No existe ningun cliente con este numero de identificación ${servicesClients}` );
                return;
            }
            return servicesClients;
        } catch (error: any) {
            throw new Error( error.message )
        }
    }

    static servicessAdd = async ( dataServicesClients: IServicios ) => {

        try {
            const { clienteIdentificacion, servicio } = dataServicesClients;
            const searchServicesClientExisting = Servicios.findOne({
                where: { servicio: servicio, clienteIdentificacion: clienteIdentificacion }
            });
            
            if ( searchServicesClientExisting === null) {
    
                const createServicesClient = Servicios.create({
                    identificacion: dataServicesClients.identificacion,
                    clienteIdentificacion: dataServicesClients.clienteIdentificacion,
                    ultimaFacturacion: dataServicesClients.ultimaFacturacion,
                    fechaInicio: dataServicesClients.fechaInicio,
                    servicio: dataServicesClients.servicio,
                    ultimoPago: dataServicesClients.ultimoPago
                });

                if ( createServicesClient ) {
                    console.log('Servicio creado satisfactoriamente.');
                    return createServicesClient;
                }
            } else {
                console.log(`Ya existe un servicio llamado ${ servicio  }con la identificación del cliente en nuestro sistema: ${ clienteIdentificacion }`);
                return;
            }

    

            
        } catch (error: any ) {
            throw new Error( error.message );
        }

    }
}

export default ServiciesCelsia;