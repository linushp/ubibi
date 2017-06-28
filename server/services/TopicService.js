var SqlQueryUtils = require('../utils/SqlQueryUtils');


function getTopicList(pageNo, pageSize, whereSql) {

    var pageNo = parseInt(pageNo || 1, 10);
    var pageSize = parseInt(pageSize || 30, 10);
    whereSql = whereSql || "";

    var limitStart = (pageNo - 1) * pageSize;

    var promise1 = SqlQueryUtils.doQueryAsync({
        sql: "select * from t_topic " + whereSql + " limit ?,?",
        params: [limitStart, pageSize]
    });

    var promise2 = SqlQueryUtils.doQueryAsync({
        sql: "select count(0) from t_topic " + whereSql + " "
    });

    return Promise.all([promise1, promise2]).then(function (result1, result2) {
        return {
            dataList: result1,
            totalCount: result2
        }
    });

}




function getCategoryList(){
    return SqlQueryUtils.doQueryCacheAsync({
        sql: "select * from t_category "
    });
}



function getSubjectList(){
    return SqlQueryUtils.doQueryCacheAsync({
        sql: "select * from t_subject "
    });
}




module.exports = {
    getCategoryList:getCategoryList,
    getTopicList: getTopicList,
    getSubjectList:getSubjectList
};