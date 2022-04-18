FROM node:lts-alpine

WORKDIR /srv/app

COPY package.json ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
