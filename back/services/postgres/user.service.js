import { PrismaClient } from '../../prisma/generated/postgres';
const prismaPostgres = new PrismaClient();

module.exports = prismaPostgres;