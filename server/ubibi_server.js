var express = require('express');
var http = require('http');
var myRouter = require('./router');
var path = require('path');

var app = express();
app.use('/',myRouter);

http.createServer(app).listen(2701, '127.0.0.1');
console.log('Server running at 127.0.0.1:2701');