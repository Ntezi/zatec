FROM node:lts-alpine

WORKDIR /srv/app

COPY package.json scripts/startup.sh ./

RUN chmod +x startup.sh

RUN yarn

COPY . .

ENTRYPOINT ["./startup.sh"]
