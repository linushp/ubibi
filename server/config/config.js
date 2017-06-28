var SqlQueryUtils = require('../utils/SqlQueryUtils');

exports.doConfig = function(){


    SqlQueryUtils.configMySQL({
        connectionLimit: 10,
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ubibi',
        port: 3306
    });





};