const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment.controller');

router.get("/", commentController.getAllComments);
router.delete("/", commentController.deleteComment);
router.post("/", commentController.createComment);
router.put("/", commentController.updateComment);

module.exports = router;