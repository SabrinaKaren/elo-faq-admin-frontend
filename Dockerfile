##### --- START SECTION --- #####
# Define a imagem base para a compilação do projeto Angular

FROM node:16.16.0-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e package-lock.json para a imagem
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install -g @angular/cli

# Copia todo o código fonte do projeto para a imagem
COPY . .

# Compila o projeto Angular para produção
RUN ng build --configuration=production

##### --- END SECTION --- #####

############################################################

##### --- START SECTION --- #####
# Define a imagem base para a execução do projeto Angular

FROM nginx:latest

# Copia os arquivos compilados para o servidor nginx
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Expõe a porta 80
EXPOSE 80

# Inicia o servidor nginx
CMD ["nginx", "-g", "daemon off;"]

##### --- END SECTION --- #####