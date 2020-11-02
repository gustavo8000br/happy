# Imagem de Origem
FROM node:lts-buster-slim

# Diretório de trabalho(é onde a aplicação ficará dentro do container).
WORKDIR /frontend

# Instalando dependências da aplicação e armazenando em cache.
COPY package.json yarn.lock ./
RUN yarn

#
COPY . .

EXPOSE 3000

# start app
CMD ["yarn", "start"]