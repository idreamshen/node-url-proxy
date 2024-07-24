FROM node:alpine

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install

COPY . /app

EXPOSE 3000

CMD [ "node", "index.js" ]