var express = require('express');
var swig = require('swig');
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
    "mail": transporter,
    "twitter": config.twitter.credentials
};

var app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.listen(config.port);
console.log('listening on port: ' + config.port);
