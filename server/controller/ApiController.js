var express = require('express');
var router = express.Router();


router.get("/articles", function (req, res) {

    var pageNo = parseInt(req.query.pageNo || 1, 10);
    var pageSize = parseInt(req.query.pageSize || 30, 10);
    var limitStart = (pageNo - 1) * pageSize;

    var promise1 = SqlQueryUtils.doQueryAsync({
        sql: "select * from t_article limit ?,?",
        params: [limitStart, pageSize]
    });

    var promise2 = SqlQueryUtils.doQueryAsync({
        sql: "select count(0) from t_article"
    });


    promise.then(function(result){
        res.json(result);
    });

});







module.exports = router;