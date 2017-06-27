# imcoin-website



#依赖说明:

    1.      npm install -g webpack
    2.      npm install -g less
    3.      npm install -g less-plugin-clean-css





##开启HTML压缩

var minify = require('html-minifier').minify;
str = minify(str,{collapseWhitespace:true});



webpack -p ./client/home.js ./static/assets/home.min.js