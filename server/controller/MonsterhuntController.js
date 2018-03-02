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

var login_code = "5BnZVh5xmhpJHthdXeyDMomTpPB17hgoEaT2ykYPoapksEeej9JuD5uKxWcxVFcc8g2A3oV44ZHdmYbmKvZkd1Pf";

function get_getmonster_url(id) {
    // return "http://47.75.37.131:8396/monster-hunt/monster/getmonster?token="+login_token+"&needtoken=true&commandid=2&monsterid=" + id;
    return "/monster-hunt/monster/getmonster?token="+login_token+"&needtoken=true&commandid=2&monsterid=" + id;

}


function doLogin() {
    var LOGIN_URL = "http://47.75.37.131:8396/monster-hunt/user/login?token=default%20TOKEN&needtoken=true&commandid=11&code=" + login_code;
    return  FileCacheReader.sendGetJsonRequest(LOGIN_URL).then(function (d) {
        if(d && d.obj){
            var token = d.obj.token;
            login_token = token;

        }
        return d;
    });
}


router.get("/getmonster",async function (req, res) {

    var req_query = req.query;
    var id = req_query.id ;
    if(!id){
        res.send("id is null");
        return;
    }

    try {
        //http://47.75.37.131:8396
        var url = {
            hostname: '47.75.37.131',
            port: 8396,
            path:get_getmonster_url(id),
            headers:{
                'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.1; MI 6 Build/NMF26X; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.98 Mobile Safari/537.36 BeeChat',
                'X-Requested-With': 'com.beeplabs.beechat'
            }
        };
        var x = await FileCacheReader.sendGetJsonRequest(url);
        if(!x || x.code === -2){
            await doLogin();
            // var url = get_getmonster_url(id);
            var url = {
                hostname: '47.75.37.131',
                port: 8396,
                path:get_getmonster_url(id),
                headers:{
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.1; MI 6 Build/NMF26X; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.98 Mobile Safari/537.36 BeeChat',
                    'X-Requested-With': 'com.beeplabs.beechat'
                }
            };
            x = await FileCacheReader.sendGetJsonRequest(url);
        }
        res.send(x);
    }catch (e){
        res.send(e);
    }

});


router.get("/update_login_token",function (req, res) {
    var req_query = req.query;
    login_token = req_query.token || "";
    res.send("ok")
});


router.get("/update_login_code",function (req, res) {
    var req_query = req.query;
    login_code = req_query.code || "";
    res.send("ok")
});


module.exports = router;