var _ = require('underscore');
var SqlQueryUtils = require('../utils/SqlQueryUtils');

function getTopicListByWhereSql(pageNo, pageSize, whereSql) {

    var pageNo = parseInt(pageNo || 1, 10);
    var pageSize = parseInt(pageSize || 30, 10);
    whereSql = whereSql || "";

    var limitStart = (pageNo - 1) * pageSize;

    var promise1 = SqlQueryUtils.doQueryAsync({
        sql: "select * from t_topic " + whereSql + " limit " + limitStart + "," + pageSize
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


/**
 *
 * @param pageNo 不能为空
 * @param pageSize 不能为空
 * @param category_id 可以为空
 * @param is_top 可以为空
 * @param topic_type 可以为空 或 1 article 2 discuss
 */
function getTopicListByCategory(pageNo, pageSize, category_id, is_top, topic_type) {
    category_id = parseInt(category_id, 10);

    var whereCondition = [];
    if (_.isNumber(category_id)) {
        whereCondition.push('category_id=' + category_id);
    }

    if (_.isNumber(is_top)) {
        whereCondition.push('is_top=' + is_top);
    }

    if (_.isNumber(topic_type)) {
        whereCondition.push('topic_type=' + topic_type);
    }

    var whereConditionAnd = whereCondition.join(" and ");
    var whereSql = " where " + whereConditionAnd + "  order by update_time desc ";
    return getTopicListByWhereSql(pageNo, pageSize, whereSql);
}

function getCategoryList() {
    return SqlQueryUtils.doQueryCacheAsync({
        sql: "select * from t_category "
    }, "getCategoryList", 3600);
}


function getSubjectList() {
    return SqlQueryUtils.doQueryCacheAsync({
        sql: "select * from t_subject "
    }, "getSubjectList", 3600);
}


function getReplyList(topic_id) {

}


module.exports = {
    getCategoryList: getCategoryList,
    getTopicListByCategory: getTopicListByCategory,
    getSubjectList: getSubjectList
};