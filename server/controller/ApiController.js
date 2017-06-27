var express = require('express');
var SqlQueryUtils = require('../utils/SqlQueryUtils');
var router = express.Router();


router.get("/articles", function (req, res) {

    var pageNo = parseInt(req.query.pageNo || 1, 10);
    var pageSize = parseInt(req.query.pageSize || 30, 10);

    var limitStart = (pageNo - 1) * pageSize;
    var promise = SqlQueryUtils.doQueryAsync({
        sql: "select * from t_article limit ?,?",
        params: [limitStart, pageSize]
    });

    promise.then(function(result){res.json(result);});

});







module.exports = router;