var express = require('express');
var md5 = require('rebix-utils/addon_nopack/md5');
var SqlQueryUtils = require('../utils/SqlQueryUtils');
var ExpressUtils = require('../utils/ExpressUtils');
var router = express.Router();
var TopicService = require('../services/TopicService');
var UserService = require('../services/UserService');
var ReplyService = require('../services/ReplyService');


function handleRequest(handler){
    return function (req, res){
        var sendResult =  ExpressUtils.sendPromise(handler);
        sendResult(req,res);
    };
}



router.get("/topics", handleRequest(function (req, res) {
    var req_query = req.query;
    var page_size = req_query.page_size || 20;
    var page_no = req_query.page_no || 1;
    var category_id = req_query.category_id || null;
    var is_top = req_query.is_top || null;
    var topic_type = req_query.topic_type || null;
    var order_by = req_query.order_by || 'update_time';
    var order_by_type = req_query.order_by_type || 'desc';
    return TopicService.getTopicListByCategory(page_no, page_size, category_id, is_top, topic_type, order_by ,order_by_type);
}));


router.get('/topic/:topic_id', handleRequest(function (req, res) {
    var topic_id = req.params['topic_id'];
    return TopicService.getTopicById(topic_id);
}));


router.post('/topic', handleRequest(function (req, res) {
    var topicObject = req.body;
    return TopicService.createTopic(topicObject);
}));


router.put('/topic/:topic_id', handleRequest(function (req, res) {
    var topicObject = req.body;
    var topic_id = req.params['topic_id'];
    return TopicService.updateTopic(topic_id, topicObject);
}));

router.delete('/topic/:topic_id', handleRequest(function (req, res) {
    var topic_id = req.params['topic_id'];
    return TopicService.deleteTopic(topic_id);
}));


router.get('/topic_category_subject', handleRequest(function (req, res) {
    var clear_cache = req.params['clear_cache'];
    if (clear_cache === 'true') {
        TopicService.clearCacheCategoryAndSubject();
    }

    return Promise.all([
        TopicService.getCategoryList(),
        TopicService.getSubjectList()
    ]);
}));


router.get('/reply/:topic_id', handleRequest(function (req) {
    var req_query = req.query;
    var page_size = req_query.page_size || 20;
    var page_no = req_query.page_no || 1;
    var topic_id = req.params['topic_id'];
    return ReplyService.getReplyList(page_no, page_size, topic_id);
}));


router.post('/reply', handleRequest(function (req, res) {
    var replyObject = req.body;
    return ReplyService.createReply(replyObject);
}));



router.delete('/reply/:reply_id', handleRequest(function (req, res) {
    var reply_id = req.params['reply_id'];
    return ReplyService.deleteReply(reply_id);
}));



router.post('/user/login',handleRequest(function(req){
    var req_body =  req.body;
    var username = req_body.username;
    var passwd =  md5.hex_md5('ubibi_' + req_body['passwd']);
    return UserService.getUserInfoByPassword(username,passwd);
}));


router.post('/user/reg', handleRequest(function (req) {
    //不用检查用户有没有被注册,因为会有数据库unique约束
    var userObject = req.body;
    userObject['passwd'] = md5.hex_md5('ubibi_' + userObject['passwd']);
    return UserService.createUser(userObject);
}));


router.post('/user/info/:uid', handleRequest(function (req) {
    var uid = req.params.uid;
    return UserService.getUserInfoByUid(uid);
}));


module.exports = router;