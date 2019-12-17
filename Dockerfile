FROM node:alpine

RUN apk add --update build-base python && rm -rf /var/cache/apk/*

RUN wget http://www.sqlite.org/sqlite-autoconf-3070603.tar.gz
RUN tar xvfz sqlite-autoconf-3070603.tar.gz
WORKDIR sqlite-autoconf-3070603
RUN ./configure --build=x86_64
RUN make
RUN make install
RUN rm -Rf sqlite-autoconf*

WORKDIR /
RUN wget https://yarnpkg.com/install.sh | sh

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN yarn
EXPOSE 49090

CMD ["yarn", "run", "start"]
