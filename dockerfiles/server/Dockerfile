FROM node:lts-alpine

WORKDIR /srv/app

COPY package.json yarn.lock .env scripts/startup.sh ./

RUN chmod +x startup.sh

RUN yarn

COPY src/server ./src/server/

ENTRYPOINT ["./startup.sh"]
