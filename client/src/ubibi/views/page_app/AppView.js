import './AppView.less';
import UserStore from '../../apis/UserStore';
import UserApis from '../../apis/UserApis';
import {openTips} from '../../components/Dialog/Dialog';
import connectMyUserInfo from '../helpers/connectMyUserInfo';
import {AppHeaderTemplate,AppRootTemplate,AppFooterTemplate} from './AppView.shtml';

var AppHeader = {
    template: AppHeaderTemplate,
    props: ["myUserInfo"],
    methods: {
        logout: function () {
            var that = this;
            UserApis.userLogout().then(function () {
                openTips("退出成功");
                //debugger;
            });
        }
    }
};

var AppFooter = {
    template: AppFooterTemplate,
    props: ["myUserInfo"]
};


var AppView = connectMyUserInfo({
    template: AppRootTemplate,
    components: {
        'app-header': AppHeader,
        'app-footer': AppFooter
    },
    data: function () {
        return {
        };
    }
});

export default AppView;