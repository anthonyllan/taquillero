# Etapa de construcción
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Variables de entorno para tus microservicios AKS
ENV VITE_EVENTO_API_URL=/evento-api
ENV VITE_BOLETO_API_URL=/boleto-api

# Construir la aplicación
RUN npm run build

# Para depuración - ver qué archivos se generaron
RUN ls -la /app/dist

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos de construcción de Vite a nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Para depuración - listar archivos copiados
RUN ls -la /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]