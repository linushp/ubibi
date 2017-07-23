var _ = require('underscore');
var SqlQueryUtils = require('../utils/SqlQueryUtils');
var models = require('./model/models');
var reply_table_name = models.ReplyModel.tableName;


function createReply(insertObject) {
    return SqlQueryUtils.doInsertByModelAsync(models.ReplyModel, insertObject);
}


function deleteReply(reply_id) {
    return SqlQueryUtils.doQueryAsync({
        sql: "delete from " + reply_table_name + " where id = ?",
        params: [reply_id]
    });
}

function getReplyList(pageNo, pageSize, topic_id) {
    pageNo = parseInt(pageNo || 1, 10);
    pageSize = parseInt(pageSize || 30, 10);
    var whereSql = " topic_id=? ";

    var limitStart = (pageNo - 1) * pageSize;
    var promise1 = SqlQueryUtils.doQueryAsync({
        sql: "select * from  " + reply_table_name + " " + whereSql + " limit " + limitStart + "," + pageSize,
        params: [topic_id]
    });

    var promise2 = SqlQueryUtils.doQueryAsync({
        sql: "select count(0) as total_count from " + reply_table_name + " " + whereSql + " ",
        params: [topic_id]
    });

    return Promise.all([promise1, promise2]).then(function (result) {
        return {
            dataList: result[0],
            totalCount: result[1]
        }
    });
    
}

module.exports = {
    createReply: createReply,
    deleteReply: deleteReply,
    getReplyList: getReplyList
};