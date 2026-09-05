# Imagen base de Node - Construcción de la aplicación React
FROM node:22-alpine AS builder

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm ci

# Copiamos el resto de la aplicación del frontend
COPY . .

# Variable utilizada por Vite durante el build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Compilamos Typescript-React
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiamos el build generado por Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Puerto utilizado para react
EXPOSE 80

# Ejecutamos la aplicación compilada
CMD ["nginx", "-g", "daemon off;"]
