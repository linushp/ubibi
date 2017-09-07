function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


export default function () {
    var num = getRandomNumber(1, 404);
    return "https://oss.ubibi.cn/avatars_default/A" + num + ".jpg";
};