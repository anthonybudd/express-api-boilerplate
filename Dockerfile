FROM node:20

RUN apt-get install -y imagemagick ghostscript

RUN npm install -g nodemon mocha sequelize sequelize-cli mysql2 eslint

WORKDIR /app
COPY . /app
RUN npm install

ENTRYPOINT [ "node", "/app/src/index.js" ]
