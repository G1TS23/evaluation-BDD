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

module.exports = { getAllComments }