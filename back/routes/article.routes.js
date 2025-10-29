const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article.controller');

router.get("/", articleController.getAllArticles);
router.get("/id", articleController.getArticleById);

router.post("/", articleController.createArticle);

router.put("/", articleController.updateArticle);

router.delete("/", articleController.deleteArticle);

module.exports = router;