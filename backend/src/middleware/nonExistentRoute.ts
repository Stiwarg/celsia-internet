import type { NextFunction, Request, Response } from "express";

export const routeNotFound = ( req: Request, res: Response, _next: NextFunction ) => {
    return res.status(404).json({
        message: 'Ruta no encontrada ruta'
    });
} 