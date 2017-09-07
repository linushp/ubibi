import globalEventBus,{EVNETS} from '../utils/globalEventBus';

var cache_myUserInfo = null;

globalEventBus.on(EVNETS.USER_LOGIN_SUCCESS, function (d) {
    if (d.isLoginOk) {
        cache_myUserInfo = d.myUserInfo;
        var ss = JSON.stringify(cache_myUserInfo);
        localStorage.setItem("myUserInfo", ss);
    }
});

globalEventBus.on(EVNETS.USER_LOG_OUT, function (d) {
    cache_myUserInfo = null;
    var ss = JSON.stringify(cache_myUserInfo);
    localStorage.setItem("myUserInfo", ss);
});


export default {
    onChange(listener){
        globalEventBus.on(EVNETS.USER_LOGIN_SUCCESS, listener);
    },
    offChange(listener){
        globalEventBus.off(EVNETS.USER_LOGIN_SUCCESS, listener);
    },
    getMyUserInfo(){
        if (cache_myUserInfo) {
            return cache_myUserInfo;
        }
        var ss = localStorage.getItem("myUserInfo");
        if (ss) {
            cache_myUserInfo = JSON.parse(ss);
            return cache_myUserInfo;
        }
        return null;
    }
}