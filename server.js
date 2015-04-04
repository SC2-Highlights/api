var express = require('express');
var pg = require('pg');
var config = require('./config');
var routing = require('./routing');
var dbHandler = require('./services/dbhandler');

dbHandler.connect(config.db.credentials);

var app = express();
var router = express.Router();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

routing(app, router, dbHandler);

app.listen(3000);
