import {getCacheOrCreatePromise} from './PromiseUtils';

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


function sendGetRequest(url, cacheSecond) {
    if(!cacheSecond){
        return sendXmlHttpRequest("GET", url);
    }
    return getCacheOrCreatePromise(url, cacheSecond, function () {
        return sendXmlHttpRequest("GET", url);
    });
}


function sendGetJSONRequest(url, cacheSecond) {
    return sendGetRequest(url, cacheSecond).then(jsonParseResponseText);
}


function sendPostRequest(url, data, contentType) {
    return sendXmlHttpRequest("POST", url, data, contentType);
}


function sendJsonHttpRequest(method,url,data){
    var dataStr = JSON.stringify(data);
    return sendXmlHttpRequest(method, url, dataStr, 'json').then(jsonParseResponseText);
}


function sendPostJSONRequest(url, data) {
    return sendJsonHttpRequest('post',url,data);
}

function sendPutJSONRequest(url, data){
    return sendJsonHttpRequest('put',url,data);
}

function sendDeleteJSONRequest(url,data){
    return sendJsonHttpRequest('delete',url,data);
}

function toQueryString(obj){
    var arrs = [];
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            var value = obj[key];
            if(value!==undefined){
                arrs.push(key+"=" + encodeURIComponent(value));
            }
        }
    }
    return arrs.join("&");
}



function parseDataListTotalCount(d) {
    var x = null;
    var y = 0;
    try {
        x = d.dataList.result;
    } catch (e) {}
    try {
        y = d.totalCount.result[0]['total_count'];
    } catch (e) {}
    return {
        total_count: y,
        data_list: x
    };
}

export default {
    sendXmlHttpRequest: sendXmlHttpRequest,
    sendGetRequest: sendGetRequest,
    sendGetJSONRequest: sendGetJSONRequest,
    sendPostRequest: sendPostRequest,
    sendPostJSONRequest: sendPostJSONRequest,
    sendPutJSONRequest: sendPutJSONRequest,
    sendDeleteJSONRequest:sendDeleteJSONRequest,
    toQueryString:toQueryString,
    parseDataListTotalCount:parseDataListTotalCount
};