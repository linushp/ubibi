var path = require('path');
var fs = require('fs');

var _rootPath = path.join(__dirname, '../../');

/**
 *
 * @param p1
 * @param p2
 * @param str
 * @param replaceOptions {urlPrefix,urlSuffix}
 * @returns {void|string|XML}
 */
var replaceStaticPath = function (p1, p2, str, replaceOptions) {

    var replaceOptions_urlPrefix = replaceOptions['urlPrefix'];

    var replaceOptions_urlSuffix = replaceOptions['urlSuffix'];

    var wrapperPath = function (rootPath) {
        var result = rootPath;
        if (replaceOptions_urlPrefix) {
            result = replaceOptions_urlPrefix + rootPath;
        }
        if (replaceOptions_urlSuffix) {
            if (result.indexOf('?') >= 0) {
                result = result + "&" + replaceOptions_urlSuffix;
            } else {
                result = result + "?" + replaceOptions_urlSuffix;
            }
        }
        return result;
    };

    function adjustUrlToBasedRoot(m) {
        if (/^\//.test(m)) {
            return m;
        }

        m = (m || '').trim();
        if (!m) {
            return '';
        }

        var m1 = p1;
        var m2 = p2;
        var dirname0 = path.dirname(m2);
        var f1 = path.resolve(dirname0, m);
        var f11 = f1.replace(m1, '/');
        return f11;
    }

    return str.replace(/<(script|link|a|img)(.*)(src|href)=('|")([^'"]+)('|")([^>]*)>/img, function (a, $1, $2, $3, $4, $5, $6, $7) {

        var url = $5;
        if(/^http:\/\//.test(url) || /^https:\/\//.test(url) || /\/\//.test(url)){
            return a;
        }else {
            url = adjustUrlToBasedRoot(url);
            url = wrapperPath(url);
            return "<" + $1 + $2 + $3 + "=" + $4 + url + $6 + $7 + ">";
        }
    });

};




var getFileContentAsync = function (filePath, replaceOptions) {
    var p1 = _rootPath;
    var p2 = path.join(p1, filePath);
    return new Promise(function (resolve, reject) {
        fs.readFile(p2, 'utf-8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                if (replaceOptions) {
                    data = replaceStaticPath(p1, p2, data, replaceOptions);
                }
                resolve(data);
            }
        });
    });
};


exports.configRootPath = function (rootPath) {
    _rootPath = rootPath;
};




/**
 *
 var promise = staticHtmlUtils.getFileContentAsync("/static/photos.html",{
        urlPrefix:'http://cdn.ubibi.cn',
        useCache:false
    });

 promise.then(function(data){
        res.send(data);
    });
 */
var getFileContentAsync_cache={};
exports.getFileContentAsync = function (filePath, replaceOptions) {
    var useCache = replaceOptions && replaceOptions.useCache;
    if(useCache){
        var cacheObject  = getFileContentAsync_cache[filePath];
        if(cacheObject){
            return Promise.resolve(cacheObject);
        }
    }

    return getFileContentAsync(filePath,replaceOptions).then(function (result) {
        if(useCache){
            getFileContentAsync_cache[filePath] = result;
        }
        return result;
    });
};