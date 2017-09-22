import * as AjaxUtils from '../_commons/AjaxUtils';
import AppView from './views/page_app/AppView';
import './components/components';
import './views/view-components/view-components';
import {UserCreateComponent,UserLoginComponent} from './views/page_user/user';
import {TopicsView,TopicSingleView,TopicCreateView,TopicUpdateView} from './views/page_topics/TopicsView';
import HomeView from './views/page_home/HomeView';
import NavView from './views/page_nav/NavView';
import AboutView from './views/page_about/AboutView';
import AlbumView from './views/page_album/AlbumView';
import './_commons.less';


var router = new VueRouter({
    //mode: "hash",//window.history.pushState ? 'history' : 'hash',
    mode: window.history.pushState ? 'history' : 'hash',
    routes: [
        {
            path: '/',
            component: AppView,
            children: [
                {path: '/topics', component: TopicsView},
                {path: '/topics/:cid', component: TopicsView},
                {path: '/topic', redirect: '/topics' },
                {path: '/topic/create', component: TopicCreateView},
                {path: '/topic/update/:id', component: TopicUpdateView},
                {path: '/topic/:id', component: TopicSingleView},
                {path: '/user/create', component: UserCreateComponent},
                {path: '/user/login', component: UserLoginComponent},
                {path: '/nav', component: NavView},
                {path: '/about', component: AboutView},
                {path: '/album', component: AlbumView},
                {path: '/', component: HomeView}
            ]
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});


var app = new Vue({el: '#mainBody', router: router});
window.ubibiApp = app;
exports.app = app;