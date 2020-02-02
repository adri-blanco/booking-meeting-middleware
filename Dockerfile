FROM node:13.7.0-alpine

WORKDIR /app

COPY package.json .
RUN npm install --quiet
COPY . .