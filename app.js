var bodyParser = require('body-parser');
var compress = require('compression');
var express = require('express');
var db = require('./lib/db');
var router = require('./routes');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(compress());
app.use(bodyParser());

app.use('/', router);

app.listen(app.get('port'), function() {
  console.log("Started server...");
});