const { PrismaClient } = require('../../prisma/generated/mongodb');
const prismaMongodb = new PrismaClient();

async function getAllComments(){
    return await prismaMongodb.comment.findMany();
}

module.exports = { getAllComments };
