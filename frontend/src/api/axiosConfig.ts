import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, //backend
    timeout: 5000,
    headers: { 
        "Content-Type": "application/json" 
    },
    withCredentials: true
});

instance.interceptors.request.use(( config ) => {
    console.log(`-> ${ config.method?.toUpperCase() } ${ config.url }`);
    return config;
});

instance.interceptors.response.use(
    ( response: AxiosResponse ) => response,
    ( error ) => {
        console.error('Error en la petición:', error );
        return Promise.reject( error );
    }
);

export default instance;