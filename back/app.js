const express = require('express');
const cors = require('cors')
const app = express();

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Autoriser uniquement le front (plus sûr que '*')
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}))

const articleRouter = require('./routes/article.routes');
const commentRouter = require('./routes/comment.routes');
const postgresUserRouter = require('./routes/user.routes');

app.use('/article', articleRouter);
app.use('/comment', commentRouter);
app.use('/user', postgresUserRouter);

app.listen(port, hostname, () => {
    console.log(`Serveur démarré sur http://${hostname}:${port}`);
});