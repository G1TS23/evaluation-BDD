DROP SCHEMA IF EXISTS blog CASCADE;
CREATE SCHEMA blog;
SET search_path TO blog;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DOMAIN email AS TEXT
    CHECK (VALUE ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

CREATE TABLE users (
    id_user INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email email UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'admin')) DEFAULT 'user',
    nb_article INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE articles (
    id_article INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    id_user INTEGER NOT NULL,
    CONSTRAINT fk_id_user FOREIGN KEY (id_user) REFERENCES users (id_user)
)

-- 2 administrateurs
INSERT INTO users (firstname, lastname, email, password_hash, role, nb_article)
VALUES 
('Alice', 'Martin', 'alice.martin@example.com', crypt('admin1', gen_salt('bf')), 'admin', 7),
('Bruno', 'Dupuis', 'bruno.dupuis@example.com', crypt('admin2', gen_salt('bf')), 'admin', 4),
('Claire', 'Dubois', 'claire.dubois@example.com', crypt('user1', gen_salt('bf')), 'user', 3),
('David', 'Morel', 'david.morel@example.com', crypt('user2', gen_salt('bf')), 'user', 2),
('Emma', 'Bernard', 'emma.bernard@example.com', crypt('user3', gen_salt('bf')), 'user', 3),
('Franck', 'Lemoine', 'franck.lemoine@example.com', crypt('user4', gen_salt('bf')), 'user', 1),
('Julie', 'Renard', 'julie.renard@example.com', crypt('user5', gen_salt('bf')), 'user', 0),
('Kevin', 'Marchand', 'kevin.marchand@example.com', crypt('user6', gen_salt('bf')), 'user', 0),
('Laura', 'Petit', 'laura.petit@example.com', crypt('user7', gen_salt('bf')), 'user', 0),
('Nicolas', 'Roux', 'nicolas.roux@example.com', crypt('user8', gen_salt('bf')), 'user', 0);

INSERT INTO articles (title, description, content, id_user) VALUES
('Découvrir PostgreSQL', 'Introduction à PostgreSQL pour les débutants.', 'PostgreSQL est un système de gestion de base de données relationnelle très puissant...', 1),
('Les bases du SQL', 'Comprendre les requêtes SELECT, INSERT et UPDATE.', 'Dans cet article, nous verrons comment manipuler les données avec SQL...', 1),
('Améliorer les performances SQL', 'Astuces pour optimiser vos requêtes.', 'L’optimisation SQL passe souvent par une bonne utilisation des index...', 3),
('Sécurité des mots de passe', 'Comment stocker les mots de passe en toute sécurité.', 'L’utilisation de bcrypt via crypt() dans PostgreSQL est une bonne pratique...', 1),
('Créer une API avec Flask', 'Débuter avec Flask et Python.', 'Flask est un micro-framework Python très pratique pour créer des API...', 4),
('Introduction à JavaScript', 'Les bases pour débuter en JS.', 'JavaScript est un langage indispensable pour le développement web moderne...', 5),
('CSS moderne', 'Les nouveautés de CSS3.', 'Les propriétés flexbox et grid facilitent grandement la mise en page responsive...', 6),
('HTML sémantique', 'Bien structurer ses pages web.', 'L’usage des balises sémantiques améliore l’accessibilité et le référencement...', 1),
('Docker pour les développeurs', 'Introduction à la conteneurisation.', 'Docker permet d’exécuter des applications dans des environnements isolés...', 2),
('Python pour la data science', 'Les bibliothèques essentielles.', 'Pandas, NumPy et Matplotlib sont les piliers de l’analyse de données en Python...', 3),
('Les jointures SQL', 'Comprendre INNER JOIN, LEFT JOIN et RIGHT JOIN.', 'Les jointures permettent de combiner les données de plusieurs tables...', 4),
('Gestion des transactions', 'ACID et intégrité des données.', 'Les transactions garantissent la cohérence des données dans les systèmes SQL...', 5),
('Déployer une app sur Heroku', 'Tutoriel simple de déploiement.', 'Heroku permet de déployer des applications web sans gestion serveur complexe...', 2),
('Versionner son code avec Git', 'Les commandes de base à connaître.', 'Git est l’outil incontournable pour la gestion de versions...', 1),
('Bonnes pratiques en SQL', 'Éviter les pièges courants.', 'Il est recommandé d’utiliser des clés primaires, des contraintes et des index...', 2),
('Les vues dans PostgreSQL', 'Créer et utiliser des vues.', 'Les vues permettent de simplifier l’accès aux données complexes...', 3),
('Les fonctions en SQL', 'Créer des fonctions personnalisées.', 'SQL permet de définir des fonctions pour automatiser certaines tâches...', 1),
('Triggers dans PostgreSQL', 'Automatiser des actions à l’insertion ou la mise à jour.', 'Les triggers sont utiles pour maintenir l’intégrité des données...', 5),
('Indexation avancée', 'Utiliser les index GIN et GiST.', 'Ces index permettent d’améliorer la recherche de texte ou les requêtes spatiales...', 2),
('JSON dans PostgreSQL', 'Stocker et interroger des données JSON.', 'PostgreSQL offre un excellent support du format JSON via jsonb...', 1);

