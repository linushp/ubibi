var express = require('express');
var router = express.Router();
var ExpressUtils = require('../utils/ExpressUtils');

var handleRequest = function(a,b,c){
    return ExpressUtils.handleRequest(a,b,c);
};

router.all('/upload-token', handleRequest(function (req) {
    return Promise.resolve({
        //AccessKeyId:"LTAIpp9Ypc2y0OLy",
        //AccessKeySecret:"4c3n6ykplpA8irHN6pCym7Sp01YQLl",
        AccessKeyId:"LTAIzNzUYIpkRfeS",
        AccessKeySecret:"H80ul0deGUy1i65rFtDXeStBZlUjh4",
        SecurityToken:"",
        endpoint:"oss-cn-shanghai.aliyuncs.com",
        bucket:"ubibi-oss",
        url_prefix:"https://oss.ubibi.cn/"
    });
}));



module.exports = router;