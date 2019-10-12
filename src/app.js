require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const articlesRouter = require('./articles/articles-router');
const usersRouter = require('./users/users-router');
const commentsRouter = require('./comments/comments-router');

const app = express();

const morganOptions = (NODE_ENV === 'production')
    ? 'tiny'
    : 'dev';

app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());

app.use('/api/articles', articlesRouter);

app.use('/api/users', usersRouter);

app.use('/api/comments', commentsRouter);

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