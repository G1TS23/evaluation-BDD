// Connexion avec les credentials admin
db = db.getSiblingDB('blog');

db.createCollection("articles", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "content", "created_at", "id_user", "article_id"],
            properties: {
                title: {
                    bsonType: "string",
                    description: "Titre obligatoire de type string"
                },
                description: {
                    bsonType: "string",
                    description: "Description obligatoire"
                },
                content: {
                    bsonType: "string",
                    description: "Contenu obligatoire"
                },
                created_at: {
                    bsonType: "date",
                    description: "Date obligatoire"
                },
                id_user: {
                    bsonType: ["int", "long", "double"],
                    description: "ID obligatoire"
                },
                article_id: {
                    bsonType: ["int", "long", "double"],
                    description: "ID obligatoire"
                },
                comments: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["article_id", "content", "created_at", "id_user"],
                        properties: {
                            article_id: {
                                bsonType: ["int", "long", "double"],
                                description: "Id de l'article obligatoire"
                            },
                            content: {
                                bsonType: "string",
                                description: "Contenu obligatoire"
                            },
                            created_at: {
                                bsonType: "date",
                                description: "Date obligatoire"
                            },
                            id_user: {
                                bsonType: ["int", "long", "double"],
                                description: "ID obligatoire"
                            }
                        }
                    }
                },
            }
        }
    }
});

db.createCollection("comments", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["article_id", "content", "created_at", "id_user"],
            properties: {
                article_id: {
                    bsonType: ["int", "long", "double"],
                    description: "Id de l'article obligatoire"
                },
                content: {
                    bsonType: "string",
                    description: "Contenu obligatoire"
                },
                created_at: {
                    bsonType: "date",
                    description: "Date obligatoire"
                },
                id_user: {
                    bsonType: ["int", "long", "double"],
                    description: "ID obligatoire"
                }
            }
        }
    }
});

// ========================================
// COLLECTION: articles
// ========================================
db.articles.insertMany([
    {
        title: "Les vues dans PostgreSQL",
        content: "Les vues permettent de simplifier l'accès aux données complexes en créant des requêtes réutilisables. Dans cet article, nous explorerons comment créer des vues simples et matérialisées pour optimiser vos requêtes SQL.",
        created_at: new Date('2024-09-10'),
        id_user: 3,
        article_id: 6,
        description: "Créer et utiliser des vues.",
        comments: [
            {
                article_id: 6,
                content: "Les vues matérialisées sont vraiment utiles pour les rapports !",
                created_at: new Date('2024-09-11'),
                id_user: 1
            },
            {
                article_id: 6,
                content: "Très bon article, j'ai enfin compris la différence entre les vues simples et matérialisées.",
                created_at: new Date('2024-09-12'),
                id_user: 4
            }
        ]
    },
    {
        title: "Les fonctions en SQL",
        content: "SQL permet de définir des fonctions pour automatiser certaines tâches répétitives. Découvrez comment créer des fonctions personnalisées en PL/pgSQL pour encapsuler votre logique métier directement dans la base de données.",
        created_at: new Date('2024-09-18'),
        id_user: 1,
        article_id: 7,
        description: "Créer des fonctions personnalisées.",
        comments: [
            {
                article_id: 7,
                content: "Les exemples de fonctions sont très clairs, merci !",
                created_at: new Date('2024-09-19'),
                id_user: 2
            },
            {
                article_id: 7,
                content: "Est-ce que vous pourriez faire un article sur les procédures stockées ?",
                created_at: new Date('2024-09-20'),
                id_user: 5
            },
            {
                article_id: 7,
                content: "J'utilise maintenant des fonctions pour valider mes données, c'est super pratique.",
                created_at: new Date('2024-09-21'),
                id_user: 3
            }
        ]
    },
    {
        title: "Triggers dans PostgreSQL",
        content: "Les triggers sont utiles pour maintenir l'intégrité des données en automatisant des actions lors d'événements spécifiques. Apprenez à créer des triggers BEFORE et AFTER pour l'insertion, la mise à jour et la suppression de données.",
        created_at: new Date('2024-09-25'),
        id_user: 5,
        article_id: 8,
        description: "Automatiser des actions à l'insertion ou la mise à jour.",
        comments: [
            {
                article_id: 8,
                content: "Les triggers m'ont sauvé la mise sur mon dernier projet !",
                created_at: new Date('2024-09-26'),
                id_user: 4
            },
            {
                article_id: 8,
                content: "Attention à ne pas abuser des triggers, ça peut devenir difficile à débugger.",
                created_at: new Date('2024-09-27'),
                id_user: 2
            },
            {
                article_id: 8,
                content: "Excellent article, très pédagogique !",
                created_at: new Date('2024-09-28'),
                id_user: 1
            },
            {
                article_id: 8,
                content: "J'utilise des triggers pour l'audit de mes tables, c'est parfait.",
                created_at: new Date('2024-09-29'),
                id_user: 3
            }
        ]
    },
    {
        title: "Indexation avancée",
        content: "Ces index permettent d'améliorer la recherche de texte ou les requêtes spatiales grâce aux index GIN (Generalized Inverted Index) et GiST (Generalized Search Tree). Découvrez quand et comment les utiliser pour optimiser vos performances.",
        created_at: new Date('2024-10-05'),
        id_user: 2,
        article_id: 9,
        description: "Utiliser les index GIN et GiST.",
        comments: [
            {
                article_id: 9,
                content: "Les index GIN ont considérablement accéléré mes recherches full-text !",
                created_at: new Date('2024-10-06'),
                id_user: 5
            },
            {
                article_id: 9,
                content: "Très technique mais très bien expliqué, bravo !",
                created_at: new Date('2024-10-07'),
                id_user: 1
            }
        ]
    },
    {
        title: "JSON dans PostgreSQL",
        content: "PostgreSQL offre un excellent support du format JSON via jsonb, permettant de stocker et d'interroger efficacement des données semi-structurées. Explorez les opérateurs JSON et les fonctions d'indexation pour tirer le meilleur parti de ce type de données.",
        created_at: new Date('2024-10-12'),
        id_user: 1,
        article_id: 10,
        description: "Stocker et interroger des données JSON.",
        comments: [
            {
                article_id: 10,
                content: "JSONB est incroyable, je l'utilise partout maintenant !",
                created_at: new Date('2024-10-13'),
                id_user: 3
            },
            {
                article_id: 10,
                content: "La différence entre json et jsonb est bien expliquée.",
                created_at: new Date('2024-10-14'),
                id_user: 4
            },
            {
                article_id: 10,
                content: "Pourriez-vous parler des performances de jsonb vs une table relationnelle ?",
                created_at: new Date('2024-10-15'),
                id_user: 2
            }
        ]
    }
]);

