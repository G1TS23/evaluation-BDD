const userService = require('../services/postgres/user.service')

async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getUserById(req, res) {
    try {
        const id = parseInt(req.query.id);
        const user = await userService.getUserById(id);
        if(user){
            res.json(user);
        }
        else {
            res.json({"error": `User ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllUsers(req, res) {
    try{
        const { firstname, lastname, email, role, nb_article } = req.query;
        const users = await userService.getAllUsers({ firstname, lastname, email, role, nb_article });
        res.json(users);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = { createUser, getUserById, getAllUsers, }