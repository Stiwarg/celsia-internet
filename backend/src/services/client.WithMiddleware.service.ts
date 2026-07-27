import AppError from "../errors/AppError.js";
import type { IClientAttribute, IUpdateClientRequest } from "../interface/models.interface.js";
import Client from "../models/client.model.js";

class ClientService {
    
    static addClient = async ( dataClients: IClientAttribute ) => {
        try {
            const { identificacion, correoElectronico } = dataClients;

            const clientSearch = await Client.findByPk( identificacion );

            if ( clientSearch ) {
                //console.log('Este cliente ya existe.');
                throw new AppError('Este cliente ya existe', 409 );
            }

            const emailSearch = await Client.findOne({
                where: { correoElectronico: correoElectronico }
            });

            if ( emailSearch ) {
                throw new AppError('Este correo electronico ya esta siendo utilizado.', 409 );
            }
            
            const client = await Client.create({
                identificacion: dataClients.identificacion,
                nombres: dataClients.nombres,
                apellidos: dataClients.apellidos,
                numeroCelular: dataClients.numeroCelular,
                fechaNacimiento: dataClients.fechaNacimiento,
                tipoIdentificacion: dataClients.tipoIdentificacion,
                correoElectronico: dataClients.correoElectronico
            }); 
            
            return client
        } catch (error: any) {
            //throw new Error(`Error al cliente: ${ error.message }`);
            throw error;
        }
    }

    static findClientByIdentification = async ( identificacion: string ) => {
        try {
            const clientFind = await Client.findByPk(identificacion);

            if ( !clientFind ) {
                throw new AppError('No se encontro ningun usuario con esa identificación', 404 );
                ///console.log('No se encontro ningun usuario con esa identificación');
                //return;
            }
            //console.log('Si se encontro un usuario con esa identificación');
            return clientFind;
        } catch ( error: any ) {
            //throw new Error(`Error al buscar el cliente: ${ error.message }`);
            throw error;
        }

    }

    static updateClient = async ( identificacion: string ,dataClientUpdate: IUpdateClientRequest ) => {
        try {
            await this.findClientByIdentification( identificacion );
    
            const updateData = Object.fromEntries(
                Object.entries( dataClientUpdate ).filter(([_, value]) => value !== undefined )
            );
            
            if ( Object.keys( updateData ).length === 0 ) {
                throw new AppError('No hay datos para actualizar.', 409 );
            }

            if ( updateData.correoElectronico ) {
                
                const emailSearch = await Client.findOne({
                    where: { correoElectronico: updateData.correoElectronico }
                });

                if ( emailSearch && emailSearch.identificacion !== identificacion ) {
                    throw new AppError('Este correo electrónico ya esta siendo utilizado.', 409);
                }
            }

            const updateDataClient = await Client.update( 
                updateData,
                {
                    where: { identificacion: identificacion }
                } 
            );
    
            return updateDataClient;
            
        } catch (error: any ) {
            //throw new Error(`Error al actualizar el cliente: ${ error.message }`)
            throw error;
        }
    }

    static deleteClient = async ( identificacion: string ) => {
        try {
            await this.findClientByIdentification( identificacion );

            const destroy = await Client.destroy({
                where: { identificacion: identificacion }
            });

            if ( !destroy ) {
                throw new AppError('Error al eliminar al cliente.', 409);
            }

            return destroy;
        } catch ( error: any  ) {
            //throw new Error(`Error al eliminar el cliente: ${ error.message }`);
            throw error;
        }

    }
}

export default ClientService;