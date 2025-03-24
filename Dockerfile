# Usa la imagen oficial de Node.js
FROM node:20

# Crea y usa el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu proyecto
COPY package*.json ./

RUN npm install

COPY . .

# Expone el puerto (ajustar si es necesario)
EXPOSE 3000

# Comando para correr la app
CMD ["node", "app.js"]
