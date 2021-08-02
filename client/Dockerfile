FROM node:alpine

#ENV for running a React App in a container

ENV CI=true
WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm","start"] 