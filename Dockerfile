# especifica verção de sistema operacional
FROM node:20-alpine

#defini a pasta onde o codigo vai ser executado
WORKDIR /app

#copia os arquivos package.json e package-lock.json para a pasta /app
COPY package*.json ./

#instalar dependencias
RUN npm install

#copia todo codigo-fonte para o diretorio /app
COPY . .

#imforma a porta que o container vai usar
EXPOSE 8080

#comando de execuçao em desemvolvimento
CMD ["npm", "run", "dev"]