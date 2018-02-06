var SqlQueryUtils = require('../utils/SqlQueryUtils');
var models = require('./model/models');


var SpiderShopInfoModel = models.SpiderShopInfoModel;





function createSpiderShopInfo(shopInfoModel) {
    return SqlQueryUtils.doInsertByModelAsync(SpiderShopInfoModel, shopInfoModel);
}


module.exports = {
    createSpiderShopInfo:createSpiderShopInfo
};