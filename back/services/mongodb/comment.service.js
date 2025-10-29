const { PrismaClient } = require('../../prisma/generated/mongodb');
const prismaMongodb = new PrismaClient();

async function getAllComments(){
    return await prismaMongodb.comment.findMany();
}

async function getCommentsByArticleId(id){
    console.log(id);
    return prismaMongodb.comment.findMany({
        where: {
            article_id: id,
        },
    })
}

module.exports = {
    getAllComments,
    getCommentsByArticleId
};
