FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npx prisma generate --schema=prisma/postgres/schema.prisma && \
    npx prisma generate --schema=prisma/mongodb/schema.prisma

EXPOSE 8080

CMD [ "node", "app.js" ]