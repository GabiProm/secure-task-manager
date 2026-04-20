# 1. Imagen base (estable y ligera)
FROM node:20-slim

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar solo package.json primero (caching)
COPY package*.json ./

# 4. Instalar dependencias
RUN npm ci --only=production

# 5. Copiar el resto del código
COPY src ./src

# 6. Exponer el puerto del backend
EXPOSE 3000

# 7. Comando de arranque
CMD ["node", "src/app.js"]