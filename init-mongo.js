// Connexion avec les credentials admin
db = db.getSiblingDB('blog');

db.createCollection("articles", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "email", "dateInscription"],
            properties: {
                nom: {
                    bsonType: "string",
                    description: "Nom obligatoire de type string"
                },
                email: {
                    bsonType: "string",
                    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                    description: "Email valide obligatoire"
                },
                age: {
                    bsonType: "int",
                    minimum: 18,
                    maximum: 120,
                    description: "Age optionnel entre 18 et 120"
                },
                dateInscription: {
                    bsonType: "date"
                }
            }
        }
    }
});

db.createCollection("comments", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nom", "email", "dateInscription"],
            properties: {
                nom: {
                    bsonType: "string",
                    description: "Nom obligatoire de type string"
                },
                email: {
                    bsonType: "string",
                    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                    description: "Email valide obligatoire"
                },
                age: {
                    bsonType: "int",
                    minimum: 18,
                    maximum: 120,
                    description: "Age optionnel entre 18 et 120"
                },
                dateInscription: {
                    bsonType: "date"
                }
            }
        }
    }
});

// ========================================
// COLLECTION: articles
// ========================================
db.articles.insertMany([
]);

// ========================================
// COLLECTION: comments
// ========================================
db.comments.insertMany([
]);
