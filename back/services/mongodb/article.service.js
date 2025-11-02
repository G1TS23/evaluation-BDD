const { PrismaClient } = require('../../prisma/generated/mongodb');
const prismaMongodb = new PrismaClient();

async function getAllArticles(){
    return prismaMongodb.article.findMany({
        include: {
            comments: true
        }
    });
}

async function getArticleById(id){
    const article = await prismaMongodb.article.findUnique({
        where: {
            article_id: id
        },
        include: {
            comments: true
        }
    });
    if (article) {
        return article;
    }
    else {
        return null;
    }
}

async function createArticle(article){
    await deleteFirstArticle();
    /**
     * @type {import('../../prisma/generated/mongodb').ArticleCreateInput}
     */
    const validatedArticle = {
        title: String(article.title),
        content: String(article.content),
        description: String(article.description),
        created_at: new Date(article.created_at || Date.now()),
        id_user: parseInt(article.id_user),
        article_id: parseInt(article.id_article),
    }
    return prismaMongodb.article.create({
        data: /** @type {any} */ (validatedArticle)
    })
}

async function deleteArticle(id){
    return prismaMongodb.article.delete(
        {
            where: {
                article_id: id
            }
        }
    );
}

async function deleteFirstArticle(){
    const articles = await getAllArticles();
    const firstArticleId = articles[0].article_id;
    await deleteArticle(firstArticleId);
}

async function updateArticle(articleId, updatedData = {}) {
    const data = {};

    if (updatedData.title) {
        data.title = updatedData.title;
    }
    if (updatedData.content) {
        data.content = updatedData.content;
    } 
    if (updatedData.description) {
        data.description = updatedData.description;
    } 
    if (updatedData.id_user) {
        data.id_user = updatedData.id_user;
    } 
    if (updatedData.article_id) {
        data.articleId = updatedData.article_id;
    } 

    if (updatedData.comments) {
        data.comments = { create: updatedData.comments };
    }

    return prismaMongodb.article.update({
        where: { article_id: articleId },
        data: data
    });
}


module.exports = {
    getAllArticles,
    getArticleById,
    deleteFirstArticle,
    createArticle,
    updateArticle,
    deleteArticle,
};
