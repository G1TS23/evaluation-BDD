const articleServicePostgres = require('../services/postgres/article.service')
const articleServiceMongodb = require('../services/mongodb/article.service')

async function createArticle(req, res) {
    try {
        const article = await articleServicePostgres.createArticle(req.body);
        const articleMongo = await articleServiceMongodb.createArticle(req.body);
        res.json(article);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getArticleById(req, res) {
    try {
        const id = parseInt(req.query.id);
        const article = await articleServicePostgres.getArticleById(id);
        if(article){
            res.json(article);
        }
        else {
            res.json({"error": `Article ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getRecentArticles(req, res) {
    try {
        const articles = await articleServiceMongodb.getAllArticles();
        res.json(articles);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function getAllArticles(req, res) {
    try{
        const { title, } = req.query;
        const articles = await articleServicePostgres.getAllArticles({ title });
        res.json(articles);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function updateArticle (req, res){
    try {
        const idArticle = parseInt(req.query.id);
        const article = await articleServicePostgres.updateArticle(idArticle, req.body);
        res.json(article);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteArticle (req, res){
    try {
        const idArticle = parseInt(req.query.id);
        const article = await articleServicePostgres.deleteArticle(idArticle);
        res.json(article);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createArticle, getArticleById, getRecentArticles, getAllArticles, updateArticle, deleteArticle }