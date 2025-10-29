import { PrismaClient } from '../../prisma/generated/mongodb/';
const prismaMongodb = new PrismaClient();

module.exports = prismaMongodb;