import {UserCreateTemplate,UserLoginTemplate} from './user.template.shtml';
import './user.less';


export const UserCreateComponent = {
    template: UserCreateTemplate,

    data: function () {
        return {
            isShowBox:false,
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
        setTimeout(function(){
            that.isShowBox = true;
        },10)
    }
};



export const UserLoginComponent = {

    template: UserLoginTemplate,

    data: function () {
        return {
            isShowBox:false,
            username:"",
            password:""
        };
    },

    methods:{
        doLogin:function(){
            var that = this;

        }
    },
    created:function(){
        var that = this;
        setTimeout(function(){
            that.isShowBox = true;
        },10)
    }

};


