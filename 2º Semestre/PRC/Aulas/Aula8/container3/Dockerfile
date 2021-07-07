FROM node:15

WORKDIR /app

COPY get_request.js .
COPY package.json .

RUN npm install

RUN npm start

RUN npm i json-server -g

EXPOSE 3002

CMD json-server -H 0.0.0.0 -p 3002 entidades.json