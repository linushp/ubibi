var SqlQueryUtils = require('../utils/SqlQueryUtils');
var fs= require("fs");
var path= require("path");
var defaultConfig = require("./server_config_default.json");

var configObject = defaultConfig;
var serverConfigPath = path.resolve(__dirname,'./server_config.json');
var isServerConfigExist = fs.existsSync(serverConfigPath);
if(isServerConfigExist){
    var contentText = fs.readFileSync(serverConfigPath,'utf-8');
    var tempConfig = JSON.parse(contentText);
    configObject = Object.assign({},defaultConfig,tempConfig);
}


exports.doConfig = function(){


    SqlQueryUtils.configMySQL({
        connectionLimit: 10,
        host: configObject.mysql_host, //'127.0.0.1',
        user: configObject.mysql_user,//'root',
        password: configObject.mysql_password,////'',
        database: configObject.mysql_database, //'ubibi',
        port: configObject.mysql_port
    });

};