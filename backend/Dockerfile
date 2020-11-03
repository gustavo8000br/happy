# Imagem de Origem
FROM node:lts-buster-slim

# Diretório de trabalho(é onde a aplicação ficará dentro do container).
WORKDIR /backend

# Adicionando `/app/node_modules/.bin` para o $PATH
ENV PATH="/backend/node_modules/.bin:$PATH"
RUN echo ${PATH}

# Instalando dependências da aplicação e armazenando em cache.
COPY package.json yarn.lock ./
RUN npm cache clean --force
RUN yarn

#
COPY . .

EXPOSE 3333

# start app
CMD ["yarn", "dev"]