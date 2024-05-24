FROM node:lts-alpine

WORKDIR /app

COPY client /app/client
COPY server /app/server

RUN cd client && npm install
RUN cd server && npm install

EXPOSE 4000

CMD cd client && npm start & cd server && npm start
