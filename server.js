var express = require('express');
var pg = require('pg');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config');
var routing = require('./routing');
var dbHandler = require('./services/dbhandler');
var multer = require('multer');

var port = 3000;

dbHandler.connect(config.db.credentials);

var transporter = nodemailer.createTransport();

var serviceManager = {
    "dbClient": dbHandler,
    "mail": transporter
};

var app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://sc2hl');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer())
app.use(cookieParser())

routing(app, serviceManager);

app.listen(config.port);
console.log('listening on port: ' + config.port);


