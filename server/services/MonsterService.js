var SqlQueryUtils = require('../utils/SqlQueryUtils');


var MonsterItemModel = {
    tableName: 'm_monster_item',
    tableFields: [
        'id',
        'name',
        'dai',
        'yaoli',
        'fid',
        'mid',
        'create_time',
        'update_time'
    ]
};


async function insertMonsterItem(itemObject) {
    return SqlQueryUtils.doInsertByModelAsync(MonsterItemModel, itemObject);
}


async function insertOrUpdate(itemObject) {
    var id = itemObject['id'];
    var mm = await SqlQueryUtils.doQueryByIdAsync(MonsterItemModel,id);

    if(mm){
        return SqlQueryUtils.doUpdateByModelAsync(MonsterItemModel,itemObject,id);
    }else {
        return SqlQueryUtils.doInsertByModelAsync(MonsterItemModel,itemObject);
    }
}


async function getTop100RankList() {
    return await SqlQueryUtils.doQueryCacheAsync({
         sql: "select * from  " + MonsterItemModel.tableName + " order by yaoli desc limit 0,100"
    },"MonsterService_getTop100RankList",3600);
}


module.exports = {
    insertOrUpdate:insertOrUpdate,
    getTop100RankList:getTop100RankList
};

