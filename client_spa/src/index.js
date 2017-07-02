import * as AjaxUtils from '../../client_utils/AjaxUtils';
import './index.less';
import {UserCreateComponent} from './views/user/user';
import {
    template_header,
    template_approot,
    template_topics,
    template_topic
} from './index.template.shtml';

var AppHeader = {
    template: template_header
};


var AppComponent = {
    template: template_approot,
    components: {
        'app-header': AppHeader
    }
};


var TopicsComponent = {
    template: template_topics,
    data: function () {
        return {aaa: 111};
    }
};

var TopicComponent = {
    template: template_topic,
    data: function () {
        return {aaa: 111};
    }
};


var router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: AppComponent,
            children: [
                {
                    path: 'topics',
                    alias: '',
                    component: TopicsComponent
                },

                {
                    path: 'topic',
                    component: TopicComponent
                },

                {
                    path:'user/create',
                    component:UserCreateComponent
                }
            ]
        }
    ]
});


var app = new Vue({el: '#mainBody', router: router});
window.ubibiApp = app;
exports.app = app;