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
    if (criterias.id) {
        where.id = criterias.id;
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
    const validatedComment = {
        article_id: parseInt(comment.article_id),  // Convertir en int
        content: String(comment.content),           // S'assurer que c'est une string
        created_at: new Date(comment.created_at || Date.now()), // Convertir en Date
        id_user: parseInt(comment.id_user)         // Convertir en int
    };
    console.log(validatedComment);
    try {
        const newComment = await prismaMongodb.comment.create({
            data: validatedComment
        });
        return newComment;
    } catch (error) {
        console.log(error);
    }

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
