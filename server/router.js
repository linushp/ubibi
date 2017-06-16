var express = require('express')
var router = express.Router();
var path = require('path');


router.use("/static", express.static(path.join(__dirname, '../static')));


module.exports = router;