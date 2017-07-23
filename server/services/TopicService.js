var _ = require('underscore');
var SqlQueryUtils = require('../utils/SqlQueryUtils');
var models = require('./model/models');


function getTopicById(topic_id) {
    return SqlQueryUtils.doQueryAsync({
        sql: "select * from t_topic where id = ?",
        params: [topic_id]
    });
}


function getTopicListByWhereSql(pageNo, pageSize, whereSql) {

    pageNo = parseInt(pageNo || 1, 10);
    pageSize = parseInt(pageSize || 30, 10);
    whereSql = whereSql || "";

    var limitStart = (pageNo - 1) * pageSize;

    var promise1 = SqlQueryUtils.doQueryAsync({
        sql: "select "
        + SqlQueryUtils.joinTableFields(models.TopicModel, ['content'])
        + " from t_topic " + whereSql + " limit " + limitStart + "," + pageSize
    });

    var promise2 = SqlQueryUtils.doQueryAsync({
        sql: "select count(0) as total_count from t_topic " + whereSql + " "
    });

    return Promise.all([promise1, promise2]).then(function (result) {
        return {
            dataList: result[0],
            totalCount: result[1]
        }
    });

}


/**
 *
 * @param pageNo 不能为空
 * @param pageSize 不能为空
 * @param category_id 可以为空
 * @param is_top 可以为空 0/1
 * @param topic_type 可以为空 或 1 article 2 discuss
 */
function getTopicListByCategory(pageNo, pageSize, category_id, is_top, topic_type, orderBy, order_by_type) {
    if (order_by_type !== 'asc') {
        order_by_type = 'desc';
    }

    orderBy = orderBy || "id";
    var whereCondition = [];
    if (_.isNumber(category_id)) {
        category_id = parseInt(category_id, 10);
        whereCondition.push('category_id=' + category_id);
    }

    if (_.isNumber(is_top)) {
        whereCondition.push('is_top=' + is_top);
    }

    if (_.isNumber(topic_type)) {
        whereCondition.push('topic_type=' + topic_type);
    }

    var whereSql = "";
    if (whereCondition.length > 0) {
        var whereConditionAnd = whereCondition.join(" and ");
        whereSql = " where " + whereConditionAnd + "  order by " + orderBy + " " + order_by_type + " ";
    } else {
        whereSql = " order by " + orderBy + " " + order_by_type + " ";
    }

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


function clearCacheCategoryAndSubject(){
    SqlQueryUtils.doClearCacheByKey("getCategoryList");
    SqlQueryUtils.doClearCacheByKey("getSubjectList");
    return Promise.resolve("ok");
}

function createTopic(topicObject) {
    return SqlQueryUtils.doInsertByModelAsync(models.TopicModel, topicObject);
}


function updateTopic(topic_id, topicObject) {
    return SqlQueryUtils.doUpdateByModelAsync(models.TopicModel, topicObject, topic_id);
}


function deleteTopic(topic_id) {
    return SqlQueryUtils.doQueryAsync({
        sql: "delete from t_topic where id = ?",
        params: [topic_id]
    });
}



module.exports = {
    getCategoryList: getCategoryList,
    getSubjectList: getSubjectList,
    clearCacheCategoryAndSubject:clearCacheCategoryAndSubject,
    getTopicListByCategory: getTopicListByCategory,
    getTopicById: getTopicById,
    createTopic: createTopic,
    updateTopic: updateTopic,
    deleteTopic: deleteTopic
};