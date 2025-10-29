const express = require('express');
const router = express.Router();

const postgresArticleService = require('../services/postgres/article.service');
const mongodbArticleService = require('../services/mongodb/article.service');

module.exports = router;