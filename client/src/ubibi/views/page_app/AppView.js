import './AppView.less';
import UserStore from '../../apis/UserStore';
import {AppHeaderTemplate,AppRootTemplate,AppFooterTemplate} from './AppView.shtml';

var AppHeader = {
    template: AppHeaderTemplate,
    props: ["myUserInfo"]
};

var AppFooter = {
    template: AppFooterTemplate,
    props: ["myUserInfo"]
};


var AppView = {
    template: AppRootTemplate,
    components: {
        'app-header': AppHeader,
        'app-footer': AppFooter
    },
    data: function () {
        return {
            myUserInfo: UserStore.getMyUserInfo()
        };
    },
    methods: {
        onUserLoginSuccess: function (obj) {
            if (obj && obj.isLoginOk) {
                this.myUserInfo = obj.myUserInfo;
            }
        },
        logout:function(){
            UserStore.set
        }
    },
    created: function () {
        UserStore.onChange(this.onUserLoginSuccess);
    },
    beforeDestroy: function () {
        UserStore.offChange(this.onUserLoginSuccess);
    }
};

export default AppView;