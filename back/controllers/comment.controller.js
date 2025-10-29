const commentService = require('../services/mongodb/comment.service')

async function getAllComments(req, res) {
    try{
        const { article_id, user_id } = req.query;
        const comments = await commentService.getAllComments({ article_id, user_id });
        res.json(comments);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function deleteComment(req, res) {
    try{
        const id = req.query.id;
        const comments = await commentService.deleteComment(id);
        res.json(comments);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function createComment(req, res) {
    try{
        const body = req.body;
        const comment = await commentService.createComment(body);
        res.json(comment);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function updateComment (req, res){
    try {
        const idComment = req.query.id;
        const comment = await commentService.updateComment(idComment, req.body);
        res.json(comment);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllComments,
    deleteComment,
    createComment,
    updateComment
}