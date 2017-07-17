import * as AjaxUtils from '../../client_utils/AjaxUtils';
import AppView from './views/page_app/AppView';
import {UserCreateComponent,UserLoginComponent} from './views/page_user/user';
import {TopicsView} from './views/page_topics/TopicsView';
import './_commons.less';

var router = new VueRouter({
    mode: 'hash', //window.history.pushState ? 'history' : 'hash',
    routes: [
        {
            path: '/',
            component: AppView,
            children: [
                {path: 'topics', component: TopicsView},
                {path: 'topic', component: {}},
                {path: 'user/create', component: UserCreateComponent},
                {path: 'user/login', component: UserLoginComponent}
            ]
        }
    ]
});


var app = new Vue({el: '#mainBody', router: router});
window.ubibiApp = app;
exports.app = app;