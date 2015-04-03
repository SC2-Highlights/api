var express = require('express');
var pg = require('pg');
var config = require('./config');
var routing = require('./routing');

var app = express();
var router = express.Router();

routing(app, router);

app.listen(3000);
