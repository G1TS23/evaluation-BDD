const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongodbArticleRouter = require('./routes/mongodb/article.routes');
const mongodbCommentRouter = require('./routes/mongodb/comment.routes');

const postgresArticleRouter = require('./routes/postgres/article.routes');
const postgresUserRouter = require('./routes/postgres/user.routes');

app.use('/mongodb/article', mongodbArticleRouter);
app.use('/mongodb/comment', mongodbCommentRouter);
app.use('/postgres/article', postgresArticleRouter);
app.use('/postgres/user', postgresUserRouter);

app.listen(port, hostname, () => {
    console.log(`Serveur démarré sur http://${hostname}:${port}`);
});