const express = require('express');
const app = express();

const hostname = 'app';
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const articleRouter = require('./routes/article.routes');
const commentRouter = require('./routes/comment.routes');
const postgresUserRouter = require('./routes/user.routes');

app.use('/article', articleRouter);
app.use('/comment', commentRouter);
app.use('/user', postgresUserRouter);

app.listen(port, hostname, () => {
    console.log(`Serveur démarré sur http://${hostname}:${port}`);
});