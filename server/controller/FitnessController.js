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


router.get("/new_data_running", async function (req, res) {
    var nowDate = new Date();

    // if(nowDate.getHours() >= 10){
    //     res.send({
    //         errorCode:1,
    //         errorMsg:"请在10点之前签到"
    //     });
    //     return;
    // }


    var req_query = req.query;
    var uname = req_query.uname;
    var urunning = parseFloat(req_query.urunning);


    if (!uname) {
        res.send({
            errorCode: 1,
            errorMsg: "请输入昵称"
        });
        return;
    }

    var user = await FitnessService.getUserByName(uname);

    if (!user) {
        res.send({
            errorCode: 1,
            errorMsg: "您输入到昵称不在白名单里面"
        });
        return;
    }


    if (!urunning) {
        res.send({
            errorCode: 1,
            errorMsg: "请输入正确的公里数"
        });
        return;
    }


    var mm = await FitnessService.createRunningSignLog(user.id, uname, urunning);
    res.send({
        uid: user.id,
        errorCode: 0,
        errorMsg: null,
        result: mm
    });

});


router.get("/new_data", async function (req, res) {
    var nowDate = new Date();

    if (nowDate.getHours() >= 10) {
        res.send({
            errorCode: 1,
            errorMsg: "请在10点之前签到"
        });
        return;
    }


    var req_query = req.query;
    var uname = req_query.uname;
    var uweight = parseFloat(req_query.uweight);


    if (!uname) {
        res.send({
            errorCode: 1,
            errorMsg: "请输入昵称"
        });
        return;
    }

    var user = await FitnessService.getUserByName(uname);

    if (!user) {
        res.send({
            errorCode: 1,
            errorMsg: "您输入到昵称不在白名单里面"
        });
        return;
    }


    if (!uweight) {
        res.send({
            errorCode: 1,
            errorMsg: "请输入正确的体重数"
        });
        return;
    }


    var mm = await FitnessService.createSignLog(user.id, uname, uweight);
    res.send({
        uid: user.id,
        errorCode: 0,
        errorMsg: null,
        result: mm
    });
});


function getPeriodCellData(uid, data_list, format_date) {
    for (var i = 0; i < data_list.length; i++) {
        var obj = data_list[i];
        if (obj.uid === uid && obj.format_date === format_date) {
            return obj;
        }
    }
    return null;
}


function getPeriodRowData(user, data_list, columns) {
    var rowData = {
        uid: user.id,
        uname: user.uname
    };

    var signDays = 0;

    var uweightList = [];
    var uid = user.id;
    for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        if (column.type === 'uweight') {
            var logObj  = getPeriodCellData(uid, data_list, column.key);

            rowData[column.key] = {};

            if (logObj) {

                var uweight = logObj.uweight;
                var urunning = logObj.urunning;

                rowData[column.key] = {uweight:uweight,urunning:urunning};


                uweightList.push(uweight);
                if (column['is_include']) {
                    signDays++;
                }
            }
        }
    }


    var loseWeight = 0;
    var loseWeight_percent = 0;
    //计算减轻的体重
    if (uweightList.length >= 2) {
        var beginWeight = uweightList[0];
        var endWeight = uweightList[uweightList.length - 1];
        loseWeight = beginWeight - endWeight;
        loseWeight_percent = (loseWeight / beginWeight) * 100;
        if(loseWeight_percent<0){
            loseWeight_percent = 0;
        }
    }

    rowData['loseWeight_percent'] = loseWeight_percent.toFixed(2) + "%";
    rowData['loseWeight_percent_float'] = loseWeight_percent;

    rowData['loseWeight'] = loseWeight.toFixed(2);

    rowData['signDays'] = signDays;

    return rowData;
}

