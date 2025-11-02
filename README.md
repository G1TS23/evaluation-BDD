# Evaluation-BDD

## Table des matières

1. [Installation](#installation)
2. [Frontend](#front)
3. [API - Exemples de requêtes](#api)
    1. [Commentaires](#comments)
    2. [Articles](#articles)
    3. [Utilisateurs](#users)

&nbsp;

## Installation <a name="installation"></a>

Créer les `.env` sur la base des `.env.exemple` au même niveau que ces derniers

Puis executer la commande suivante à la racine du projet :

```bash
docker compose up -d --build
```

&nbsp;

## Frontend <a name="front"></a>

Une ébauche de front est disponible à l'adresse [http://localhost:8080](http://localhost:8080)

&nbsp;

## API <a name="api"></a>

### Exemple de requêtes : <a name="requests"></a>

&nbsp;

### Commentaires <a name="comments"></a>

```curl
GET http://localhost:3000/comment
GET http://localhost:3000/comment?article_id=9
GET http://localhost:3000/comment?id_user=5
GET http://localhost:3000/comment?id=690231fba700f8937e4f8806
DELETE http://localhost:3000/comment?id=690231fba700f8937e4f8806
PUT http://localhost:3000/comment?id=690233e0db8bea977e4f8806
    body : {
        "content": "Les index GIN ont considérablement accéléré mes recherches full-text ! Merci !!!!"
      }
POST http://localhost:3000/comment
    body : {
          "article_id": 9,
          "content": "Super article",
          "created_at": "2024-10-06T00:00:00.000Z",
          "id_user": 5,
        }
```

&nbsp;

### Articles <a name="articles"></a>

```curl
GET http://localhost:3000/article
GET http://localhost:3000/article/id?id=15
GET http://localhost:3000/article/recent
POST http://localhost:3000/article/
    body : {
        "title": "Essai",
        "description": "c'est un test",
        "content": "lorem ipsum",
        "id_user": 5
        }
PUT http://localhost:3000/article/?id=21
    body : {
        "content": "lorem de lorem ipsum de ipsum"
    }
DELETE http://localhost:3000/article/?id=21
```

&nbsp;

### Utilisateurs <a name="users"></a>

```curl
GET http://localhost:3000/user
GET http://localhost:3000/user/id?id=11
POST http://localhost:3000/user/
    body : {
        "firstname": "Test",
        "lastname": "du test",
        "email": "test@test.mail",
        "password_hash": "test1"
    }
PUT http://localhost:3000/user/?id=11
    body : {
        "lastname": "de le test"
    }
DELETE http://localhost:3000/user/?id=12
```