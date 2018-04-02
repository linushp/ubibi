var express = require('express');
var ExpressKit = require('express-kit');
var https = require('https');
var http = require('http');
var path = require('path');

var router = express.Router();
var sendPage = require('../utils/sendPage');
var FileCacheReader = ExpressKit.FileCacheReader;
var FitnessService = require('../services/FitnessService');

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



router.get("/new_data",async function (req, res) {
    var req_query = req.query;
    var uname = req_query.uname;
    var uweight = parseFloat(req_query.uweight);


    if(!uname){
        res.send({
            errorCode:1,
            errorMsg:"请输入昵称"
        });
        return;
    }

    var isCheckUserOk = await FitnessService.checkUserName(uname);

    if(!isCheckUserOk){
        res.send({
            errorCode:1,
            errorMsg:"您输入到昵称不在白名单里面"
        });
        return;
    }



    var mm = await FitnessService.createSignLog(uname,uweight);
    res.send(mm);
});


router.get("/", function (req, res) {
    var p = path.join(__dirname,"../../static/pages/fitness/fitness.html");
    res.sendFile(p);
});



module.exports = router;