BUILD_PAGE_MODE=$1
BUILD_PAGE_NAME=$2
BUILD_VERSION=$(date '+%s')

rm -rf static/assets/css/$BUILD_PAGE_NAME.*

if [ $BUILD_PAGE_MODE = "p" ]; then
   #lessc --plugin=less-plugin-clean-css="advanced" ./client_multi/$BUILD_PAGE_NAME/$BUILD_PAGE_NAME.less ./static/assets/css/$BUILD_PAGE_NAME.${BUILD_VERSION}.css

   lessc --plugin=less-plugin-clean-css="advanced" ./client_multi/$BUILD_PAGE_NAME/$BUILD_PAGE_NAME.less ./static/assets/css/$BUILD_PAGE_NAME.min.css
   MD5_STRING=$(md5 ./static/assets/css/$BUILD_PAGE_NAME.min.css)
   MD5_STRING_VALUE=$(echo $MD5_STRING|cut -d'=' -f2)
   MD5_STRING_VALUE=$(echo $MD5_STRING_VALUE|sed s/[[:space:]]//g)
   cp ./static/assets/css/$BUILD_PAGE_NAME.min.css ./static/assets/css/$BUILD_PAGE_NAME.$MD5_STRING_VALUE.min.css
   BUILD_VERSION=$MD5_STRING_VALUE

else
   lessc ./client_multi/$BUILD_PAGE_NAME/$BUILD_PAGE_NAME.less ./static/assets/css/$BUILD_PAGE_NAME.css
fi


node ./bin/build_assets_css_html.js $BUILD_PAGE_MODE $BUILD_PAGE_NAME $BUILD_VERSION







#使用方法:
#       sh ./build_less.sh p main
#       sh ./build_less.sh d main