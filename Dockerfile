FROM node:14.19

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet
COPY . .
CMD npm start