const { PrismaClient } = require('../../prisma/generated/postgres');
const prismaPostgres = new PrismaClient();

module.exports = prismaPostgres;
    