import type { Request, Response } from "express";
import type { IClientAttribute, IParams } from "../interface/models.interface.js";
import ClientService from "../services/client.service.js";

class ClientController {

    static createClient = async ( req: Request, res: Response ) => {
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
        } catch (error:any) {

            if ( error.message.includes('Este cliente ya existe.') ) {
                return res.status(409).json({
                    message: error.message
                });
            }

            if ( error.message.includes('Este correo electrónico ya esta siendo utilizado.') ) {
                return res.status(409).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: error.message
            })
        }
    }

    static findClientByIdentification = async ( req: Request, res: Response ) => {
        try {
            const { identificacion } = req.params;

            const client = await ClientService.findClientByIdentification( String(identificacion) );

            res.status(200).json({
                message: 'Usuario encontrado',
                client
            });
        } catch (error: any ) {

            if ( error.message.includes('No se encontro ningun usuario con esa identificación') ) {
                return res.status(404).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: error.message
            });
        }
    }

    static updateClient = async ( req: Request, res: Response ) => {
        try {
            const { identificacion } = req.params;
            const dataClient = req.body;

            const client = await ClientService.updateClient( String(identificacion) ,dataClient );

            res.status(200).json({
                message: 'Se han actualizado correctamente los datos del cliente',
                client
            });
            
        } catch (error: any) {
            
            if ( error.message.includes('No hay datos para actualizar.') ) {
                return res.status(400).json({
                    message: error.message
                });
            }

            if ( error.message.includes('No se encontro ningun usuario con esa identificación') ) {
                return res.status(404).json({
                    message: error.message
                });
            }



            return res.status(500).json({
                message: error.message
            })
        }
    }

    static deleteClient = async ( req: Request, res: Response ) => {
        try {
            const { identificacion } = req.params;

            //const dropClient = 
            await ClientService.deleteClient( String(identificacion) );

            res.status(200).json({
                message: 'Cliente eliminado'
            });
        } catch (error: any) {

            if ( error.message.includes('Error al eliminar al cliente.') ) {
                return res.status(400).json({
                    message: error.message
                });
            }

            if ( error.message.includes('No se encontro ningun usuario con esa identificación') ) {
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

export default ClientController;