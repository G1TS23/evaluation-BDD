const commentService = require('../services/mongodb/comment.service')

async function getAllComments(req, res) {
    try{
        const comments = await commentService.getAllComments();
        res.json(comments);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getCommentsByArticleId(req, res) {
    try{
        const id = parseInt(req.query.id);
        const comments = await commentService.getCommentsByArticleId(id);
        res.json(comments);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAllComments,
    getCommentsByArticleId
}