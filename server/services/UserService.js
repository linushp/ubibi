var _ = require('underscore');
var SqlQueryUtils = require('../utils/SqlQueryUtils');
var models = require('./model/models');
var md5 = require('rebix-utils/addon_nopack/md5');
var ErrorCode = require('../constants/ErrorCode');
var UserModel = models.UserModel;
var UserMsgModel = models.UserMsgModel;
var UserTokenModel = models.UserTokenModel;


function createUser(userObject) {
    return SqlQueryUtils.doInsertByModelAsync(UserModel, userObject);
}

function isUserExistBy(fieldName, email) {
    return SqlQueryUtils.doQueryAsync({
        sql: 'select count(0) from t_user where ' + fieldName + '=?',
        params: [email]
    });
}

function isUserExistByMobile(mobile) {
    return isUserExistBy('mobile', mobile)
}


function isUserExistByEmail(email) {
    return isUserExistBy('email', email)
}


//用于登录
function getUserInfoByPassword(username, passwd) {
    return SqlQueryUtils.doQueryAsync({
        sql: 'select ' + SqlQueryUtils.joinTableFields(UserModel, ['passwd']) + ' from ' + UserModel.tableName +
        " where (`mobile`=? or `email`=? or `username`= ?) and `passwd`=?",
        params: [username, username, username, passwd]
    });
}


function getUserInfoByUid(uid) {
    return SqlQueryUtils.doQueryAsync({
        sql: 'select ' + SqlQueryUtils.joinTableFields(UserModel, ['passwd']) + ' from ' + UserModel.tableName +
        " where `id`= ? ",
        params: [uid]
    });
}


function createUserToken(uid, userInfo) {
    var token = md5.hex_md5(uid + "_" + new Date().getTime() + "_" + Math.random());
    return SqlQueryUtils.doInsertByModelAsync(UserTokenModel, {
        'uid': uid,
        'token': token,
        "user_info": JSON.stringify(userInfo)
    }).then(function (d) {
        d.token = token;
        return d;
    });
}

function deleteUserToken(uid, token) {
    if (uid && token) {
        return SqlQueryUtils.doQueryAsync({
            sql: 'delete  from ' + UserTokenModel.tableName +
            "  where `id`= ? and `token` = ? ",
            params: [uid, token]
        });
    }
    return Promise.reject("uid or token is not exist when deleteUserToken");
}


function getUserToken(uid, token) {
    if (uid && token) {
        return SqlQueryUtils.doQueryAsync({
            sql: 'select * from ' + UserTokenModel.tableName +
            "  where `uid`= ? and `token` = ? ",
            params: [uid, token]
        });
    }
    return Promise.resolve(null);
}



module.exports = {

    isUserExistByMobile: isUserExistByMobile,
    isUserExistByEmail: isUserExistByEmail,
    createUser: createUser,
    getUserInfoByPassword: getUserInfoByPassword,
    getUserInfoByUid: getUserInfoByUid,

    createUserToken: createUserToken,
    deleteUserToken: deleteUserToken,
    getUserToken: getUserToken

};