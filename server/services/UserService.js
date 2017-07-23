var _ = require('underscore');
var SqlQueryUtils = require('../utils/SqlQueryUtils');
var models = require('./model/models');

var UserModel = models.UserModel;
var UserMsgModel = models.UserMsgModel;

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


function checkUserPassword(mobileOrEmail, passwd) {
    return SqlQueryUtils.doQueryAsync({
        sql: 'select count(0) as total_count from ' + UserModel.tableName +
        " where (mobile=? or email=?) and passwd=?",
        params: [mobileOrEmail, mobileOrEmail, passwd]
    });
}


module.exports = {
    isUserExistByMobile: isUserExistByMobile,
    isUserExistByEmail: isUserExistByEmail,
    createUser: createUser,
    checkUserPassword: checkUserPassword
};