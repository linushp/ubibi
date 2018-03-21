var SqlQueryUtils = require('../utils/SqlQueryUtils');


var SysConfigItemModel = {
    tableName: 's_config',
    tableFields: [
        'id',
        'config_name',
        'config_value',
        'create_time',
        'update_time'
    ]
};

// var SysConfigItemModelDAO = SqlQueryUtils.createSimpleDAO(SysConfigItemModel);

async function insertOrUpdate(config_name,config_value) {

    var itemObject = {
        config_name:config_name,
        config_value:config_value
    };

    var mm = await SqlQueryUtils.doQueryByConditionAsync(SysConfigItemModel,{config_name:config_name});
    if(mm && mm.result && mm.result.length > 0){
        var id = mm.result[0].id;
        return SqlQueryUtils.doUpdateByModelAsync(SysConfigItemModel,itemObject,id);
    }else {
        return SqlQueryUtils.doInsertByModelAsync(SysConfigItemModel,itemObject);
    }
}

async function getConfigByName(config_name) {
    return SqlQueryUtils.doQueryByConditionAsync(SysConfigItemModel,{config_name:config_name});
}


module.exports = {
    insertOrUpdate:insertOrUpdate,
    getConfigByName:getConfigByName
};