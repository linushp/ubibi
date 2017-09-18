import AjaxUtils from '../../_commons/AjaxUtils';
import globalEventBus,{EVNETS} from '../utils/globalEventBus';
import getRandomAvatar from '../utils/getRandomAvatar';


export default {

    userLogin(username, passwd){
        return AjaxUtils.sendPostJSONRequest("/api/v1/ubibi/user/login", {
            username: username,
            passwd: passwd
        }).then(function (d) {

            //登录成功
            if (d.result && d.result[0]) {
                var myUserInfo = d.result[0];

                var obj = {
                    myUserInfo: myUserInfo,
                    isLoginOk: true
                };

                globalEventBus.emit(EVNETS.USER_LOGIN_SUCCESS, obj);
                return obj;
            }

            return {
                myUserInfo: null,
                isLoginOk: false
            };
        });
    },


    userLogout(){
        return AjaxUtils.sendGetRequest('/api/v1/ubibi/user/logout').then(function(d){
            globalEventBus.emit(EVNETS.USER_LOG_OUT, {
                myUserInfo: null,
                isLogOutOk: true
            });
            return d;
        });
    },

    userReg(username, passwd){
        var avatar = getRandomAvatar();
        return AjaxUtils.sendPostJSONRequest("/api/v1/ubibi/user/reg", {
            username: username,
            passwd: passwd,
            avatar: avatar
        });
    }


}