// ========================================
// COLLECTION: comments
// ========================================
db.comments.insertMany([
    {
        article_id: 10,
        content: "JSONB est incroyable, je l'utilise partout maintenant !",
        created_at: new Date('2024-10-13'),
        id_user: 3
    },
    {
        article_id: 10,
        content: "La différence entre json et jsonb est bien expliquée.",
        created_at: new Date('2024-10-14'),
        id_user: 4
    },
    {
        article_id: 10,
        content: "Pourriez-vous parler des performances de jsonb vs une table relationnelle ?",
        created_at: new Date('2024-10-15'),
        id_user: 2
    },
    {
        article_id: 9,
        content: "Les index GIN ont considérablement accéléré mes recherches full-text !",
        created_at: new Date('2024-10-06'),
        id_user: 5
    },
    {
        article_id: 9,
        content: "Très technique mais très bien expliqué, bravo !",
        created_at: new Date('2024-10-07'),
        id_user: 1
    },
    {
        article_id: 8,
        content: "Les triggers m'ont sauvé la mise sur mon dernier projet !",
        created_at: new Date('2024-09-26'),
        id_user: 4
    },
    {
        article_id: 8,
        content: "Attention à ne pas abuser des triggers, ça peut devenir difficile à débugger.",
        created_at: new Date('2024-09-27'),
        id_user: 2
    },
    {
        article_id: 8,
        content: "Excellent article, très pédagogique !",
        created_at: new Date('2024-09-28'),
        id_user: 1
    },
    {
        article_id: 8,
        content: "J'utilise des triggers pour l'audit de mes tables, c'est parfait.",
        created_at: new Date('2024-09-29'),
        id_user: 3
    },
    {
        article_id: 7,
        content: "Les exemples de fonctions sont très clairs, merci !",
        created_at: new Date('2024-09-19'),
        id_user: 2
    },
    {
        article_id: 7,
        content: "Est-ce que vous pourriez faire un article sur les procédures stockées ?",
        created_at: new Date('2024-09-20'),
        id_user: 5
    },
    {
        article_id: 7,
        content: "J'utilise maintenant des fonctions pour valider mes données, c'est super pratique.",
        created_at: new Date('2024-09-21'),
        id_user: 3
    },
    {
        article_id: 6,
        content: "Les vues matérialisées sont vraiment utiles pour les rapports !",
        created_at: new Date('2024-09-11'),
        id_user: 1
    },
    {
        article_id: 6,
        content: "Très bon article, j'ai enfin compris la différence entre les vues simples et matérialisées.",
        created_at: new Date('2024-09-12'),
        id_user: 4
    }
]);
