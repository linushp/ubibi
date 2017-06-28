BUILD_PAGE_MODE=$1
BUILD_PAGE_NAME=$2

rm -rf static/assets/js/$BUILD_PAGE_NAME.*

#webpack -p -j ./client/main.js ./static/assets/main.[hash:8].js > ./tmp/assets_main.json


if [ $BUILD_PAGE_MODE = "p" ]; then
    webpack -p -j --config ./bin/build_assets_webpack.config.js ./client/$BUILD_PAGE_NAME/$BUILD_PAGE_NAME.js ./static/assets/js/$BUILD_PAGE_NAME.[hash].min.js > ./tmp/assets_$BUILD_PAGE_NAME.json
else
    webpack -d -j --config ./bin/build_assets_webpack.config.js ./client/$BUILD_PAGE_NAME/$BUILD_PAGE_NAME.js ./static/assets/js/$BUILD_PAGE_NAME.js > ./tmp/assets_$BUILD_PAGE_NAME.json
fi


node ./bin/build_assets_js_html.js $BUILD_PAGE_NAME







#使用方法:
#       sh ./build_js.sh p main
#       sh ./build_js.sh d main