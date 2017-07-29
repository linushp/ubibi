import './index.less';
import imagesData from './imagesData.json';
import {AppTemplate,AppHomeTemplate} from './templates.shtml';


Vue.filter('smallimage',function(img,name){
    //return name+ "___" + img;
    return "http://photos.ubibi.cn/luan/"+name+"/"+img+"?x-oss-process=style/small_w100";
});

Vue.filter('originimage',function(img,name){
    //return name+ "___" + img;
    return "http://photos.ubibi.cn/luan/"+name+"/"+img;
});


var AppView = {
    template:AppTemplate
};


var HomeView = {
    template:AppHomeTemplate,
    data:function(){
        var imagesDataList = [];
        for(var obj in imagesData){
            if(imagesData.hasOwnProperty(obj)){
                var v = imagesData[obj];
                imagesDataList.push({
                    name:obj,
                    images:v
                });
            }
        }


        return {
            imagesDataList:imagesDataList
        };
    }
};

var router = new VueRouter({
    mode: 'hash', //window.history.pushState ? 'history' : 'hash',
    routes: [
        {
            path: '/',
            redirect: '/home',
            component: AppView,
            children: [
                {path: '/home', component: HomeView}
            ]
        }
    ]
});


var app = new Vue({el: '#mainBody', router: router});
window.ubibiApp = app;
exports.app = app;