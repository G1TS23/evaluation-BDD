const articleService = require('../services/postgres/article.service')

async function createArticle(req, res) {
    try {
        const article = await articleService.createArticle(req.body);
        res.json(article);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getArticleById(req, res) {
    try {
        const id = parseInt(req.query.id);
        const article = await articleService.getArticleById(id);
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

async function getAllArticles(req, res) {
    try{
        const { title, } = req.query;
        const articles = await articleService.getAllArticles({ title });
        res.json(articles);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function updateArticle (req, res){
    try {
        const idArticle = parseInt(req.query.id);
        const article = await articleService.updateArticle(idArticle, req.body);
        res.json(article);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteArticle (req, res){
    try {
        const idArticle = parseInt(req.query.id);
        const article = await articleService.deleteArticle(idArticle);
        res.json(article);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createArticle, getArticleById, getAllArticles, updateArticle, deleteArticle }