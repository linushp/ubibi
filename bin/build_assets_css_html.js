var fs = require('fs');
var path = require('path');

var arguments = process.argv.splice(2);

//node ./bin/build_assets_css_html.js $BUILD_PAGE_MODE $BUILD_PAGE_NAME $BUILD_VERSION
var BUILD_PAGE_MODE = arguments[0];
var BUILD_PAGE_NAME = arguments[1];
var BUILD_VERSION = arguments[2];



//./static/assets/css/$BUILD_PAGE_NAME.${BUILD_VERSION}.css

//./static/assets/css/$BUILD_PAGE_NAME.css

var name = null;
if(BUILD_PAGE_MODE==="p"){
    name = BUILD_PAGE_NAME + "."+BUILD_VERSION+".min.css";
}
else {
    name = BUILD_PAGE_NAME + ".css";
}
//var html = '<script src="/static/assets/js/'+name+'"></script>';
var html = '<link href="<%=static_host%>/static/assets/css/'+name+'" rel="stylesheet" />';


var out_path = "/server/views/"+BUILD_PAGE_NAME+"/assets.css.html";

var out_path1 =  path.join(__dirname,".."+ out_path);

fs.writeFileSync(out_path1, html);

console.log("build OK :"+ out_path);