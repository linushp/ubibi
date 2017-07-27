
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


module.exports = {
    sendPromise: function (handler) {
        return function (req, res) {
            var result = handler(req, res);
            if (isPromise(result)) {
                result.then(function (d) {
                    res.send(d || {msg: 'ok'});
                }, function (e) {
                    res.send(e || {msg: 'error'});
                });
                return;
            }

            if(result){
                res.send(result);
            }

        }
    }
};