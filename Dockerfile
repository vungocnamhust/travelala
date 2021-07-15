FROM node:14.16.0-alpine3.10

RUN npm install -g nodemon

WORKDIR /app 

COPY package.json ./

