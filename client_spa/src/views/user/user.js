import {createUserTemplate} from './user.template.shtml';
import './user.less';


export const UserCreateComponent = {

    template: createUserTemplate,
    data: function () {
        return {
            regType: 'email'
        };
    }

};