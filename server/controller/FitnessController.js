var express = require('express');
var ExpressKit = require('express-kit');
var https = require('https');
var http = require('http');

var router = express.Router();
var sendPage = require('../utils/sendPage');
var FileCacheReader = ExpressKit.FileCacheReader;

//
// async function getWxAccessToken() {
//     var AppID = "wx493b05e82a79e90f";
//     var AppSecret = "08e1dfd281f645baec22f9ad55391cb0";
//     var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+AppID+"&secret="+AppSecret;
//     var x = await FileCacheReader.sendGetRequestCache(url,3600);
//     return x;
// }
//
// async function getWxUserInfoByOPenId(openid) {
//     var ACCESS_TOKEN = getWxAccessToken();
//     var url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token="+ACCESS_TOKEN+"&openid="+openid+"&lang=zh_CN";
//     var x = await FileCacheReader.sendGetRequest(url);
//     return x;
// }



router.get("/", function (req, res) {
    res.send("OK")
});



module.exports = router;