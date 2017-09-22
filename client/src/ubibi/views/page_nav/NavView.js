import {NavViewTemplate,NavViewCreateDialogTemplate} from './NavView.shtml';
import NavApis from '../../apis/NavApis';
import Dialog,{openTips} from '../../components/Dialog/Dialog';
import connectMyUserInfo from '../helpers/connectMyUserInfo';
import './NavView.less';


var NavViewCreateDialog = new Dialog(function (params) {
    var navList = params.navList;
    return {
        template: NavViewCreateDialogTemplate,
        data: function () {
            return {
                navList: navList,
                new_category: navList[0].id,
                new_title:'',
                new_url:""
            }
        },
        dialog: {
            title: "添加新站点",
            className: 'NavViewCreateDialog',
            beforeClose: function (obj) {
                var that =  this;
                var btnType = obj.type;
                if (btnType) {

                    if(!that.new_url){
                        openTips("URL不能为空");
                        return false;
                    }
                    if(!that.new_title){
                        openTips("标题不能为空");
                        return false;
                    }

                    NavApis.createNavItem({
                        title:that.new_title,
                        cid:that.new_category,
                        url:that.new_url
                    }).then(function(){
                        that.new_url = "";
                        that.new_title = "";
                        openTips("创建成功");
                        params.callback();
                    });
                    return false;
                }
            }
        }
    };
});




var NavView = connectMyUserInfo({
    template: NavViewTemplate,
    data: function () {
        return {
            navList: [],
            isInited: false
        };
    },
    methods: {
        getNavList:function(){
            var that = this;
            NavApis.getNavList().then(function (d) {
                var navList = [];
                navList = navList.concat(d);
                navList = navList.concat(d);
                navList = navList.concat(d);
                navList = navList.concat(d);
                that.isInited = true;
                that.navList = navList;
            });
        },
        onCreateNavItem: function () {
            var navList = this.navList;
            var that = this;
            NavViewCreateDialog.openDialog({navList: navList,callback:function(){
                that.getNavList();
            }});
        }
    },
    created: function () {
        this.getNavList();
    }
});


export default NavView;