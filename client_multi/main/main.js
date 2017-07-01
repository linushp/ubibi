var AjaxUtils = require('../../client_utils/AjaxUtils');


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