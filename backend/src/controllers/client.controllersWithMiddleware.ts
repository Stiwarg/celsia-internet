import type { NextFunction, Request, Response } from "express";
import type { IClientAttribute, IParams } from "../interface/models.interface.js";
import ClientService from "../services/client.service.js";

class ClientController {

    static createClient = async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            const { 
                identificacion, 
                apellidos, 
                correoElectronico, 
                fechaNacimiento, 
                nombres, 
                numeroCelular, 
                tipoIdentificacion 
            }:IClientAttribute = req.body;

            const client = await ClientService.addClient({ 
                identificacion,
                apellidos, 
                correoElectronico, 
                fechaNacimiento, 
                nombres, 
                numeroCelular, 
                tipoIdentificacion
            });

            res.status(201).json({
                message: 'Usuario creado satisfactoriamente',
                client
            });
        } catch ( error ) {
            next( error );
        }
    }

    static findClientByIdentification = async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            const { identificacion } = req.params;

            const client = await ClientService.findClientByIdentification( String(identificacion) );

            res.status(200).json({
                message: 'Usuario encontrado',
                client
            });
        } catch ( error ) {
            next( error );
        }
    }

    static updateClient = async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            const { identificacion } = req.params;
            const dataClient = req.body;

            const client = await ClientService.updateClient( String(identificacion) ,dataClient );

            res.status(200).json({
                message: 'Se han actualizado correctamente los datos del cliente',
                client
            });
            
        } catch ( error ) {
            next( error );
        }
    }

    static deleteClient = async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            const { identificacion } = req.params as unknown as IParams;

            //const dropClient = 
            await ClientService.deleteClient( identificacion );

            res.status(200).json({
                message: 'Cliente eliminado'
            });
        } catch ( error ) {
            next( error );
        }
    }

}

export default ClientController;