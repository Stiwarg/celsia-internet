import z from 'zod';
import { ETipoIdenfication } from '../interface/models.interface.js';
import { DateValidatos } from '../helpers/date-validators.js';


export const clientsSchema = z.object({
    identificacion: z.string()
    .regex(/^\d+$/, 'La identificación solo puede contener números')
    .min(1, 'La identificación debe tener al menos 1 dígito')
    .max(20, 'La identificación no puede tener más de 20 dígitos'),
    nombres: z.string()
    .min(1, 'Los nombres debe tener al menos 1 dígito' )
    .max(80, 'Los nombres debe tener al menos 80 dígitos' ),
    apellidos: z.string()
    .min(1, 'Los apellidos debe tener al menos 1 dígito' )
    .max(80, 'Los apellidos debe tener al menos 80 dígitos' ),
    tipoIdentificacion: z.enum(
        ETipoIdenfication, {
            error: "Debe seleccionar un tipo de identificación válida",
        }
    ),
    fechaNacimiento: z.coerce.date({
        error: 'Fecha invalidada'
    })
    .refine( DateValidatos.isBeforeToday, {
        message: 'La fecha de nacimiento no puede ser futura'
    }),
    numeroCelular: z.string()
    .regex(
        /^\+?[\d\s]+$/, 
        "El teléfono solo puede contener números, espacios y opcionalmente + al inicio"
    )
    .min(5, "El teléfono debe tener al menos 5 caracteres")
    .max(20, "El teléfono no puede tener más de 20 caracteres")
    .transform( str => str.replace(/\s/g, ''))
    .refine(( clean ) => {
        const digits = clean.replace('+', '');
        return /^\+?\d+$/.test( clean ) && digits.length >= 7 && digits.length <= 15;
    },
        'El telefono debe tener entre 7 y 15 dígitos numéricos'
    ),
    correoElectronico: z.string()
    .regex(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        'Formato de correo inválido'
    )
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
