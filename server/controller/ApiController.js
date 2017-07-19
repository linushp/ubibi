var express = require('express');
var SqlQueryUtils = require('../utils/SqlQueryUtils');
var router = express.Router();

var TopicService  = require('../services/TopicService');
var UserService  = require('../services/UserService');

router.get("/topics", function (req, res) {
    var t = new Date().getTime();

    var str = "";
    var x = "aaaaaaaaaaaa";
    for (var i = 0; i < 1000; i++) {
        str =  str + x;
    }

    var promise1 = TopicService.createTopic({
        'topic_type':'1',
        'title':"hello"+t,
        'description':"description"+t,
        'cover_img':"http://ssss.dd/"+t,
        'content': str,
        'author_id':"1"
    });

    var promise = promise1.then(function(){
        return TopicService.getTopicListByCategory(1,10,null,null,null,'update_time');
    });

    promise.then(function(aa){
        res.send(aa);
    });

});








module.exports = router;