const express = require('express');
const router = express.Router();

const postgresUserController = require('../controllers/user.controller');

router.get("/", postgresUserController.getAllUsers);
router.get("/id", postgresUserController.getUserById);

router.post("/", postgresUserController.createUser);

router.put("/", postgresUserController.updateUser);

router.delete("/", postgresUserController.deleteUser);

module.exports = router;