# Imagen base de Node
FROM node:22-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm ci

# Copiamos el resto de la aplicación
COPY . .

# Compilamos Typescript
RUN npm run build

# Puerto utilizado por Express
EXPOSE 3000

# Ejecutamos la aplicación compilada
CMD ["npm", "start"]
