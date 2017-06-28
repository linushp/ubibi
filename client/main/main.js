var html = require('./mmm.html');

var Foo = { template: '<div>foo</div>' };
var Bar = { template: '<div>bar</div>' };


var router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar }
    ]
});

debugger;




var app = new Vue({router:router}).$mount('#mainBody');
exports.app = app;