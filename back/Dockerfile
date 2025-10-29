FROM node:lts-alpine3.21

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN chown -R node:node /home/node/app

USER node

RUN npm install

RUN npx prisma generate --schema=prisma/postgres/schema.prisma && \
    npx prisma generate --schema=prisma/mongodb/schema.prisma

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]