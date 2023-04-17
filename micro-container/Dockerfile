FROM node:18-alpine

WORKDIR /app
COPY dist/* ./
COPY server/* ./
COPY src/micro-roxfarma.json ./
RUN npm install
CMD [ "node", "server.js" ]