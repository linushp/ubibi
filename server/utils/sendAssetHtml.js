var adjustHtmlUrl = require('adjust-html-url');


module.exports = function(res, name) {
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
};