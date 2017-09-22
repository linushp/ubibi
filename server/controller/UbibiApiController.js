var express = require('express');
var md5 = require('rebix-utils/addon_nopack/md5');
var SqlQueryUtils = require('../utils/SqlQueryUtils');
var ExpressUtils = require('../utils/ExpressUtils');
var UserUtils = require('../utils/UserUtils');
var router = express.Router();
var TopicService = require('../services/TopicService');
var UserService = require('../services/UserService');
var ReplyService = require('../services/ReplyService');
var NavService = require('../services/NavService');
var ErrorCode = require('../constants/ErrorCode');


function handleRequest(handler){
    return function (req, res){
        var sendResult =  ExpressUtils.sendPromise(handler);
        sendResult(req,res);
    };
}


async function checkUserLogin(req){
    var cookies = req.cookies || {};
    var uid = cookies['ubibi_uid'];
    var token = cookies['ubibi_token'];

    //1.校验用户登录
    var userTokenResult = await UserService.getUserToken(uid, token);
    if (!userTokenResult || !userTokenResult.result || !userTokenResult.result[0]) {
        return ErrorCode.NOT_LOGIN;
    }
    return ErrorCode.SUCCESS;
}




async function wrapperAuthorInfo(replyObject,req){

    var cookies = req.cookies || {};
    var uid = cookies['ubibi_uid'];

    var userInfoAwait = await UserService.getUserInfoByUid(uid);
    var userInfo = SqlQueryUtils.getSqlResultObject(userInfoAwait);

    replyObject.author_id = uid;
    replyObject.author_info = JSON.stringify(UserUtils.toAuthorInfo(userInfo));
    return replyObject;
}



router.get("/topics", handleRequest(function (req, res) {
    var req_query = req.query;
    var page_size = req_query.page_size || 20;
    var page_no = req_query.page_no || 1;
    var category_id = req_query.category_id || null;
    console.log("category_id:",category_id);
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


router.post('/topic', handleRequest(async function (req, res) {
    var topicObject = req.body;
    console.log(topicObject);

    var isLogin = await checkUserLogin(req);
    if (isLogin === ErrorCode.NOT_LOGIN) {
        return Promise.reject(ErrorCode.NOT_LOGIN);
    }

    topicObject = await wrapperAuthorInfo(topicObject,req);

    return TopicService.createTopic(topicObject);
}));


router.put('/topic/:topic_id', handleRequest(async function (req, res) {

    var isLogin = await checkUserLogin(req);
    if (isLogin === ErrorCode.NOT_LOGIN) {
        return Promise.reject(ErrorCode.NOT_LOGIN);
    }

    var topicObject = req.body;
    var topic_id = req.params['topic_id'];
    return TopicService.updateTopic(topic_id, topicObject);

}));

router.delete('/topic/:topic_id', handleRequest(async function (req, res) {

    var isLogin = await checkUserLogin(req);
    if (isLogin === ErrorCode.NOT_LOGIN) {
        return Promise.reject(ErrorCode.NOT_LOGIN);
    }


    var topic_id = req.params['topic_id'];
    return TopicService.deleteTopic(topic_id);
}));


router.get('/topic_category_subject', handleRequest(function (req, res) {
    var clear_cache = req.query['clear_cache'];
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


router.post('/reply', handleRequest(async function (req, res) {

    var replyObject = req.body;
    var topic_id = replyObject['topic_id'];
    var cookies = req.cookies || {};
    var uid = cookies['ubibi_uid'];

    //1.校验用户登录
    var isLogin = await checkUserLogin(req);
    if (isLogin === ErrorCode.NOT_LOGIN) {
        return Promise.reject(ErrorCode.NOT_LOGIN);
    }

    //3. 检验文章
    var topicObjectAwait = await TopicService.getTopicById(topic_id);
    var topicObject = SqlQueryUtils.getSqlResultObject(topicObjectAwait);

    if (!topicObject) {
        return Promise.reject("文章不存在");
    }

    var reply_count = topicObject.reply_count;
    if (reply_count >= 20) {
        return Promise.reject("回复已满");
    }

    //4.更新文章回复数量
    await TopicService.updateTopic(topic_id, {
        reply_count: reply_count + 1
    });


    replyObject.floor_num = reply_count + 1;

    replyObject = await wrapperAuthorInfo(replyObject,req);

    return ReplyService.createReply(replyObject);

}));



router.delete('/reply/:reply_id', handleRequest(function (req, res) {
    var reply_id = req.params['reply_id'];
    return ReplyService.deleteReply(reply_id);
}));



router.post('/user/login',handleRequest(function(req,res){
    var req_body =  req.body;
    var username = req_body.username;
    var passwd = req_body.passwd;
    //var passwd =  md5.hex_md5('ubibi_' + req_body['passwd']);
    return UserService.getUserInfoByPassword(username,passwd).then(function(d){
        if(d.result && d.result[0]){
            var userInfo = d.result[0];
            var uid = userInfo.id;
            return UserService.createUserToken(uid,userInfo).then(function(d2){
                d.token = d2.token;
                res.cookie("ubibi_token", d.token, {expires: new Date(Date.now() + 1000 * 3600 * 24 * 366)});
                res.cookie("ubibi_uid", uid, {expires: new Date(Date.now() + 1000 * 3600 * 24 * 366)});
                return d;
            });
        }
        return d;
    });
}));

router.get('/user/logout', handleRequest(function (req,res) {
    var cookies = req.cookies || {};
    var uid = cookies['ubibi_uid'];
    var token = cookies['ubibi_token'];
    return UserService.deleteUserToken(uid,token).then(function(d){
        res.cookie("ubibi_token", '');
        res.cookie("ubibi_uid", '');
        return d;
    });
}));



router.post('/user/reg', handleRequest(function (req) {
    //不用检查用户有没有被注册,因为会有数据库unique约束
    var userObject = req.body;
    //userObject['passwd'] = md5.hex_md5('ubibi_' + userObject['passwd']);
    return UserService.createUser(userObject);
}));


router.post('/user/info/:uid', handleRequest(function (req) {
    var uid = req.params.uid;
    return UserService.getUserInfoByUid(uid);
}));


//导航页面
router.get('/nav/getNavList', handleRequest(function (req,res) {
    return NavService.getNavList();
}));

router.post('/nav/createNavItem', handleRequest(function (req,res) {
    var navItemObject = req.body;
    return NavService.createNavItem(navItemObject);
}));


module.exports = router;