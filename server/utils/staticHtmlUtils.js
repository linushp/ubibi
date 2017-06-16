var path = require('path');
var fs = require('fs');


var replaceStaticPath = function (p1, p2, str) {
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
                return 'href="' + f11 + '"';
            } else {
                return 'src="' + f11 + '"';
            }
        }

        if (x1.indexOf("'") === 0) {
            x1 = x1.replace(/^'/, '').replace(/'$/, '');
            var f1 = path.join(dirname0, x1);

            var f11 = f1.replace(m1, '/');

            if (x.indexOf('href=') === 0) {
                return "href='" + f11 + "'";
            } else {
                return "src='" + f11 + "'";
            }
        }
        return x;
    });
};



var getFileContentAsync = function (filePath,isReplaceStaticPath) {
    var p1 = path.join(__dirname, '../../');
    var p2 = path.join(p1, filePath);
    return new Promise(function(resolve,reject){
        fs.readFile(p2, 'utf-8', function (err, data) {
            if(err){
                reject(err);
            }else {
                if(isReplaceStaticPath){
                    data = replaceStaticPath(p1,p2,data);
                }
                resolve(data);
            }
        });
    });
};

exports.getFileContentAsync = getFileContentAsync;