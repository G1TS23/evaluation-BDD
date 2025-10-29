const express = require('express');
const router = express.Router();

const postgresUserController = require('../controllers/user.controller');

router.get("/", postgresUserController.getAllUsers);


module.exports = router;