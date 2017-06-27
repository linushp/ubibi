var express = require('express');
var router = express.Router();

var photos_data = require('./photos_data');


router.get("/", function(req, res){

    res.render("photos", {
        title: "hello",
        photos_data:photos_data
    });
});



module.exports = router;