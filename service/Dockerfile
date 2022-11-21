FROM node:16-alpine

RUN mkdir -p /usr/src/app/service

WORKDIR /usr/src/app/service

COPY package.json /usr/src/app/service

RUN npm install

COPY . /usr/src/app/service


CMD [ "node", "app.js" ]