import type { NextFunction, Request, Response } from "express";
import type { IParams, IServicesCelsiaFindIdentificate, IServicios } from "../interface/models.interface.js";
import ServiciesCelsia from "../services/servicie.service.js";

class ServicioController {

    static contractedServices = async ( req: Request, res: Response, next: NextFunction ) => {

        try {
            const {
                identificacionClient
                } = req.params;
            
            const verification = await ServiciesCelsia.contractedServices( String(identificacionClient) );

            res.status(200).send({
                message: 'Se encontraron estos servicios tomados por el cliente',
                verification
            });
        } catch ( error ) {
            next( error );
        }
    }

    static servicessAdd = async ( req: Request, res: Response, next: NextFunction ) => {
        const { identificacion, fechaInicio, servicio, ultimaFacturacion, ultimoPago }: IServicios = req.body;
        try {
            const add = await ServiciesCelsia.addService({
                identificacion, fechaInicio, servicio, ultimaFacturacion, ultimoPago 
            });

            res.status(201).send({
                message: 'Servicio creado satifisfactoriamente para el cliente',
                add
            });
        } catch ( error ) {
            next( error );
        }
    }
    
    static servicesUpdate = async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            const { identificacion } = req.params
            const { serviceNew, serviceCurrent } = req.body;

            const service = await ServiciesCelsia.updateServices( String(identificacion), serviceNew, serviceCurrent );

            return res.status(200).json({
                message: 'El servicio fue actualizado correctamente',
                service
            });

        } catch ( error ) {
            next( error );
        }
    }

    static serviceDestroy = async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            const { identificacion } = req.params;
            const { service } = req.body;
            await ServiciesCelsia.destroyService( String(identificacion), service );

            return res.status(200).json({
                message: 'Se ha eliminado correctamente el servicio'
            });
        } catch ( error ) {
            next( error );
        }
    }
}

export default ServicioController;