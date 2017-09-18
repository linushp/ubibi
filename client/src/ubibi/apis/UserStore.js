import globalEventBus,{EVNETS} from '../utils/globalEventBus';

var cache_myUserInfo = null;
var USER_STORE_CHANGE = "UserStoreChange";
globalEventBus.on(EVNETS.USER_LOGIN_SUCCESS, function (d) {
    if (d.isLoginOk) {
        cache_myUserInfo = d.myUserInfo;
        var ss = JSON.stringify(cache_myUserInfo);
        localStorage.setItem("myUserInfo", ss);
        globalEventBus.emit(USER_STORE_CHANGE, cache_myUserInfo);
    }
});

globalEventBus.on(EVNETS.USER_LOG_OUT, function (d) {
    cache_myUserInfo = null;
    var ss = JSON.stringify(cache_myUserInfo);
    localStorage.setItem("myUserInfo", ss);
    globalEventBus.emit(USER_STORE_CHANGE, null);
});


export default {
    onChange(listener){
        globalEventBus.on(USER_STORE_CHANGE, listener);
    },
    offChange(listener){
        globalEventBus.off(USER_STORE_CHANGE, listener);
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