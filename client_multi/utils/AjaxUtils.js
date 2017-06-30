
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


function jsonParseResponseText(responseText){
    return JSON.parse(responseText);
}


function sendGetRequest(url) {
    return sendXmlHttpRequest("GET", url);
}


function sendGetJSONRequest(url) {
    return sendGetRequest(url).then(jsonParseResponseText);
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