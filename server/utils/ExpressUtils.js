
function isFunction(obj){
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


function sendPromise (handler) {
    return function (req, res) {
        var result = handler(req, res);
        if (isPromise(result)) {
            result.then(function (d) {
                res.send(d || {errorCode: 1, msg: 'ok'});
            }, function (e) {
                if (typeof e === 'string') {
                    res.send({errorCode: 1, msg: e});
                } else {
                    res.send(e || {errorCode: 1, msg: 'error'});
                }
            });
            return;
        }

        if (result) {
            res.send(result);
        }

    }
}


function handleRequest(handler){
    return function (req, res){
        var sendResult =  sendPromise(handler);
        sendResult(req,res);
    };
}


module.exports = {
    handleRequest:handleRequest,
    sendPromise:sendPromise
};