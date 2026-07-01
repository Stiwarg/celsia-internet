import type { IClientAttribute } from "../interface/models.interface.js";
import Client from "../models/client.model.js";

class ClientService {
    static addClient = async ( dataClients: IClientAttribute ) => {
        try {
            const { identificacion } = dataClients;

            const clientSearch = await Client.findByPk( identificacion );

            if ( clientSearch ) {
                console.log('Este cliente ya existe.');
            }

            const client = await Client.create({
                identificacion: dataClients.identificacion,
                nombres: dataClients.nombres,
                apellidos: dataClients.apellidos,
                numeroCelular: dataClients.numeroCelular,
                fechaNacimiento: dataClients.fechaNacimiento,
                tipoIdentifcacion: dataClients.tipoIdentifcacion,
                correoElectronico: dataClients.correoElectronico
            }); 
            
            return client
        } catch (error: any) {
            throw new Error( error.message );
        }
    }
}

export default ClientService;