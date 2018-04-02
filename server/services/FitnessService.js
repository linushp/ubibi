var SqlQueryUtils = require('../utils/SqlQueryUtils');




var FitnessSignLogModel = {
    tableName: 'f_sign_log',
    tableFields: [
        'id',
        'uname',
        'uweight',
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



function createSignLog(uname,uweight) {
    var format_time = formatDateTime(new Date(),"YYYY-MM-DD hh:mm:ss");
    return SqlQueryUtils.doInsertByModelAsync(FitnessSignLogModel, {
        format_time:format_time,
        'uname':uname,
        'uweight':uweight
    });
}



async function checkUserName(uname) {
    var mm = await SqlQueryUtils.doQueryByConditionAsync(FitnessSignUserModel,{
        uname:uname
    });

    if(mm && mm.result && mm.result.length > 0){
        return true;
    }

    return false;
}





module.exports = {
    createSignLog:createSignLog,
    checkUserName:checkUserName
};