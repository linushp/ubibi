var mysql = require('mysql');
// "mysql": "^2.13.0",

var _mysql_config = {
    connectionLimit: 10,
    host: '',
    user: '',
    password: '',
    database: '',
    port: 3660
};

var _sql_map = {};

var _query_result_cache = {};

var _connectionPool = null;

function getConnectionPool() {
    if (!_connectionPool) {
        _connectionPool = mysql.createPool(_mysql_config);
    }
    return _connectionPool;
}

function parseQueryResult(results) {
    return results;
}

function toResModel(requestModel, objResult, errorCode, errorMsg) {
    return {
        result: objResult,
        errorCode: errorCode,
        errorMsg: errorMsg
    };
}

function configSqlMap(sql_map) {
    _sql_map = sql_map;
}

function configMySQL(config) {
    _mysql_config = config;
}


function doQueryAsync(requestModel) {
    var sqlId = requestModel['sqlId'];
    var sql = requestModel['sql'];
    var webSql = requestModel['webSql'];
    var params = requestModel['params'] || [];

    if (process.env.NODE_ENV === 'production') {
        sql = sql || _sql_map[sqlId];
    }
    else {
        sql = sql || webSql || _sql_map[sqlId];
    }

    return new Promise(function (resolve, reject) {

        if (!sql) {
            return reject(toResModel(requestModel, null, 2, "not find sql of id :" + sqlId));
        }

        var pool = getConnectionPool();
        pool.getConnection(function (err, connection) {
            connection.query(sql, params, function (error, results, fields) {
                connection.release();
                var sqlResponseModel = null;
                var objResult = parseQueryResult(results);
                if (error) {
                    sqlResponseModel = toResModel(requestModel, objResult, 1, error.toString());
                } else {
                    sqlResponseModel = toResModel(requestModel, objResult, 0, null);
                }
                resolve(sqlResponseModel);
            });
        });

    });
}


function doQueryCacheableAsync(requestModel, cacheKey, cacheSecond) {
    if (cacheSecond && cacheSecond > 0) {
        var cacheObject = _query_result_cache[cacheKey];
        if (cacheObject) {
            var cacheObjectTime = cacheObject['time'];
            if (cacheObjectTime + cacheSecond * 1000 > Date.now()) {
                var cacheResult = cacheObject['result'];
                return Promise.resolve(cacheResult);
            }
        }
    }

    return doQueryAsync(requestModel).then(function (result) {
        _query_result_cache[cacheKey] = {time: Date.now(), result: result};
        return result;
    });
}

module.exports = {
    configMySQL: configMySQL,
    configSqlMap: configSqlMap,
    doQueryAsync: doQueryAsync,
    doQueryCacheableAsync: doQueryCacheableAsync
};
