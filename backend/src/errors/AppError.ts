import type { Request, Response, NextFunction } from "express";
class AppError extends Error{
    public statusCode: number;
    public isOperational: boolean;
    constructor(  
        message: string, 
        statusCode: number, 
        isOperational: boolean = true 
    ) {
        super( message );
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.name = "AppError";
    }
}

export default AppError;