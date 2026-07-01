import z from 'zod';

const clientsSchema = z.object({
    identificacion: z.string({
        error: 'Debe haber al menos un caracter'
    }).min(1).max(20),
    nombres: z.string({
        error: 'Debe haber al menos un caracter'
    }).min(1).max(80),
    apellidos: z.string({
        error: 'Debe haber al menos un caracter'
    }).min(1).max(80),
    tipoIdentificacion: z.string({
        error: 'Solo se permite caracteres'
    }).min(2).max(2),
    fechaNacimiento: z.date({
        error: 'Fecha invalidada'
    }),
    numeroCelular: z.string({
        error: 'Debe haber al menos un caracter'
    }).min(1).max(20),
    correoElectronico: z.string({
        error: 'Debe haber al menos un caracter'
    }).min(1).max(80)
});

export type TClient = z.infer< typeof clientsSchema >;