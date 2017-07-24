function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


module.exports = function () {
    var num = getRandomNumber(1, 404);
    return "http://fs.ubibi.cn/avatars_default/A" + num + ".jpg";
};