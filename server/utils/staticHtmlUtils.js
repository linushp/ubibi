var path = require('path');
var fs = require('fs');


/**
 *
 * @param p1
 * @param p2
 * @param str
 * @param replaceOptions {urlPrefix,urlSuffix}
 * @returns {void|string|XML}
 */
var replaceStaticPath = function (p1, p2, str,replaceOptions) {

    var replaceOptions_urlPrefix = replaceOptions['urlPrefix'];

    var replaceOptions_urlSuffix = replaceOptions['urlSuffix'];

    var wrapperPath = function(rootPath){
        var result = rootPath;
        if(replaceOptions_urlPrefix){
            result =  replaceOptions_urlPrefix + rootPath;
        }

        if(replaceOptions_urlSuffix){
            if(result.indexOf('?')>=0){
                result = result + "&" + replaceOptions_urlSuffix;
            }else {
                result = result + "?" + replaceOptions_urlSuffix;
            }
        }

        return result;
    };


    return str.replace(/(href|src)=[\\"\\']\.{1,2}\/.*[\\"\\']/gm, function (x) {
        var m1 = p1;
        var m2 = p2;
        var dirname0 = path.dirname(m2);

        var x1 = x.replace(/^(href=|src=)/, '');
        if (x1.indexOf('"') === 0) {
            x1 = x1.replace(/^"/, '').replace(/"$/, '');
            var f1 = path.join(dirname0, x1);

            var f11 = f1.replace(m1, '/');

            if (x.indexOf('href=') === 0) {
                return 'href="' + wrapperPath(f11) + '"';
            } else {
                return 'src="' + wrapperPath(f11) + '"';
            }
        }

        if (x1.indexOf("'") === 0) {
            x1 = x1.replace(/^'/, '').replace(/'$/, '');
            var f1 = path.join(dirname0, x1);

            var f11 = f1.replace(m1, '/');

            if (x.indexOf('href=') === 0) {
                return "href='" + wrapperPath(f11) + "'";
            } else {
                return "src='" + wrapperPath(f11) + "'";
            }
        }
        return x;
    });
};



var getFileContentAsync = function (filePath,replaceOptions) {
    var p1 = path.join(__dirname, '../../');
    var p2 = path.join(p1, filePath);
    return new Promise(function(resolve,reject){
        fs.readFile(p2, 'utf-8', function (err, data) {
            if(err){
                reject(err);
            }else {
                if(replaceOptions){
                    data = replaceStaticPath(p1,p2,data,replaceOptions);
                }
                resolve(data);
            }
        });
    });
};



  /**
   *
    var promise = staticHtmlUtils.getFileContentAsync("/static/photos.html",{
        urlPrefix:'http://cdn.ubibi.cn'
    });

    promise.then(function(data){
        res.send(data);
    });
 */
exports.getFileContentAsync = getFileContentAsync;