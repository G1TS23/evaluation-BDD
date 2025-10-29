const { PrismaClient } = require('../../prisma/generated/mongodb');
const prismaMongodb = new PrismaClient();

async function getAllComments(criterias = {}){
    const where = {}
    if (criterias.article_id) {
        where.article_id = parseInt(criterias.article_id);
    }
    if (criterias.id_user) {
        where.id_user = parseInt(criterias.id_user);
    }
    const comments = await prismaMongodb.comment.findMany({
            where,
        }
    );
    if(comments) {
        return comments;
    }
    else {
        return null;
    }
}

async function deleteComment(id){
    return prismaMongodb.comment.delete(
        {
            where: {
                id: id,
            }
        }
    )
}

async function createComment(comment){
    //const article_id = comment.article_id;
    return prismaMongodb.comment.create({data: comment});
}

async function updateComment(commentId, updatedData){
    return prismaMongodb.comment.update(
        {
        where: {
            id: commentId
        },
        data: updatedData
        }
    );
}

module.exports = {
    getAllComments,
    deleteComment,
    createComment,
    updateComment,
};
