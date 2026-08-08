import express, { type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize, { connections } from './database/connection.js';
import '../src/database/associations.js';
import routeClient from './routes/clients.routes.js';
import routeService from './routes/servicesCelsia.routes.js';
import { globalErrorHandler } from './middleware/errorHandler.js';
import { routeNotFound } from './middleware/nonExistentRoute.js';
const bootstrapMain = async () => {
    try {
        await connections();  
        await sequelize.sync({ force: true });  // Esto recrea las tablas      
        const app = express();
        const PORT = 3000;
        const corsOptions = {
            origin: 'http://localhost:5173',
            methods: ['GET','POST','PUT','PATCH','DELETE','HEAD'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: false
        };
        app.use( cors( corsOptions ) );
        app.use( express.json() );
        //app.use( cookieParser() );

        const localhost = 'localhost'

        app.get('/', (_, res: Response ) => {
            res.send('Hello, World!')
        });
        
        app.use('/client', routeClient );
        app.use('/service', routeService);
        app.use( routeNotFound );
        app.use( globalErrorHandler );


        app.listen( PORT, () => {
            console.log(` Bienvenido a celsia Internet http://${localhost}:3000`);
        });
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

bootstrapMain();
