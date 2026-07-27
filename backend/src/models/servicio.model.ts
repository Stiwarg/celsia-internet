import { DataTypes, Model } from "sequelize";
import type { IServicios } from "../interface/models.interface.js";
import sequelize from '../database/connection.js';

class Servicios extends Model< IServicios > implements IServicios {
    public identificacion!: string;
    public servicio!: string;
    public fechaInicio!: Date;
    public ultimaFacturacion!: Date;
    public ultimoPago!: number;
}

Servicios.init({
    identificacion: {
        type: DataTypes.STRING(20),
        primaryKey: true
    },
    servicio: {
        type: DataTypes.STRING(80),
        allowNull: false,
        primaryKey: true
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    ultimaFacturacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ultimoPago: {
        type: DataTypes.INTEGER,
    }
},
{
    tableName: 'servicios',
    underscored: true,
    timestamps: false,
    sequelize
});

export default Servicios;