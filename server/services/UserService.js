var _ = require('underscore');
var SqlQueryUtils = require('../utils/SqlQueryUtils');


function createUser(nickname, mobile, email, passwd, avatar, description, role_name, sex) {
    return SqlQueryUtils.doQueryAsync({
        sql: "" +
        " insert into t_user" +
        " (nickname,mobile,email,passwd,avatar,description,role_name,sex)" +
        "  values " +
        " (?,?,?,?,?,?,?,?)",
        params: [nickname, mobile, email, passwd, avatar, description, role_name, sex]
    });
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


function createUserByMobile(mobile, nickname, avatar, passwd) {
    return createUser(nickname, mobile, '', passwd, avatar, '', 'guest', 0);
}

function createUserByEmail(email, nickname, avatar, passwd) {
    return createUser(nickname, '', email, passwd, avatar, '', 'guest', 0);
}


module.exports = {
    isUserExistByMobile: isUserExistByMobile,
    isUserExistByEmail: isUserExistByEmail,
    createUserByMobile: createUserByMobile,
    createUserByEmail: createUserByEmail
};
