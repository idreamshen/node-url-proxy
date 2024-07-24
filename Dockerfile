FROM node:22-alpine3.19

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install

COPY . /app

EXPOSE 3000

CMD [ "node", "index.js" ]