const { PrismaClient } = require('../../prisma/generated/mongodb');
const prismaMongodb = new PrismaClient();

async function getAllArticles(){
    return prismaMongodb.article.findMany();
}

async function createArticle(article){
    await deleteFirstArticle();

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

async function deleteFirstArticle(req, res){
    const articles = await prismaMongodb.article.findMany();
    const firstArticleId = articles[0].id;
    console.log(firstArticleId);
    const article = await deleteArticle(firstArticleId);
    res.json(article);
}

module.exports = {
    getAllArticles,
    deleteFirstArticle
};
