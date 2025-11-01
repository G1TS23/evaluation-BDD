const { PrismaClient } = require('../../prisma/generated/mongodb');
const prismaMongodb = new PrismaClient();

async function getAllArticles(){
    return prismaMongodb.article.findMany();
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
                id: id
            }
        }
    );
}

async function deleteFirstArticle(){
    const articles = await getAllArticles();
    const firstArticleId = articles[0].id;
    await deleteArticle(firstArticleId);
}

module.exports = {
    getAllArticles,
    deleteFirstArticle,
    createArticle,
};
