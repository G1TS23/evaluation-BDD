const userService = require('../../services/postgres/user.service')

async function getAllUsers(req, res) {
    try{
        const { offset, limit, firstname, lastname, email, role, nb_article } = req.query;
        const users = await userService.getAllUsers({ offset, limit, firstname, lastname, email, role, nb_article });
        res.json(users);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = { getAllUsers, }