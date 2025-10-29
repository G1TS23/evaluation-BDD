const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article.controller');
const articleService = require('../services/mongodb/article.service');

router.get("/", articleController.getAllArticles);
router.get("/id", articleController.getArticleById);
router.get("/recent", articleController.getRecentArticles);

router.post("/", articleController.createArticle);

router.put("/", articleController.updateArticle);

router.delete("/", articleController.deleteArticle);

router.delete("/first", articleService.deleteFirstArticle);

module.exports = router;