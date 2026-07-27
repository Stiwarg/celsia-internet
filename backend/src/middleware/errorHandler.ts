import type { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.js"
import { Sequelize, BaseError, ValidationError } from "sequelize";
import { ZodError } from "zod";

export const globalErrorHandler = ( err: Error ,req: Request, res: Response, _next: NextFunction ) => {
    console.error( err );

    if ( err instanceof AppError ) {
        return res.status( err.statusCode ).json({
            status: 'error',
            message: err.message
        });
    /*} else if ( err instanceof SyntaxError ) {
        return res.status( 500 ).json({
            status: 'error',
            message: 'Error de sintaxis en la solicitud'
        });
    } else if ( err instanceof TypeError ) {
        return res.status( 500 ).json({
            status: 'error',
            message: 'Error de tipo en la solicitud'
        });
    } else if ( err instanceof ReferenceError ) {
        return res.status( 500 ).json({
            status: 'error',
            message: 'Error de referencia en la solicitud'
        });
    } else if ( err instanceof RangeError ) {
        return res.status( 500 ).json({
            status: 'error',
            message: 'Error de rango en la solicitud'
        });
    } else if ( err instanceof EvalError ) {
        return res.status( 500 ).json({
            status: 'error',
            message: 'Error de evaluación en la solicitud'
        });
    } else if ( err instanceof URIError ) {
        return res.status(500).json({
            status: 'error',
            message: 'Error de URI en la solicitud'
        });
    }*/
    } else if ( err instanceof ZodError ) {
        return res.status( 400 ).json({
            status: 'error',
            message: 'Error de validación en la solicitud',
            errors: err.issues.map(( e ) => ({
                field: e.path.join('.'),
                message: e.message,
            }))
        });
    } else if ( err instanceof  ValidationError ) {
        return res.status( 400 ).json({
            status: 'error',
            message: 'Error de validación en la solicitud'
        });
    } else if ( err instanceof  BaseError ) {
        return res.status( 400 ).json({
            status: 'error',
            message: 'Error de base de datos en la solicitud'
        });
    }
    else {
        return res.status( 500 ).json({
            status: 'error',
            message: 'Error inesperado'
        });
    }


}