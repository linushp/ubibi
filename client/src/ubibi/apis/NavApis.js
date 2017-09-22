import AjaxUtils from '../../_commons/AjaxUtils';

export default {

    getNavList(){
        return AjaxUtils.sendGetJSONRequest(`/api/v1/ubibi/nav/getNavList`);
    },


    createNavItem(navItemObject){
        return AjaxUtils.sendPostJSONRequest('/api/v1/ubibi/nav/createNavItem', {
            title: navItemObject.title,
            description: navItemObject.description,
            url: navItemObject.url,
            cid: navItemObject.cid
        });
    }


};