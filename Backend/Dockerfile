# backend/Dockerfile

# Escolha uma imagem base oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o restante do código da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta que sua aplicação Node.js escutará (a mesma que você mapeou no docker-compose.yml)
EXPOSE 3001

# Define o comando para iniciar sua aplicação
# Se você usa nodemon para desenvolvimento, pode ser algo como: CMD ["npm", "run", "dev"]
# Ou para produção: CMD ["node", "src/index.js"] (ajuste para o seu arquivo de entrada)
CMD ["npm", "start"] # Ou o comando que inicia seu backend