import type { Request, Response } from "express";
import type { IServicesCelsiaFindIdentificate, IServicios } from "../interface/models.interface.js";
import ServiciesCelsia from "../services/servicie.service.js";

class ServicioController {
    static contractedServices = async ( req: Request, res: Response ) => {
        try {
            const {
                identificacionClient
            }: IServicesCelsiaFindIdentificate = req.body;

            const verification = ServiciesCelsia.contractedServices( identificacionClient );

            res.status(200).send({
                message: 'Se encontraron estos servicios tomados por el cliente',
                verification
            });
        } catch (error: any) {
            res.status(500).send({
                message: 'Error al buscar la consulta',
                error: error.message
            })
        }
    }

    static servicessAdd = async ( req: Request, res: Response ) => {
        try {
            const { identificacion, clienteIdentificacion, fechaInicio, servicio, ultimaFacturacion, ultimoPago }: IServicios = req.body;

            const add = ServiciesCelsia.servicessAdd({
                identificacion, clienteIdentificacion, fechaInicio, servicio, ultimaFacturacion, ultimoPago 
            });

            res.status(200).send({
                message: 'Servicio creado satifisfactoriamente hacia el cliente',
                add
            });
        } catch (error: any) {
            res.status(500).send({
                message: 'Error al buscar',
                error: error.message
            })
        }
    } 
}

export default ServicioController;