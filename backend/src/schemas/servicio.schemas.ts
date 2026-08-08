import z from "zod";
import { EServicio } from "../interface/models.interface.js";
import { DateValidatos } from "../helpers/date-validators.js";

export const servicioSchema = z.object({
    identificacion: z.string()
    .regex(/^\d+$/, 'La identificación solo puede contener números')
    .min(1, "Debe haber al menos un caracter")
    .max(20, "Solamente se puede 20 caracteres"),
    servicio: z.enum(
        EServicio, {
            error: 'Debe seleccionar un tipo de servicio válido',
        }
    ),
    fechaInicio: z.coerce.date({
        error: 'Fecha invalidada'
    })
    .refine( DateValidatos.isBeforeToday, {
        message: 'La fecha de inicio no puede ser futura'
    }),
    ultimaFacturacion: z.coerce.date({
        error: 'Fecha invalidad'
    })
    .refine( DateValidatos.isBeforeToday, {
        message: 'La fecha de la ultima facturación no puede ser futura'
    })
    ,
    ultimoPago: z.number({
        error: "El ultimo pago debe ser escrito por numeros"
    })
});

export const updatedServicesSchema = z.object({
    dataUpdate: z.object({
        serviceNew: z.enum(
            EServicio, {
                error: 'Debe seleccionar un tipo de servicio válido'
            }
        ),
    }),
    serviceCurrent: z.enum(
        EServicio, {
            error: 'Debe seleccionar un tipo de servicio válido'
        }
    )
});

export const findIdentificationClientSchema = z.object({
    identificacion: z.string()
        .regex(/^\d+$/, 'La identificación solo puede contener números')
        .min(1, 'Debe haber al menos un caracter')
        .max(20, 'Solamente se puede 20 caracteres')
});

export const findServiceClientSchema = z.object({
    service: z.enum( EServicio, {
        error: 'Debe seleccionar un tipo de servicio válido'
    })
});

//export const updatedServicesSchema = servicioSchema.partial().omit({ identificacion: true, fechaInicio: true, ultimaFacturacion: true, ultimoPago: true });

export type TServicioSchema = z.infer< typeof servicioSchema >;

export type TFindIdentificationCliente = z.infer< typeof findIdentificationClientSchema >;

export type TFindServiceClient = z.infer< typeof findServiceClientSchema >;

export type TUpdateService = z.infer< typeof updatedServicesSchema >;