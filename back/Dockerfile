FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=prisma/postgres/schema.prisma && \
    npx prisma generate --schema=prisma/mongodb/schema.prisma

EXPOSE 3000

CMD [ "node", "app.js" ]