var express = require('express');
var router = express.Router();
var ExpressUtils = require('../utils/ExpressUtils');

var handleRequest = function(a,b,c){
    return ExpressUtils.handleRequest(a,b,c);
};

router.all('/upload-token', handleRequest(function (req) {
    return Promise.resolve({

    });
}));



module.exports = router;