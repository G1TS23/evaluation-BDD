const { PrismaClient } = require('../../prisma/generated/postgres');
const prismaPostgres = new PrismaClient();

async function createArticle(article) {
    const validatedArticle = {
        title: article.title,
        content: article.content,
        description: article.description,
        created_at: new Date(article.created_at || Date.now()),
        id_user: parseInt(article.id_user),
    }
    return prismaPostgres.article.create({data: validatedArticle});
}

async function getArticleById(id) {
    const article = await prismaPostgres.article.findUnique({
        where: {
            id_article: id
        },
        include: {
            user: true
        }
    });
    if (article) {
        return article;
    }
    else {
        return null;
    }
}

async function getAllArticles(criterias = {}) {
    const where = {}
    if (criterias.title) {
        where.title = criterias.title;
    }
    const articles = await prismaPostgres.article.findMany({
        where,
        include: {
            user: true
        }
    });
    if(articles) {
        return articles;
    }
    else {
        return null;
    }
}

async function updateArticle(articleId, updatedData) {
    return prismaPostgres.article.update({
        where: { 
            id_article: articleId 
        },
        data: updatedData
    });
}

async function deleteArticle(id) {
    return prismaPostgres.article.delete({
        where: { 
            id_article: id 
        }
    });
}

module.exports = { createArticle, getArticleById, getAllArticles, updateArticle, deleteArticle };
