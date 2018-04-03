var SqlQueryUtils = require('../utils/SqlQueryUtils');




var FitnessSignLogModel = {
    tableName: 'f_sign_log',
    tableFields: [
        'id',
        "uid",
        'uname',
        'uweight',
        'format_date',
        'format_time',
        'create_time',
        'update_time'
    ]
};





var FitnessSignUserModel = {
    tableName: 'f_sign_user',
    tableFields: [
        'id',
        'uname',
        'create_time',
        'update_time'
    ]
};



function formatDateTime(date, formatString) {
    /*
     * eg:formatString="YYYY-MM-DD hh:mm:ss";
     */
    var o = {
        "M+": date.getMonth() + 1,    //month
        "D+": date.getDate(),    //day
        "h+": date.getHours(),    //hour
        "m+": date.getMinutes(),    //minute
        "s+": date.getSeconds(),    //second
        "q+": Math.floor((date.getMonth() + 3) / 3),    //quarter
        "S": date.getMilliseconds()    //millisecond
    };

    if (/(Y+)/.test(formatString)) {
        formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(formatString)) {
            formatString = formatString.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return formatString;
};



function createSignLog1(uid,uname,uweight,date) {
    var format_time = formatDateTime(date,"YYYY-MM-DD hh:mm:ss");
    var format_date = formatDateTime(date,"YYYY-MM-DD");

    var signLogDAO = SqlQueryUtils.createSimpleDAO(FitnessSignLogModel);

    return signLogDAO.saveOrUpdate({
        format_date:format_date,
        format_time:format_time,
        "uid":uid,
        'uname':uname,
        'uweight':uweight
    },{
        uid:uid,
        format_date:format_date
    });

}



function createSignLog(uid,uname,uweight) {
    var date = new Date();
    return createSignLog1(uid,uname,uweight,date);
}



async function getUserByName(uname) {
    var mm = await SqlQueryUtils.doQueryByConditionAsync(FitnessSignUserModel,{
        uname:uname
    });

    if(mm && mm.result && mm.result.length > 0){
        return mm.result[0];
    }

    return null;
}


async function getUserById(uid) {
    var mm = await SqlQueryUtils.doQueryByConditionAsync(FitnessSignUserModel,{
        id:uid
    });

    if(mm && mm.result && mm.result.length > 0){
        return mm.result[0];
    }

    return null;
}





var userListCache = null;
async function  getUserList() {
    if(userListCache){
        return userListCache;
    }
    var userDAO = SqlQueryUtils.createSimpleDAO(FitnessSignUserModel);
    userListCache = await userDAO.doQueryAll();
    return userListCache;
}

function clearGetUserList() {
    userListCache = null;
}

function getSignLogListByUid(uid) {
    var signLogDAO = SqlQueryUtils.createSimpleDAO(FitnessSignLogModel);
    return signLogDAO.doQueryByWhereSql("uid = ? order by format_date desc", [uid]);
}


function getTodayLogList() {
    var format_date = formatDateTime(new Date(),"YYYY-MM-DD");
    var signLogDAO = SqlQueryUtils.createSimpleDAO(FitnessSignLogModel);
    return signLogDAO.doQueryByWhereSql("format_date = ? order by id desc", [format_date]);
}

module.exports = {
    getSignLogListByUid:getSignLogListByUid,
    getUserList:getUserList,
    clearGetUserList:clearGetUserList,
    getTodayLogList:getTodayLogList,
    createSignLog1:createSignLog1,
    createSignLog:createSignLog,
    getUserByName:getUserByName,
    getUserById:getUserById
};