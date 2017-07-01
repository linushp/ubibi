import * as AjaxUtils from '../../client_utils/AjaxUtils';
import './index.less';
import {template_header,template_approot} from './template.html';

console.log(template_approot);
console.log(template_header);

var AppHeader = {
    template:template_header
};


var AppComponent = {
    template: template_approot,
    components:{
        'app-header':AppHeader
    }
};


var Foo2 = { template: '<div>222222--{{aaa}}</div>' ,data:function(){
    return {aaa:111};
}};
var Bar = { template: '<div>bar</div>' };


var router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: AppComponent ,
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