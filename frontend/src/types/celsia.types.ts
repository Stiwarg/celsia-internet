import type { InputHTMLAttributes } from "react";

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
    fechaNacimiento?: string,
    numeroCelular?: string,
    correoElectronico?: string
};

export interface IServicios {
    identificacion: string,
    servicio: string,
    fechaInicio: string,
    ultimaFacturacion: string,
    ultimoPago: number,
}

export interface IServiceUpdate {
    serviceNew?: string;
}

export interface InputProps extends InputHTMLAttributes< HTMLInputElement > {
    label: string;
    error?: string;
    className?: string;
}


export interface IApiErrorResponse<T> {
    status: string;
    message: string;
    errors?: IBackendValidationError<T>[];
}

export interface IBackendValidationError<T> {
    field: keyof T;
    message: string;
}

export interface IClientProps {
    client: IClientAttribute | null;
}

export interface IClientInfoProps {
    client: IClientAttribute | null;
    onEdit: () => void;
    onDelete: () => void;
}

export interface IFindClientProps {
    onClientFound: ( client: IClientAttribute ) => void;
}

export interface IdentificacionKey {
    identificacion: string;
}


export interface IClientFormProps {
    client?: IClientAttribute | null;
    mode: "create" | "edit"
    onSuccess: ( updatedClient?: IClientAttribute) => void;
}

export interface IServiceListProps {
    services: IServicios[];
    onEdit: ( service: IServicios ) => void;
    onDelete: ( service: IServicios ) => void;
}

export interface IServiceFormProps {
    service?: IServicios | null;
    client: IClientAttribute | null;
    mode: "create" | "edit";
    onSuccess: () => void;
    onCancel?: () => void;
}

export const TipoIdenfication = {
    CEDULA: "CC",
    TARJETA_IDENTIDAD: "TI",
    CEDULA_EXTRANJERA: "CE",
    REGISTRO_CIVIL: "RC"
} as const;

export type TipoIdenficationValue = (typeof TipoIdenfication)[keyof typeof TipoIdenfication];