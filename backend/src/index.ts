import express, { type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize, { connections } from './database/connection.js';
import '../src/database/associations.js';
import routeClient from './routes/clients.routes.js';
import routeService from './routes/servicesCelsia.routes.js';
const bootstrapMain = async () => {
    try {
        await connections();  
        await sequelize.sync({ force: true })    
        const app = express();
        const PORT = 3000;

        const localhost = 'localhost'
        const hello = 'Hello world'
        app.get('/', (_, res: Response ) => {
            res.send(hello)
        });

        app.use('/client', routeClient );
        app.use('/service', routeService)


        app.listen( PORT, () => {
            console.log(` Bienvenido a celsia Internet http://${localhost}:3000`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

bootstrapMain();
