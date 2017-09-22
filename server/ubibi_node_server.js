var http = require('http');
var path = require('path');
var ejs = require('ejs');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var languageParser = require('./utils/languageParser');
var LogUtils = require('./utils/LogUtils');
var sendAssetHtml = require('./utils/sendAssetHtml');
var config = require('./config/config');



config.doConfig();
var app = express();
app.engine('html', ejs.renderFile);
app.set('x-powered-by', false);
app.set('views', path.join(__dirname, '../client/src'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(languageParser('siteLanguage', 'en'));

app.use("/api/v1/ubibi", require('./controller/UbibiApiController'));
app.use("/api/v1/oss-token", require('./controller/OSSController'));
app.use("/page/v1/ubibi", require('./controller/UbibiPageController'));

app.use("/static", express.static(path.join(__dirname, '../static'), {
    maxAge: 1000 * 60 * 60 * 24 * 365
}));

//app.use("/.well-known/pki-validation", express.static(path.join(__dirname, '../pki-validation'), {
//    maxAge: 1000 * 60 * 60 * 24 * 365
//}));

app.get('/favicon.ico', function (req, res) {
    res.sendFile(path.join(__dirname, '../static/favicon.ico'));
});

app.get("/kaihe",function(req,res){ sendAssetHtml(res, 'kaihe');});

app.get("/*", function (req, res) {
    var hostname = req.hostname;
    LogUtils.info("hostname:" + hostname);
    sendAssetHtml(res, 'ubibi');
});

http.createServer(app).listen(2701, '127.0.0.1');
LogUtils.info('Server running at 127.0.0.1:2701');