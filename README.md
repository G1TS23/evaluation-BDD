# evaluation-BDD


## Exemple de requetes :

### Commentaires
```curl
GET http://localhost:8080/comment
GET http://localhost:8080/comment?article_id=9
GET http://localhost:8080/comment?id_user=5
DELETE http://localhost:8080/comment?id=690231fba700f8937e4f8806
PUT http://localhost:8080/comment?id=690233e0db8bea977e4f8806
    body : {
        "content": "Les index GIN ont considérablement accéléré mes recherches full-text ! Merci !!!!"
      }
POST http://localhost:8080/comment
    body : {
          "article_id": 9,
          "content": "Super article",
          "created_at": "2024-10-06T00:00:00.000Z",
          "id_user": 5,
          "articleObjectId": null
        }
```
