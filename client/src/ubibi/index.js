import * as AjaxUtils from '../_commons/AjaxUtils';
import AppView from './views/page_app/AppView';
import './components/components';
import './views/view-components/view-components';
import {UserCreateComponent,UserLoginComponent} from './views/page_user/user';
import {TopicsView,TopicSingleView,TopicCreateView,TopicUpdateView} from './views/page_topics/TopicsView';
import './_commons.less';


var router = new VueRouter({
    mode: 'hash', //window.history.pushState ? 'history' : 'hash',
    routes: [
        {
            path: '/',
            redirect: '/topics',
            component: AppView,
            children: [
                {path: '/topics', component: TopicsView},
                {path: '/topic', redirect: '/topics' },
                {path: '/topic/create', component: TopicCreateView},
                {path: '/topic/update', component: TopicUpdateView},
                {path: '/topic/:id', component: TopicSingleView},
                {path: '/user/create', component: UserCreateComponent},
                {path: '/user/login', component: UserLoginComponent}
            ]
        }
    ]
});


var app = new Vue({el: '#mainBody', router: router});
window.ubibiApp = app;
exports.app = app;