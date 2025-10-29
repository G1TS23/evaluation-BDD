const { PrismaClient } = require('../../prisma/generated/postgres');
const prismaPostgres = new PrismaClient();

async function createUser(user) {
    return await prismaPostgres.user.create({data: user});
}

async function getUserById(id) {
    const user = await prismaPostgres.user.findUnique({
        where: {
            id_user: id
        },
        // include: {
        //     article: true
        // }
    });
    if (user) {
        return user;
    }
    else {
        return null;
    }
}

async function getAllUsers(criterias = {}) {
    const where = {}
    if (criterias.firstname) {
        where.firstname = criterias.firstname;
    }
    if (criterias.lastname) {
        where.lastname = criterias.lastname;
    }
    if (criterias.email) {
        where.email = criterias.email;
    }
    if (criterias.role) {
        where.role = criterias.role;
    }
    if (criterias.nb_article) {
        where.nb_article = criterias.nb_article;    
    }
    const users = await prismaPostgres.user.findMany({
        where,
        // include: {
        //     article: true
        // }
    });
    if(users) {
        return users;
    }
    else {
        return null;
    }
}

module.exports = { createUser, getUserById, getAllUsers, };
