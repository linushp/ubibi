import {UserCreateTemplate,UserLoginTemplate} from './user.template.shtml';
import './user.less';
import UserApis from '../../apis/UserApis';
import {openTips} from '../../components/Dialog/Dialog';

export const UserCreateComponent = {
    template: UserCreateTemplate,

    data: function () {
        return {
            username:"",
            password:""
        };
    },

    methods:{
        doCreateUser:function(){
            var that = this;

        }
    },
    created:function(){
        var that = this;
    }
};



export const UserLoginComponent = {

    template: UserLoginTemplate,

    data: function () {
        return {
            username:"",
            password:""
        };
    },

    methods:{
        doLogin:function(){
            var that = this;
            UserApis.userLogin(that.username,that.password).then(function(d){
                if(d.isLoginOk ){
                    openTips("登录成功");
                    setTimeout(function(){
                        that.$router.push('/')
                    },500);
                }else {
                    openTips("用户名或密码错误");
                }
            });
        }
    },
    created:function(){
        var that = this;
    }

};


