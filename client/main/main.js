

var Foo = { template: '<div>foo</div>' };
var Bar = { template: '<div>bar</div>' };


var router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar }
    ]
});






var app = new Vue({router:router}).$mount('#mainBody');
exports.app = app;