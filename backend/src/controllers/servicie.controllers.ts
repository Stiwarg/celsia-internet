import type { Request, Response } from "express";
import type { IParams, IServicesCelsiaFindIdentificate, IServicios } from "../interface/models.interface.js";
import ServiciesCelsia from "../services/servicie.service.js";

class ServicioController {

    static contractedServices = async ( req: Request, res: Response ) => {

        try {
            const {
                identificacion
                } = req.params;
            
            const verification = await ServiciesCelsia.contractedServices( String( identificacion ) );

            res.status(200).send({
                message: 'Se encontraron estos servicios tomados por el cliente',
                verification
            });
        } catch (error: any) {

            if ( error.message.includes(`No existe el cliente`) ) {
                return res.status(404).json({
                    message: error.message
                });
            }

            res.status(500).send({
                message: 'Error al buscar la consulta',
                error: error.message
            })
        }
    }

    static servicessAdd = async ( req: Request, res: Response ) => {
        const { identificacion, fechaInicio, servicio, ultimaFacturacion, ultimoPago }: IServicios = req.body;
        try {
            const add = await ServiciesCelsia.addService({
                identificacion, fechaInicio, servicio, ultimaFacturacion, ultimoPago 
            });

            res.status(201).send({
                message: 'Servicio creado satifisfactoriamente para el cliente',
                add
            });
        } catch (error: any) {
            
            if ( error.message.includes('No existe el cliente') ) {
                return res.status(404).json({
                    message: error.message
                });
            }

            if ( error.message.includes(`Ya existe un servicio llamado ${ servicio  }con la identificación del cliente en nuestro sistema: ${ identificacion }`) ) {
                return res.status(409).json({
                    message: error.message
                })
            }

            return res.status(500).send({
                message: 'Error al buscar',
                error: error.message
            })
        }
    }
    
    static servicesUpdate = async ( req: Request, res: Response ) => {
        try {
            const { identificacion } = req.params
            const { serviceNew, serviceCurrent } = req.body;

            const service = await ServiciesCelsia.updateServices( String(identificacion), serviceNew, serviceCurrent );

            return res.status(200).json({
                message: 'El servicio fue actualizado correctamente',
                service
            });

        } catch ( error: any ) {

            if ( error.message.includes('No existe el cliente') ) {
                return res.status(404).json({
                    message: error.message
                });
            }

            if ( error.message.includes('No se encuentra este servicio') ) {
                return res.status(404).json({
                    message: error.message
                });
            }

            if ( error.message.includes('Ya existe un servicio con el nombre del servicio nuevo, no se puede actualizar.') ) {
                return res.status(409).json({
                    message: error.message
                });
            }

            if ( error.message.includes('El servicio nuevo es igual al servicio actual, no se puede actualizar.') ) {
                return res.status(409).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: error.message
            });
            
        }
    }

    static serviceDestroy = async ( req: Request, res: Response ) => {
        try {
            const { identificacion } = req.params;
            const { service } = req.body;
            await ServiciesCelsia.destroyService( String(identificacion), service );

            return res.status(200).json({
                message: 'Se ha eliminado correctamente el servicio'
            });
        } catch ( error: any ) {

            if ( error.message.includes('No existe el cliente') ) {
                return res.status(404).json({
                    message: error.message
                });
            }

            if ( error.message.includes('No se encuentra este servicio') ) {
                return res.status(404).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: error.message
            });

        }
    }


}

export default ServicioController;