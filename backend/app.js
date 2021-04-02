const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const usersRouter = require("./routes/user").router;
const postsRouter = require("./routes/posts").router;
const comsRouter = require("./routes/coms").router;
const path = require('path');
require('dotenv').config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/", postsRouter);
app.use("/api/", usersRouter);
app.use("/api/", comsRouter);

module.exports = app;