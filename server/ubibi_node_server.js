var http = require('http');
var path = require('path');
var ejs = require('ejs');
var express = require('express');
var adjustHtmlUrl = require('adjust-html-url');
var cookieParser = require('cookie-parser');
var languageParser = require('./utils/languageParser');
var LogUtils  = require('./utils/LogUtils');
var config = require('./config/config');

var ApiController = require('./controller/ApiController');

config.doConfig();
var app = express();
app.engine('html', ejs.renderFile);
app.set('x-powered-by', false);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.use(cookieParser());
app.use(languageParser('siteLanguage', 'en'));

app.use("/api/v1", ApiController);
app.use("/static", express.static(path.join(__dirname, '../static')));
app.get('/favicon.ico',function(req,res){
    var filePath = path.join(__dirname, '../static/favicon.ico');
    res.sendFile(filePath);
});

app.get("/*", function (req, res) {

    var static_host = '';
    var useCache = false;
    if (process.env.NODE_ENV === "production") {
        static_host = 'http://cdn.ubibi.cn';
        //useCache = true;
    }

    var hostname = req.hostname;

    LogUtils.info("hostname:" + hostname);

    adjustHtmlUrl.doAdjust('/static/assets_spa/index.html', {
        urlPrefix: static_host,
        useCache: useCache
    }).then(function (d) {
        res.send(d);
    });

});


http.createServer(app).listen(2701, '127.0.0.1');
LogUtils.info('Server running at 127.0.0.1:2701');