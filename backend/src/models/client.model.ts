import { DataTypes, Model } from "sequelize";
import type { IClientAttribute } from "../interface/models.interface.js";
import sequelize from '../database/connection.js';
class Client extends Model< IClientAttribute > implements IClientAttribute {
    public identificacion!: string;
    public apellidos!: string;
    public tipoIdentificacion!: string;
    public numeroCelular!: string;
    public correoElectronico!: string;
    public fechaNacimiento!: Date;
    public nombres!: string;
}

Client.init({
    identificacion: {
        type: DataTypes.STRING(20),
        primaryKey: true,
    },
    nombres: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(80),
        allowNull: false

    },
    tipoIdentificacion: {
        type: DataTypes.STRING(2),
        allowNull: false

    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false

    },
    numeroCelular: {
        type: DataTypes.STRING,
        allowNull: false

    },
    correoElectronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
{
    sequelize,
    modelName: 'client',
    tableName: 'clientes',
    timestamps: false,
    underscored: true,
    
}
);


export default Client;