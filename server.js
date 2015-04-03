var express = require('express');
var pg = require('pg');
var config = require('./config');
var routing = require('./routing');
var dbHandler = require('./services/dbhandler');

dbHandler.connect(config.db.credentials);

var app = express();
var router = express.Router();

routing(app, router, dbHandler);

app.listen(3000);
