FROM node:lts-alpine
RUN apk update && \
    apk upgrade && \
    apk add postgresql-client

WORKDIR /usr/srs/app

COPY ./package*.json ./

RUN npm install
RUN npm install pm2@latest -g

COPY scripts/startup.sh .
RUN chmod +x startup.sh

COPY . .
ENTRYPOINT ["./startup.sh"]
