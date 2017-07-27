function sendXmlHttpRequest(method, url, data, contentType, responseType) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        //1.responseType
        if (responseType) {
            xhr.responseType = responseType;
        } else {
            xhr.responseType = 'text';
        }


        //2.contentType
        var CONST_CONTENT_TYPE = 'Content-Type';
        if (contentType === 'form') {
            xhr.setRequestHeader(CONST_CONTENT_TYPE, "application/x-www-form-urlencoded");
        }
        if (contentType === 'json') {
            xhr.setRequestHeader(CONST_CONTENT_TYPE, "application/json;charset=UTF-8");
        }


        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    var responseText = xhr.responseText;
                    resolve(responseText);
                } else {
                    reject(xhr.status);
                }
            }
        };


        //3.data
        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }

    });
}


function jsonParseResponseText(responseText) {
    return JSON.parse(responseText);
}


var GET_REQUEST_CACHE = {};
function sendGetRequest(url, isUseCache) {
    if (isUseCache) {
        if (GET_REQUEST_CACHE[url] && GET_REQUEST_CACHE[url].timeStamp + 1000 * 3600 * 24 < new Date().getTime()) {
            return Promise.resolve(GET_REQUEST_CACHE[url].data);
        }
    }
    return sendXmlHttpRequest("GET", url).then(function (data) {
        if (isUseCache) {
            GET_REQUEST_CACHE[url] = {
                data: data,
                timeStamp: new Date().getTime()
            };
        }
        return data;
    });
}


function sendGetJSONRequest(url, isUseCache) {
    return sendGetRequest(url, isUseCache).then(jsonParseResponseText);
}


function sendPostRequest(url, data, contentType) {
    return sendXmlHttpRequest("POST", url, data, contentType);
}

function sendPostJSONRequest(url, data) {
    var dataStr = JSON.stringify(data);
    return sendPostRequest(url, dataStr, 'json').then(jsonParseResponseText);
}


module.exports = {
    sendXmlHttpRequest: sendXmlHttpRequest,
    sendGetRequest: sendGetRequest,
    sendGetJSONRequest: sendGetJSONRequest,
    sendPostRequest: sendPostRequest,
    sendPostJSONRequest: sendPostJSONRequest
};