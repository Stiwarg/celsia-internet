import z from "zod";

export const servicioSchema = z.object({
    identificacion: z.string().min(1, "Debe haber al menos un caracter").max(20, "Solamente se puede 20 caracteres"),
    servicio: z.string().min(1, "Debe haber al menos un caracter").max(80, "Solamente se puede 80 caracteres"),
    fechaInicio: z.date({
        error: 'Fecha invalidada'
    }),
    ultimaFacturacion: z.date({
        error: 'Fecha invalidad'
    }),
    ultimoPago: z.number({
        error: "El ultimo pago debe ser escrito por numeros"
    }).min(1, "El campo u,ultimo pago no puede estar vacio"),
    clienteIdentificacion: z.string({
        error: "El campo de la identificacion del cliente es requerido"
    })
});

export type TServicioSchema = z.infer< typeof servicioSchema >;