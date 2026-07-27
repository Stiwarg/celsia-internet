import AppError from "../errors/AppError.js";
import type { IServicios, IUpdateClientServicesRequest } from "../interface/models.interface.js";
import Client from "../models/client.model.js";
import Servicios from "../models/servicio.model.js";

class ServiciesCelsia {

    static contractedServices = async ( identificacion: string ) => {

        try {

            const client = await Client.findByPk(identificacion);

            if ( !client ) {
                throw new AppError('No existe el cliente', 404 );
            }

            const servicesClients = await Servicios.findAll({
                where: { identificacion: identificacion }
            });
    
            if ( servicesClients.length === 0 ) {
                //console.log( `No existe ningun servicio asignado con la identificación de este cliente ${identificacion}` );
                return [];
                //throw new Error(`No existe ningun servicio asignado con la identificación de este cliente ${identificacion}`);
            }
            return servicesClients;
        } catch (error: any) {
            throw error;
        }
    }

    static findService = async ( identificacion: string, servicio: string ) => {
        try {
            return await Servicios.findOne({
                where: {
                    identificacion: identificacion,
                    servicio: servicio
                }
            });

        } catch (error: any) {
            throw error;
        }
    }

    static addService = async ( dataServicesClients: IServicios ) => {

        try {
            const { identificacion, servicio } = dataServicesClients;

            const client = await Client.findByPk( identificacion );

            if ( !client ) {
                throw new AppError('No existe el cliente', 404);
            }

            const searchServicesClientExisting = await this.findService( identificacion, servicio );
            
            if ( !searchServicesClientExisting ) {
    
                /*const createServicesClient = await Servicios.create({
                    identificacion: dataServicesClients.identificacion,
                    ultimaFacturacion: dataServicesClients.ultimaFacturacion,
                    fechaInicio: dataServicesClients.fechaInicio,
                    servicio: dataServicesClients.servicio,
                    ultimoPago: dataServicesClients.ultimoPago
                });

                if ( createServicesClient ) {
                    console.log('Servicio creado satisfactoriamente.');
                    return createServicesClient;
                }*/

                return await this.createServices( dataServicesClients );

            } else {
                //console.log(`Ya existe un servicio llamado ${ servicio  }con la identificación del cliente en nuestro sistema: ${ identificacion }`);
                throw new AppError(`Ya existe un servicio llamado ${ servicio  }con la identificación del cliente en nuestro sistema: ${ identificacion }`, 409 );
                //return;
            }
        } catch (error: any ) {
            throw error;
        }

    }

    static createServices = async ( dataServicesClients: IServicios ) => {
        try {
            return await Servicios.create(
                {
                    identificacion: dataServicesClients.identificacion,
                    fechaInicio: dataServicesClients.fechaInicio,
                    ultimaFacturacion: dataServicesClients.ultimaFacturacion,
                    ultimoPago: dataServicesClients.ultimoPago,
                    servicio: dataServicesClients.servicio
                }
            );

            /*if ( addService ) {
                //console.log('Se creo correctamente el servicio.');
                return addService;
            }*/
        } catch ( error: any ) {
            throw error;
        }
    } 

    static updateServices = async ( identificacion: string ,serviceNew :string, serviceCurrent: string ) => {
        try {

            const client = Client.findByPk( identificacion );

            if ( !client ) {
                throw new AppError('No existe el cliente', 404 );
            }
            
            const searchService = await this.findService( identificacion, serviceCurrent );

            if ( !searchService ) {
                throw new AppError('No se encuentra este servicio', 404)
            }

            if ( serviceNew === serviceCurrent ) {
                throw new AppError('El servicio nuevo es igual al servicio actual, no se puede actualizar.', 409 );
            }

            const searchServiceNew = await this.findService( identificacion, serviceNew );

            if ( searchServiceNew ) {
                throw new AppError('Ya existe un servicio con el nombre del servicio nuevo, no se puede actualizar.', 409 );
            }

            const updatedServices = await Servicios.update(
                {
                    servicio: serviceNew,
                },
                { 
                    where: { 
                        identificacion: identificacion,
                        servicio: serviceCurrent
                    },
                },
            );

            return updatedServices;
        } catch (error: any) {
            throw error;
        }
    }

    static destroyService = async ( identificacion: string, service: string ) => {
        try {

            const client = await Client.findByPk( identificacion );

            if ( !client ) {
                throw new AppError('No existe el cliente', 404 );
            }

            const searchService = await this.findService( identificacion, service );

            if ( !searchService ) {
                throw new AppError('No se encuentra este servicio', 404)
            }

            const destroyService = await Servicios.destroy({
                where: {
                    servicio: service,
                    identificacion: identificacion
                }
            });

            return destroyService;
        } catch ( error: any ) {
            throw error;
        }
    }


}

export default ServiciesCelsia;