router.get("/period/:pid", async function (req, res) {

    var pid = req.params.pid;

    var periodData = await FitnessService.getPeriodById(pid);

    if (!periodData) {
        res.send("period is not exist");
        return;
    }


    var from_date = periodData.from_date;
    var to_date = periodData.to_date;


    var from_date1 = new Date(periodData.from_date);
    var to_date1 = new Date(periodData.to_date);


    var columns = [{text: "昵称(减重)", key: "uname", type: "uname"}];


    var x = from_date1;
    while (x.getTime() <= to_date1.getTime()) {
        var date_str = formatDateTime(x, "YYYY-MM-DD");
        var date_str1 = formatDateTime(x, "MM-DD");
        var is_include = false;
        if (date_str > from_date) {
            is_include = true;
        }
        columns.push({
            type: "uweight",
            text: date_str1,
            key: date_str,
            is_include: is_include
        });
        x = new Date(x.getTime() + 24 * 3600 * 1000);
    }


    var data_list = await FitnessService.getSignLogListBetweenFromDateAndToDate(from_date, to_date);

    var userList = await FitnessService.getUserList();
    var rows = [];
    for (var i = 0; i < userList.length; i++) {
        var user = userList[i];
        var rowData = getPeriodRowData(user, data_list, columns);
        rows.push(rowData);
    }


    rows = rows.sort(function (a, b) {
        return b.loseWeight - a.loseWeight;
    });

    var p = path.join(__dirname, "../../static/pages/fitness/period.html");
    res.render(p, wrapperWithMoney({
        periodData: periodData,
        columns: columns || [],
        rows: rows || []
    }));

    //
    //
    //
    // res.send("OK");
});

function wrapperWithMoney(obj) {

    var periodData = obj.periodData;
    var total_money = parseFloat(periodData.total_money || 0);

    if (!total_money) {
        return obj;
    }


    var periodData = obj.periodData;
    var members = periodData.members || "";
    var membersList = members.split(",");

    var columns = obj.columns;
    var rows = obj.rows;


    columns.push({
        type: "loseWeight_percent",
        text: "减重比例",
        key: "loseWeight_percent"
    });

    columns.push({
        type: "signDays",
        text: "签到",
        key: "signDays"
    });

    columns.push({
        type: "total_income",
        text: "总收入",
        key: "total_income"
    });


    var total_loseWeight_percent_float = 0;
    var total_signDays = 0;

    for (var i = 0; i < rows.length; i++) {
        var obj1 = rows[i];
        if (isMember(membersList, obj1)) {
            total_signDays += obj1['signDays'];
            total_loseWeight_percent_float += obj1['loseWeight_percent_float'] || 0;
        }
    }

    //总签到收入
    var total_signDays_income = total_signDays * 2;

    //总减重收入
    var total_weight_income = total_money - total_signDays_income;

    //每百分比减重收入
    var total_loseWeight_percent_float_per_income = 0;
    if (total_loseWeight_percent_float) {
        total_loseWeight_percent_float_per_income = total_weight_income / total_loseWeight_percent_float;
    }


    for (var i = 0; i < rows.length; i++) {
        var obj2 = rows[i];
        if (isMember(membersList, obj2)) {
            var obj2_total_income = (obj2['signDays'] * 2) + total_loseWeight_percent_float_per_income * obj2['loseWeight_percent_float']
            obj2['total_income'] = obj2_total_income.toFixed(2);
        } else {
            obj2['total_income'] = "未参与"
        }
    }


    return {
        periodData: periodData,
        columns: columns,
        rows: rows
    };
}


function isMember(membersList, obj1) {
    var uid = "" + obj1.uid;
    return membersList.indexOf(uid) >= 0;
}

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


router.get('/logs/:uid', async function (req, res) {
    var uid = req.params.uid;

    var user = await FitnessService.getUserById(uid);

    var logs = await FitnessService.getSignLogListByUid(uid);

    var p = path.join(__dirname, "../../static/pages/fitness/logs.html");
    res.render(p, {
        logs: logs || [],
        user: user
    })
});


router.get("/clearGetUserList", function (req, res) {
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
        logsMap["user_" + obj1.uid] = obj1;
    }

    var logs2 = [];
    for (var i = 0; i < users.length; i++) {
        var obj = users[i];
        var uid = obj.id;
        var logObj = logsMap["user_" + uid] || {};
        var uweight = logObj.uweight || null;
        var urunning = logObj.urunning || 0;
        logs2.push({
            uid: obj.id,
            uname: obj.uname,
            uweight: uweight,
            urunning:urunning
        });
    }


    var todayDate = formatDateTime(new Date(), "YYYY-MM-DD");

    var p = path.join(__dirname, "../../static/pages/fitness/fitness.html");
    res.render(p, {
        periods: periodList || [],
        logs: logs2,
        users: users,
        todayDate: todayDate
    });
});


module.exports = router;