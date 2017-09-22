var SqlQueryUtils = require('../utils/SqlQueryUtils');
var models = require('./model/models');

var NavCategoryModel = models.NavCategoryModel;
var NavItemModel = models.NavItemModel;

async function getNavList() {

    var categoryResult = await SqlQueryUtils.doQueryAsync({sql: "select * from  " + NavCategoryModel.tableName + " order by id desc"});
    var itemResult = await SqlQueryUtils.doQueryAsync({sql: "select * from  " + NavItemModel.tableName + " order by id desc" });

    var categoryList = categoryResult.result || [];
    var itemList = itemResult.result || [];

    var categoryMap = {};
    for (var i = 0; i < categoryList.length; i++) {
        var category = categoryList[i];
        category.children = [];
        var category_id = category.id;
        categoryMap[category_id] = category;
    }


    for (var j = 0; j < itemList.length; j++) {
        var item = itemList[j];
        var item_cid = item.cid;
        var category0 = categoryMap[item_cid];
        if (category0) {
            category0.children.push(item);
        }
    }

    return categoryList;
}



function createNavItem(navItemObject) {
    return SqlQueryUtils.doInsertByModelAsync(NavItemModel, navItemObject);
}


module.exports = {
    getNavList: getNavList,
    createNavItem: createNavItem
};