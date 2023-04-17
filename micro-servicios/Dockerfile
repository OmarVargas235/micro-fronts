FROM node:16-alpine

WORKDIR /app
COPY dist/* ./
COPY server/* ./
RUN npm install
CMD [ "node", "server.js" ]