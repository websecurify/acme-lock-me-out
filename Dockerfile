FROM node:alpine

RUN apk add --no-cache sqlite

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN npm install .
EXPOSE 49090

CMD ["npm", "start"]