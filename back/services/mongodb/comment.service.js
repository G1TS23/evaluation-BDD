const { PrismaClient } = require('../../prisma/generated/mongodb');
const articleServiceMongodb = require('./article.service')
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

async function getCommentById(id){
    const comment = await prismaMongodb.comment.findUnique({
        where: {
            id: id
        }
    });
    if (comment) {
        return comment;
    }
    else {
        return null;
    }
}

async function deleteComment(id) {
    const comment = await getCommentById(id);
    if (!comment) return null;

    try {
        const article = await articleServiceMongodb.getArticleById(comment.article_id);
        if (article && article.comments.some(c => c.id === id)) {
            await removeCommentFromArticle(comment.article_id, id);
        }
    } catch (err) {
        console.log(`Comment ${id} not found in article ${comment.article_id}, skipping nested delete`);
    }

    try {
        return await prismaMongodb.comment.delete({ where: { id } });
    } catch (err) {
        if (err.code === 'P2025') {
            return { message: 'Comment does not exist' };
        }
        throw err;
    }
}

async function createComment(comment) {
    const validatedComment = {
        article_id: parseInt(comment.article_id),
        content: String(comment.content),
        created_at: new Date(comment.created_at || Date.now()),
        id_user: parseInt(comment.id_user)
    };

    try {
        const recentArticles = await articleServiceMongodb.getAllArticles();

        for (const article of recentArticles) {
            if (article.article_id === validatedComment.article_id) {
                if (article.comments.length > 4) {
                    await deleteFirstCommentFromArticle(article.article_id);
                }
                await articleServiceMongodb.updateArticle(article.article_id, { comments: validatedComment });
            }
        }

        const articleCommented = await prismaMongodb.article.findUnique({
            where: { article_id: validatedComment.article_id },
            include: { comments: true }
        });

        return articleCommented;
    } catch (error) {
        console.log(error);
    }
}


async function updateComment(commentId, updatedData) {
    try {
        const updatedComment = await prismaMongodb.comment.update({
            where: { id: commentId },
            data: updatedData
        });

        const recentArticles = await articleServiceMongodb.getAllArticles();

        for (const article of recentArticles) {
            const commentIndex = article.comments.findIndex(c => c.id === commentId);
            if (commentIndex !== -1) {
                article.comments[commentIndex] = {
                    ...article.comments[commentIndex],
                    ...updatedData
                };
                await articleServiceMongodb.updateArticle(article.article_id, { comments: article.comments });
                break; // eviter de loop sur les autres commentaires
            }
        }

        return updatedComment;
    } catch (error) {
        console.log(error);
    }
}


async function deleteFirstCommentFromArticle(article_id){
    const article = await articleServiceMongodb.getArticleById(article_id);
    const firstCommentId = article.comments[0].id;
    await removeCommentFromArticle(article_id, firstCommentId);
}

async function removeCommentFromArticle(articleId, commentId) {
    return prismaMongodb.article.update({
        where: { article_id: articleId },
        data: {
        comments: {
            disconnect: [{ id: commentId }]
        }
        }
    });
}

async function deleteManyComment(idArticle){
    return prismaMongodb.comment.deleteMany(
        {
            where: {
                article_id: idArticle,
            }
        }
    )
}

module.exports = {
    getAllComments,
    deleteComment,
    createComment,
    updateComment,
    deleteManyComment,
};
