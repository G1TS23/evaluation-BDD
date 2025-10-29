const express = require('express');
const router = express.Router();

const postgresUserService = require('../services/postgres/user.service');

router.get("/", postgresUserService.getAllUsers);


module.exports = router;