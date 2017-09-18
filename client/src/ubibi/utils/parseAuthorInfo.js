function parseAuthorInfo(author_info) {
    if (typeof author_info === 'string') {
        return JSON.parse(author_info);
    }
    return author_info;
}


function setObjAuthorInfo(obj,defaultObj) {
    var author_info = parseAuthorInfo(obj.author_info);
    obj.author_info = author_info || defaultObj;
}


export default function (obj,defaultObj) {
    if (!obj) {
        return null;
    }
    if (Object.prototype.toString.call(obj) === "[object Array]") {
        for (var i = 0; i < obj.length; i++) {
            setObjAuthorInfo(obj[i],defaultObj);
        }
    } else {
        setObjAuthorInfo(obj,defaultObj);
    }
    return obj;
}