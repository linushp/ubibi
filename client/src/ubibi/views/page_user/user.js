import {UserCreateTemplate,UserLoginTemplate} from './user.template.shtml';
import './user.less';


export const UserCreateComponent = {
    template: UserCreateTemplate,
    data: function () {
        return {
            regType: 'email'
        };
    }
};



export const UserLoginComponent = {

    template: UserLoginTemplate,
    data: function () {
        return {
            regType: 'email'
        };
    }

};


