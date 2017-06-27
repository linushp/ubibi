var http = require('http');
var path = require('path');
var ejs = require('ejs');
var express = require('express');
var cookieParser = require('cookie-parser');
var languageParser = require('./utils/languageParser');
var config = require('./config/config');

var photos_controller = require('./controller/photos_controller');
var ApiController = require('./controller/ApiController');

config.doConfig();
var app = express();
app.engine('html', ejs.renderFile);
app.set('x-powered-by',false);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.use(cookieParser());
app.use(languageParser('siteLanguage','en'));

app.use("/api",ApiController);


app.get('/', function (req, res) {
    var siteLanguage = req.siteLanguage;
    res.render('home/home.html', {
        title: 'Hey',
        siteLanguage: siteLanguage,
        message: 'Hello there!'
    });
});


http.createServer(app).listen(2701, '127.0.0.1');
console.log('Server running at 127.0.0.1:2701');