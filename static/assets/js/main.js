/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************!*\
  !*** ./client/main/main.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	var AjaxUtils = __webpack_require__(/*! ../utils/AjaxUtils */ 1);
	
	
	var AppHeader = {
	    template:'' +
	    '<div class="app-header">' +
	    '   header' +
	    ' </div>'
	};
	
	var Foo = { template: '<div> <app-header /> <router-view></router-view> foo</div>',components:{'app-header':AppHeader}};
	var Foo2 = { template: '<div>222222--{{aaa}}</div>' ,data:function(){
	    return {aaa:111};
	}};
	var Bar = { template: '<div>bar</div>' };
	
	
	var router = new VueRouter({
	    mode: 'history',
	    routes: [
	        {
	            path: '/',
	            component: Foo ,
	            children:[
	                {
	                    path:'foo',
	                    alias:'',
	                    component:Foo2
	                }
	            ]
	        }
	    ]
	});
	
	
	var app = new Vue({ el: '#mainBody', router:router});
	window.ubibiApp = app;
	exports.app = app;

/***/ },
/* 1 */
/*!***********************************!*\
  !*** ./client/utils/AjaxUtils.js ***!
  \***********************************/
/***/ function(module, exports) {

	
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

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map