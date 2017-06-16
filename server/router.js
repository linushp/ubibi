var express = require('express')
var router = express.Router();
var path = require('path');
var staticHtmlUtils = require('./utils/staticHtmlUtils');

router.use("/", function(req, res){
    var promise = staticHtmlUtils.getFileContentAsync("/static/hello.html",true);
    promise.then(function(data){
        res.send(data);
    });
});

router.use("/static", express.static(path.join(__dirname, '../static')));


module.exports = router;