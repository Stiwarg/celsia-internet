export interface IClientAttribute {
    identificacion: string,
    nombres: string,
    apellidos: string,
    tipoIdentificacion: string,
    fechaNacimiento: string,
    numeroCelular: string,
    correoElectronico: string
};

export interface IClientAttributeUpdate {
    nombres?: string,
    apellidos?: string,
    tipoIdentificacion?: string,
    fechaNacimiento?: Date,
    numeroCelular?: string,
    correoElectronico?: string
};

export interface IServicios {
    identificacion: string,
    servicio: string,
    fechaInicio: Date,
    ultimaFacturacion: Date,
    ultimoPago: number,
}

export interface IServicesUpdate {
    service?: string;
}