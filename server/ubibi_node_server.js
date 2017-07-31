var http = require('http');
var path = require('path');
var ejs = require('ejs');
var express = require('express');
var adjustHtmlUrl = require('adjust-html-url');
var cookieParser = require('cookie-parser');
var languageParser = require('./utils/languageParser');
var LogUtils = require('./utils/LogUtils');
var config = require('./config/config');



config.doConfig();
var app = express();
app.engine('html', ejs.renderFile);
app.set('x-powered-by', false);
app.set('views', path.join(__dirname, '../client/src'));
app.set('view engine', 'html');
app.use(cookieParser());
app.use(languageParser('siteLanguage', 'en'));

app.use("/api/v1/ubibi", require('./controller/UbibiApiController'));
app.use("/page/v1/ubibi", require('./controller/UbibiPageController'));

app.use("/static", express.static(path.join(__dirname, '../static'), {
    maxAge: 1000 * 60 * 60 * 24 * 365
}));

app.use("/.well-known/pki-validation", express.static(path.join(__dirname, '../pki-validation'), {
    maxAge: 1000 * 60 * 60 * 24 * 365
}));

app.get('/favicon.ico', function (req, res) {
    res.sendFile(path.join(__dirname, '../static/favicon.ico'));
});


function sendAssetHtml(res, name) {
    var static_host = '';
    if (process.env.NODE_ENV === "production") {
        static_host = '//cdn.ubibi.cn';
    }
    adjustHtmlUrl.doAdjust('/static/assets/' + name + '/index.html', {
        urlPrefix: static_host,
        useCache: false
    }).then(function (d) {
        d = d.replace(/\n/gm,'');
        d = d.replace(/\s+/gm,' ');
        d = d.replace(/<ubibi_server_vars><\/ubibi_server_vars>/,'<script>var server_vars_static_host = "'+static_host+'"</script>');
        res.send(d);
    }).catch(function(d){
        res.send(d);
    });
}




app.get("/*", function (req, res) {
    var hostname = req.hostname;
    LogUtils.info("hostname:" + hostname);
    if (hostname.indexOf('kaihe.') === 0) {
        sendAssetHtml(res, 'kaihe');
        return;
    }
    sendAssetHtml(res, 'ubibi');
});

http.createServer(app).listen(2701, '127.0.0.1');
LogUtils.info('Server running at 127.0.0.1:2701');