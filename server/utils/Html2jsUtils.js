var fs = require("fs");
var path = require("path");


function propStringToMap(ss1) {
    var propsMap = {};
    var propsLength = 0;
    var firstProp = null;
    var xa = ss1.split(/["'][\s]+/);
    for (var j = 0; j < xa.length; j++) {
        var xaj = xa[j];
        var xajPair = xaj.split('=');
        if (xajPair.length === 2) {
            var key = (xajPair[0] || "").trim();
            var value = xajPair[1] || "";
            if (key) {
                var value1 = value.replace(/['"]/gm, '');
                value1 = value1.trim();
                propsMap[key] = value1;
                propsLength++;
                if (!firstProp) {
                    firstProp = key;
                }
            }
        }
    }


    return {
        propsMap: propsMap,
        propsLength: propsLength,
        firstProp: firstProp
    };
}


function parseString2Html(html) {

    var templateArray = html.split('<string2-template');

    var resultObject = {};
    for (var i = 0; i < templateArray.length; i++) {
        var str = (templateArray[i] || "").trim();
        if (str.length > 0) {
            var index = str.indexOf('>');
            var ss1 = str.substring(0, index);
            var ss2 = str.substring(index + 1, str.length);
            ss1 = ss1.replace(/\\/mg, '');
            ss1 = ss1.trim();

            var templateContent = ss2.replace(/<\/string2-template>$/i, '');
            templateContent = templateContent.trim();
            templateContent = templateContent.replace(/\s+/gm, ' ');

            var propsResult = propStringToMap(ss1);

            var propsMap = propsResult.propsMap;
            var propsLength = propsResult.propsLength;
            var firstProp = propsResult.firstProp;

            var templateKey = propsMap['id'] || propsMap[firstProp];

            if (propsLength === 1) {
                resultObject[templateKey] = templateContent;
            }

            else if (propsLength > 1) {
                resultObject[templateKey] = {
                    content: templateContent,
                    propsMap: propsMap,
                    propsLength: propsLength,
                    firstProp: firstProp
                };
            }
        }
    }


    return resultObject;

}


function extendObject(a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
}

function htmlArray2js(dirPath, htmlPathArray) {
    var p = Promise.resolve();

    for (var i = 0; i < htmlPathArray.length; i++) {
        var htmlPath = (htmlPathArray[i] || '').trim();
        if (htmlPath) {
            p = p.then((function (dirPath, htmlPath) {
                return function (result) {
                    result = result || {};
                    return new Promise(function (resolve, reject) {
                        var filePath = path.resolve(dirPath, htmlPath);

                        if (filePath.indexOf(dirPath) !== 0) {
                            var errorMsg = {};
                            errorMsg["read_file_error_" + htmlPath] = "illegal access";
                            result = extendObject(result, errorMsg);
                            resolve(result);
                            return;
                        }

                        fs.readFile(filePath, "utf-8", function (err, html) {
                            if (err) {
                                var errorMsg = {};
                                errorMsg["read_file_error_" + htmlPath] = "read file error";
                                result = extendObject(result, errorMsg);
                                resolve(result);
                            } else {
                                var htmlObject = parseString2Html(html);
                                result = extendObject(result, htmlObject);
                                resolve(result);
                            }
                        });
                    });
                }
            })(dirPath, htmlPath));
        }
    }
    return p;
}


function getHtml2JsContent(dirPath, htmls) {
    var htmlPathArray = htmls.split(',');
    var jsPromise = htmlArray2js(dirPath, htmlPathArray);
    return jsPromise.then(function (js) {
        var jsStr = JSON.stringify(js);
        return jsStr;
    });
}


var JS_STR_CACHE = {};


/**
 *
 *
 app.get('/html2js', handleHtml2JSRequest(path.join(__dirname, '../static'),{
    cache:false
 }));

 <script src="/html2js?output=html2js&htmls=bixun/html/test.shtml"></script>

 * @param dirPath
 * @param config
 * @returns {Function}
 */
function handleHtml2JSRequest(dirPath, config) {
    return function (req, res) {
        var req_query = req.query;
        var htmls = req_query.html;
        var output = req_query.output;

        var promise = null;
        if (config.cache && JS_STR_CACHE[htmls]) {
            promise = Promise.resolve(JS_STR_CACHE[htmls]);
        } else {
            promise = getHtml2JsContent(dirPath, htmls);
            if (config.cache) {
                promise = promise.then(function (jsStr) {
                    JS_STR_CACHE[htmls] = jsStr;
                    return jsStr;
                });
            }
        }

        promise.then(function (jsStr) {
            if (output) {
                output = output.trim();
                if (output.length > 30) {
                    output = output.substring(0, 30);
                }
                output = output.replace(/[^0-9a-zA-Z]/gm, 'a');
                jsStr = "var " + output + " = " + jsStr;
                res.writeHead(200, {
                    'Content-Type': 'application/javascript; charset=utf-8',
                    "Cache-Control": "public, max-age=31536000"
                });
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
            }
            res.write(jsStr);
            res.end();
        });
    }
}


module.exports = {
    handleHtml2JSRequest: handleHtml2JSRequest
};