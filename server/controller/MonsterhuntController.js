var express = require('express');
var ExpressKit = require('express-kit');
var https = require('https');
var http = require('http');

var router = express.Router();
var sendPageIndex = require('../utils/sendPageIndex');
var FileCacheReader = ExpressKit.FileCacheReader;

router.get("/", function (req, res) {
    sendPageIndex(res,"monsterhunt");
});



function toQueryString(params){
    var params_list = [];
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var mm = params[key];
            params_list.push(key + "=" + mm);
        }
    }
    params_list = params_list.sort(function (a, b) {
        return a.localeCompare(b);
    });
    return params_list.join("&")
}


function sendHttpRequest(options,data){

    return new Promise(function (resolve, reject) {
        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            var rawData = '';
            res.on('data', function (chunk) {
                rawData += chunk;
            });
            res.on('end', function () {
                try {

                    var obj = null;

                    try {
                        // obj = JSON.parse(rawData);
                        obj = rawData;
                    }catch (e){
                        console.log("[ERROR] sendHttpRequest " +  options.path);
                    }

                    resolve({
                        data: obj,
                        headers: res.headers
                    });
                } catch (e) {
                    reject(e);
                }
            });
        });
        req.on('error', function (e) {
            console.error(`problem with request: ${e.message}`);
        });
        if(data){
            req.write(data);
        }
        req.end();
    });
}

var login_token = "2f78e98cb8a86d0c292cb5111f112519";

router.get("/getmonster",async function (req, res) {

    var req_query = req.query;
    var id = req_query.id ;
    if(!id){
        res.send("id is null");
        return;
    }

    var url = "http://47.75.37.131:8396/monster-hunt/monster/getmonster?token="+login_token+"&needtoken=true&commandid=2&monsterid=" + id;
    var x = await FileCacheReader.sendGetJsonRequest(url);
    res.send(x);
});


router.get("/update_login_token",function (req, res) {
    var req_query = req.query;
    login_token = req_query.token || "";
    res.send("ok")
});


module.exports = router;