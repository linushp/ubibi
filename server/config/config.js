var SqlQueryUtils = require('../utils/SqlQueryUtils');

exports.doConfig = function(){


    SqlQueryUtils.configMySQL({
        connectionLimit: 10,
        host: '127.0.0.1',
        user: '',
        password: '',
        database: '',
        port: 3660
    });






};