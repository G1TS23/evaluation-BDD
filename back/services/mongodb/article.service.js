const { PrismaClient } = require('../../prisma/generated/postgres');
const prismaMongodb = new PrismaClient();

module.exports = prismaMongodb;
