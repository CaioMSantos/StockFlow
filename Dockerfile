# Use a imagem base com Node.js 20
FROM node:20

# Defina o diretório de trabalho
WORKDIR /app

# Copie package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências, incluindo rollup
RUN npm install -g @angular/cli@latest
RUN npm install rollup --save-dev
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Construa a aplicação
RUN ng build --configuration production

# Sirva a aplicação (opcional, dependendo do seu setup)
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]

# Exponha a porta 4200 (opcional, dependendo do seu setup)
EXPOSE 4200
