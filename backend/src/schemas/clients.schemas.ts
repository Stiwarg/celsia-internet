import z from 'zod';

export const clientsSchema = z.object({
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
    fechaNacimiento: z.coerce.date({
        error: 'Fecha invalidada'
    }),
    numeroCelular: z.string({
        error: 'Debe haber al menos un caracter'
    }).min(1).max(20),
    correoElectronico: z.string({
        error: 'Debe haber al menos un caracter'
    }).min(1).max(80)
});

export const updatedClientSchema = clientsSchema.partial().omit({ identificacion: true });

export const findIdentificationClientSchema = z.object({
    identificacion: z.string({

        error: 'Debe haber al menos un caracter'
    }).min( 1 ).max( 20 )
});

export type TFindIdentificationClient = z.infer< typeof findIdentificationClientSchema >;

export type TClient = z.infer< typeof clientsSchema >;

export type TUpdatedClient = z.infer< typeof updatedClientSchema >;

// el z.infer permite extraer el tipo de datos de un esquema zod, lo que facilita la validación y el tipado en TypeScript.
