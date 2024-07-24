FROM node:alpine

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install

# Bundle app source
COPY . /app
CMD [ "node", "index.js" ]