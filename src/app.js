require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const articlesRouter = require('./articles/articles-router');

const app = express();

const morganOptions = (NODE_ENV === 'production')
    ? 'tiny'
    : 'dev';

app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());

app.use('/articles', articlesRouter);

/*  MOVED TO ./articles/articles-router.js
app.get('/articles', (req, res, next) => {
    const knexInstance = req.app.get('db');
    ArticlesService.getAllArticles(knexInstance)
        .then(articles => {
            res.json(articles.map(article => ({
                id: article.id,
                title: article.title,
                style: article.style,
                content: article.content,
                date_published: new Date(article.date_published)
            })))
        })
        .catch(next);
});

app.post('/articles', jsonParser, (req, res, next) => {
    const {title, content, style} = req.body;
    const newArticle = {title, content, style};
    ArticlesService.insertArticle(
        req.app.get('db'),
        newArticle
    )
        .then(article => {
            res
                .status(201)
                .location(`/articles/${article.id}`)
                .json(article)
        })
        .catch(next)
});

app.get('/articles/:article_id', (req, res, next) => {
    //res.json({'requested_id': req.paramas.article_id, this: 'should fail'})
    const knexInstance = req.app.get('db');
    ArticlesService.getById(knexInstance, req.params.article_id)
        .then(article => {
            if(!article) {
                return res.status(404).json({
                    error: {message: `Article doesn't exist`}
                })
            }
            //res.json(article)
            res.json({
                id: article.id,
                title: article.title,
                style: article.style,
                content: article.content,
                date_published: new Date(article.date_published)
            })
        })
        .catch(next);
});
*/

app.get('/', (req, res) => {
    res.send('Hello, world!')
});

// USED TO DEMONSTRATE XSS SCRIPTING ATTACK
/*app.get('/xss', (req, res) => {
    res.cookie('secretToken', '1234567890');
    res.sendFile(__dirname + '/xss-example.html');
});*/

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = {error: {message: 'server error'}}
    } else {
        console.error(error);
        response = {message: error.message, error}
    }
    res.status(500).json(response);
});

module.exports = app;