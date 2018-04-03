var express = require('express');
var ExpressKit = require('express-kit');
var https = require('https');
var http = require('http');
var path = require('path');

var router = express.Router();
var sendPage = require('../utils/sendPage');
var formatDateTime = require('../utils/formatDateTime');
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
   var nowDate = new Date();

   if(nowDate.getHours() >= 10){
       res.send({
           errorCode:1,
           errorMsg:"请在10点之前签到"
       });
       return;
   }


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

    var user = await FitnessService.getUserByName(uname);

    if(!user){
        res.send({
            errorCode:1,
            errorMsg:"您输入到昵称不在白名单里面"
        });
        return;
    }


    if(!uweight){
        res.send({
            errorCode:1,
            errorMsg:"请输入正确到体重数"
        });
        return;
    }


    var mm = await FitnessService.createSignLog(user.id,uname,uweight);
    res.send({
        uid:user.id,
        errorCode:0,
        errorMsg:null,
        result:mm
    });
});


function getPeriodCellData(uid,ddd,format_date) {
    for (var i = 0; i < ddd.length; i++) {
        var obj = ddd[i];
        if(obj.uid === uid && obj.format_date === format_date){
            return obj.uweight;
        }
    }
    return null;
}



function getPeriodRowData(user, ddd, columns) {
    var rowData = {
        uname:user.uname
    };

    var uweightList = [];
    var uid = user.id;
    for (var i = 0; i < columns.length; i++) {
        var obj = columns[i];
        if(obj.type === 'uweight'){
            var uweight = getPeriodCellData(uid,ddd,obj.key);
            rowData[obj.key] = uweight;
            if(uweight){
                uweightList.push(uweight);
            }
        }
    }


    var loseWeight = 0;
    //计算减轻的体重
    if(uweightList.length >= 2){
        var beginWeight = uweightList[0];
        var endWeight = uweightList[uweightList.length - 1];
        loseWeight = beginWeight-endWeight;
    }


    rowData['loseWeight'] = loseWeight.toFixed(2);

    return rowData;
}

router.get("/period/:pid",async function (req, res) {

    var pid = req.params.pid;

    var periodData = await FitnessService.getPeriodById(pid);

    if(!periodData){
        res.send("period is not exist");
        return;
    }


    var from_date = periodData.from_date;
    var to_date = periodData.to_date;


    var from_date1 = new Date(periodData.from_date);
    var to_date1 = new Date(periodData.to_date);




    var columns = [{text:"昵称(减重)",key:"uname",type:"uname"}];


    var x = from_date1;
    while(x.getTime()<=to_date1.getTime()){
        var date_str = formatDateTime(x,"YYYY-MM-DD");
        var date_str1 = formatDateTime(x,"MM-DD");
        columns.push({
            type:"uweight",
            text:date_str1,
            key:date_str
        });
        x = new Date(x.getTime() + 24 * 3600 * 1000);
    }



    var ddd = await FitnessService.getSignLogListBetweenFromDateAndToDate(from_date,to_date);

    var userList = await FitnessService.getUserList();
    var rows = [];
    for (var i = 0; i < userList.length; i++) {
        var user = userList[i];
        var rowData = getPeriodRowData(user,ddd,columns);
        rows.push(rowData);
    }


    rows = rows.sort(function (a,b) {
        return b.loseWeight - a.loseWeight;
    });

    var p = path.join(__dirname,"../../static/pages/fitness/period.html");
    res.render(p,{
        periodData:periodData,
        columns:columns || [],
        rows:rows ||[]
    });

    //
    //
    //
    // res.send("OK");
});



//
// router.get("/nkjsdafnkjsdnfkjsa",async function (req,res) {
//     var dataList = [
//         ["在云端",	90.5],
//         ["萧雨",	85.3],
//         ["天上竹",	63.8],
//         ["在路上",	87.95],
//         ["知吾朱",	62.35],
//         ["思海",	91.98],
//         ["平凡",	77.85],
//         ["猪油妹妹",63.4],
//         ["沙春燕",58.7]
//     ];
//
//
//     var date = new Date(1522560280173);
//
//     for (var i = 0; i < dataList.length; i++) {
//         var obj = dataList[i];
//         var uname = obj[0].trim();
//         var uweight = obj[1];
//         var user = await FitnessService.getUserByName(uname);
//         var mm = await FitnessService.createSignLog1(user.id,uname,uweight,date);
//     }
//
//     res.send("ok");
// });


router.get('/logs/:uid',async function (req, res) {
    var uid = req.params.uid;

    var user = await FitnessService.getUserById(uid);

    var logs = await FitnessService.getSignLogListByUid(uid);

    var p = path.join(__dirname,"../../static/pages/fitness/logs.html");
    res.render(p,{
        logs:logs || [],
        user:user
    })
});



router.get("/clearGetUserList",function (req, res) {
    FitnessService.clearGetUserList();
    res.send("OK");
});



router.get("/", async function (req, res) {

    var users = await FitnessService.getUserList();
    var logs = await FitnessService.getTodayLogList();
    var periodList = await FitnessService.getPeriodList();

    var logsMap = {};
    for (var i = 0; i < logs.length; i++) {
        var obj1 = logs[i];
        logsMap["user_" + obj1.uid] = obj1.uweight;
    }

    var logs2 = [];
    for (var i = 0; i < users.length; i++) {
        var obj = users[i];
        var uid = obj.id;
        var uweight = logsMap["user_" + uid] || "未签到";
        logs2.push({
            uid:obj.id,
            uname:obj.uname,
            uweight:uweight
        });
    }


    var todayDate = formatDateTime(new Date(),"YYYY-MM-DD");

    var p = path.join(__dirname,"../../static/pages/fitness/fitness.html");
    res.render(p,{
        periods:periodList||[],
        logs:logs2,
        users:users,
        todayDate:todayDate
    });
});



module.exports = router;