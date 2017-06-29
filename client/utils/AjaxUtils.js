function sendXmlHttpRequest(method, url, data, contentType, responseType) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        if (responseType) {
            xhr.responseType = responseType;
        } else {
            xhr.responseType = 'text';
        }

        if (contentType === 'form') {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        if (contentType === 'json') {
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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

        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
    });
}


function sendGetRequest(url) {
    return sendXmlHttpRequest("GET", url);
}


function sendGetJSONRequest(url) {
    return sendGetRequest(url).then(function (responseText) {
        return JSON.parse(responseText);
    });
}


function sendPostRequest(url, data, contentType) {
    return sendXmlHttpRequest("POST", url, data, contentType);
}


function sendPostJSONRequest(url, data) {
    var dataStr = JSON.stringify(data);
    return sendPostRequest(url, dataStr, 'json').then(function (responseText) {
        return JSON.parse(responseText);
    });
}


module.exports = {
    sendXmlHttpRequest: sendXmlHttpRequest,
    sendGetRequest: sendGetRequest,
    sendGetJSONRequest: sendGetJSONRequest,
    sendPostRequest: sendPostRequest,
    sendPostJSONRequest: sendPostJSONRequest
};