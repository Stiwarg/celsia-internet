import path from 'path';
import dotenv from 'dotenv';
import { type IConfig } from '../interface/env.interface.js';

const envFile = path.join( process.cwd(), 'src', '.env.development');

const result = dotenv.config({ path: envFile });

console.log('Ubicación de env:', envFile );
console.log('Resultado del archivo .env', result );

export const configEnv: IConfig = {
    nodeEnv: process.env.APP_ENV || 'development',
    host: process.env.APP_HOST || ( process.env.APP_ENV === 'production' ? '0.0.0.0' : 'localhost' ),
    port: Number(process.env.APP_PORT) || 3001,
    frontendUrl: process.env.APP_FRONTEND_URL || 'http://localhost:5172',
    backendUrl: process.env.BACKEND_URL || 'http://localhost:3001',
    db: {
        host: process.env.DB_HOST || 'postgres',
        user: process.env.DB_USER || 'root',
        database: process.env.DB_NAME || 'celsia_prueba_db',
        dbPort: Number(process.env.DB_PORT) || 5432,
        password: process.env.DB_PASSWORD || ''
    }
}

