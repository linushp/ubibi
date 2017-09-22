import UserStore from '../../apis/UserStore';
import UserApis from '../../apis/UserApis';


/**
 * 在 Data字段中,增加了一个myUserInfo属性
 * @param comp
 * @returns {*}
 */
export default function (comp) {

    var old_created = comp.created;
    var old_beforeDestroy = comp.beforeDestroy;
    var old_data_func = comp.data;

    comp.data = function (args) {
        if (old_data_func) {
            var data_obj = old_data_func.bind(this)(args);
            data_obj.myUserInfo = UserStore.getMyUserInfo();
            return data_obj;
        }
        return {
            myUserInfo: UserStore.getMyUserInfo()
        }
    };

    comp.methods = comp.methods || {};
    var old_onUserLoginSuccess = comp.methods.onUserLoginSuccess;
    comp.methods.onUserLoginSuccess = function (myUserInfo) {
        old_onUserLoginSuccess && old_onUserLoginSuccess.bind(this)(myUserInfo);
        this.myUserInfo = myUserInfo;
    };

    comp.created = function (args) {
        var that = this;
        UserStore.onChange(that.onUserLoginSuccess);
        old_created && old_created.bind(that)(args);
    };

    comp.beforeDestroy = function (args) {
        var that = this;
        UserStore.offChange(that.onUserLoginSuccess);
        old_beforeDestroy && old_beforeDestroy.bind(that)(args);
    };


    return comp;
}