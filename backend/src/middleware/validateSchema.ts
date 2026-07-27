import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from 'zod';

type TRequestPart  = "body" | "params" | "query";


export const verifySchema = ( schema: z.ZodType, typeRequest: TRequestPart ) => 
    async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            const data = await schema.parseAsync( req[ typeRequest ] );
            (req as any )[ typeRequest ] = data;
            next();
        } catch (error) {
            if ( error instanceof ZodError ) {
                console.dir(error);
                return res.status(400).json({
                    message: 'Error en la validación',
                    errors: error.issues.map( ( e ) => ({
                        field: e.path.join('.'),
                        message: e.message,
                    }))
                });
            }
            return res.status(500).json({ message: 'Error inesperado '});
        }
}