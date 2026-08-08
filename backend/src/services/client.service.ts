import sequelize from "../database/connection.js";
import type { IClientAttribute, IUpdateClientRequest } from "../interface/models.interface.js";
import Client from "../models/client.model.js";
import Servicios from "../models/servicio.model.js";

class ClientService {
    
    static addClient = async ( dataClients: IClientAttribute ) => {
        try {
            const { identificacion, correoElectronico } = dataClients;

            const clientSearch = await Client.findByPk( identificacion );

            if ( clientSearch ) {
                //console.log('Este cliente ya existe.');
                throw new Error('Este cliente ya existe.');

            }

            const emailSearch = await Client.findOne({
                where: { correoElectronico: correoElectronico }
            });

            if ( emailSearch ) {
                throw new Error('Este correo electrónico ya esta siendo utilizado.');
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
                throw new Error('No se encontro ningun usuario con esa identificación');
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
                throw new Error('No hay datos para actualizar.')
            }

            if ( updateData.correoElectronico ) {
                
                const emailSearch = await Client.findOne({
                    where: { correoElectronico: updateData.correoElectronico },
                    raw: true
                });

                //console.log('Instancia', emailSearch instanceof Client );
                //console.log('Object keys ', Object.keys( emailSearch! ));
                //console.log('get',emailSearch?.get("identificacion"));
                //console.log('Elementos encontrados:', emailSearch?.dataValues );
                //console.log('Correo Recibido: ', updateData.correoElectronico );
                //console.log('Cliente encontrado: ', emailSearch?.toJSON() );
                console.log('Identificación recibida:', identificacion );
                //console.log('Identificación encontrada:', emailSearch?.correoElectronico );


                if ( emailSearch && emailSearch.identificacion !== identificacion ) {
                    throw new Error('Este correo electrónico ya esta siendo utilizado.');
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
                throw new Error('Error al eliminar al cliente.');
            }

            return destroy;
        } catch ( error: any  ) {
            //throw new Error(`Error al eliminar el cliente: ${ error.message }`);
            throw error;
        }

    }


}

export default ClientService;