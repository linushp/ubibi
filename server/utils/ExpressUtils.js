var express = require('express');


function isFunction(obj) {
    return Object.prototype.toString.call(obj) === "[object Function]";
}
function isPromise(obj) {
    if (!obj) {
        return false;
    }

    if (obj instanceof Promise) {
        return true;
    }

    return isFunction(obj.then) && isFunction(obj.catch)
}

class RenderObject {
    constructor(url, obj, callback) {
        this.url = url;
        this.obj = obj;
        this.callback = callback;
    }
}


function sendResponse(res, d) {
    if (d instanceof RenderObject) {
        res.render(d.url, d.obj, d.callback);
    } else {
        res.send(d || {errorCode: 4, msg: 'ok'});
    }
}

function sendPromise(handler) {
    return function (req, res, next) {
        var result = handler(req, res, next);
        if (result) {

            if (isPromise(result)) {
                result.then(function (d) {
                    sendResponse(res, d);
                }, function (e) {
                    if (typeof e === 'string') {
                        if (e === 'not_login') {
                            res.send({errorCode: 2, msg: "用户未登录"});
                        } else {
                            res.send({errorCode: 1, msg: e});
                        }
                    } else {
                        res.send(e || {errorCode: 3, msg: 'error'});
                    }
                });

            } else {
                sendResponse(res, result);
            }

        }
    }
}


function handleRequest(handler) {
    return function (req, res, next) {
        var sendResult = sendPromise(handler);
        sendResult(req, res, next);
    };
}


function createRouter(maker) {
    var router = express.Router();

    var app = {
        "get": function (url, callback) {
            router.get(url, handleRequest(callback))
        },
        "post": function (url, callback) {
            router.post(url, handleRequest(callback))
        },
        "put": function (url, callback) {
            router.put(url, handleRequest(callback))
        },
        "delete": function (url, callback) {
            router.delete(url, handleRequest(callback))
        }
    };

    maker(app);
    return router;
}


//createRouter(function (router, RenderObject) {
//    router.get("/aaa", async function (req, res) {
//        return new RenderObject("/addd.html", {}, function (aa, bb) {
//
//        });
//    });
//    router.get("/bbb", function (req, res) {
//
//    });
//});


module.exports = {
    handleRequest: handleRequest,
    sendPromise: sendPromise,
    createRouter: createRouter
};