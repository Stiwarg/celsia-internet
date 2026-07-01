import type { Request, Response } from "express";
import type { IClientAttribute } from "../interface/models.interface.js";
import ClientService from "../services/client.service.js";

class ClientController {
    static createClient = async ( req: Request, res: Response ) => {
        try {
            console.log('Prueba');
            const { identificacion, apellidos, correoElectronico, fechaNacimiento, nombres, numeroCelular, tipoIdentifcacion }:IClientAttribute = req.body;
            const client = ClientService.addClient({ identificacion,apellidos, correoElectronico, fechaNacimiento, nombres, numeroCelular, tipoIdentifcacion})
            console.log('Prueba');
            res.status(200).send({
                message: 'Usuario creado satisfactoriamente',
                client
            });
        } catch (error:any) {
            res.status(500).send({
                message: error.message
            })
        }
    }


}

export default ClientController;