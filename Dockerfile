FROM node:22

RUN apt update && apt install -y vim moreutils
RUN npm install -g nodemon mocha sequelize sequelize-cli mysql2 eslint

WORKDIR /app
COPY . /app
RUN npm install

ENTRYPOINT [ "node", "/app/src/index.js" ]
