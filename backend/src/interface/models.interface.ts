import { ENUM, type Optional } from "sequelize";
import { optional } from "zod";

/*CREATE TABLE clientes {
identificacion VARCHAR(20) NOT NUL PRIMARY KEY,
nombres VARCHAR(80) NOT NULL,
apellidos VARCHAR(80) NOT NULL,
tipoIdentificacion VARCHAR(2) NOT NULL,
fechaNacimiento DATE NOT NULL,
numeroCelular VARCHAR(20) NOT NULL,
correoElectronico VARCHAR(80) NOT NULL
};*/
export interface IClientAttribute {
    identificacion: string,
    nombres: string,
    apellidos: string,
    tipoIdentificacion: string,
    fechaNacimiento: Date,
    numeroCelular: string,
    correoElectronico: string
};

export interface IParams {
    identificacion: string;
}

/*CREATE TABLE servicios {
identificacion VARCHAR(20) NOT NUL,
servicio VARCHAR(80) NOT NUL,
fechaInicio DATE NOT NULL,
ultimaFacturacion DATE NOT NULL,
ultimoPago INTEGER NOT NUL DEFAULT 0,
PRIMARY KEY (identificacion, servicio),
CONSTRAINT servicios_FK1 FOREING KEY (identificacion) REFERENCES
clientes(identificacion) ON UPDATE CASCADE ON DELETE NO ACTION*/

export interface IServicios {
    identificacion: string,
    servicio: string,
    fechaInicio: Date,
    ultimaFacturacion: Date,
    ultimoPago: number,
}

export interface IServiciosCreationAttributes extends Optional<IServicios, 'fechaInicio' | 'ultimaFacturacion' | 'ultimoPago' > {}

export interface IUpdateClientServicesRequest {
    services: {
        identificacion: string,
        service: string,
    }[],
};

export interface IServicesCelsiaFindIdentificate {
    identificacionClient: string,
};

export interface IUpdateClientRequest {
    nombres?: string,
    apellidos?: string,
    tipoIdentificacion?: string,
    fechaNacimiento?: Date,
    numeroCelular?: string,
    correoElectronico?: string
}

//• CEDULA → CC
//• TARJETA IDENTIDAD → TI
//• CEDULA EXTRANJERIA → CE
//• REGISTRO CIVIL → RC

export enum ETipoIdenfication {
    CEDULA = "CC",
    TARJETA_IDENTIDAD = "TI",
    CEDULA_EXTRANJERA = "CE",
    REGISTRO_CIVIL = "RC"
}

//• Internet 200 MB
//• Internet 400 MB
//• Internet 600 MB
//• Directv Go
//• Paramount+
//• Win+

export enum EServicio {
    INTERNET_200_MB = "Internet 200 MB",
    INTERNET_400_MB = "Internet 400 MB",
    INTERNET_600_MB = "Internet 600 MB",
    DIRECTV_GO = "Directv Go",
    PARAMOUNT = "Paramount+",
    WIN = "Win+"
}