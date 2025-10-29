const { PrismaClient } = require('../../prisma/generated/postgres');
const prismaPostgres = new PrismaClient();


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
        //     article: true,
        // }
    });
    if(users) {
        return users;
    }
    else {
        return null;
    }
}

module.exports = { getAllUsers, };
