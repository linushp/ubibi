import AjaxUtils from '../../_commons/AjaxUtils';
import {openTips} from '../components/Dialog/Dialog';

var parseDataListTotalCount = function(a,b,c){
    return AjaxUtils.parseDataListTotalCount(a,b,c);
};


var displayErrorInfo = function(d){
    if (d.errorCode) {
        openTips(d.msg);
        return;
    }
    return d;
};

export default {

    getTopicsList(page_no, page_size, category_id, is_top, topic_type, order_by, order_by_type){


        var queryString = AjaxUtils.toQueryString({
            page_no,
            page_size,
            category_id,
            is_top,
            topic_type,
            order_by,
            order_by_type
        });

        return AjaxUtils.sendGetJSONRequest(`/api/v1/ubibi/topics?${queryString}`);
    },


    getTopicById(topic_id){
        return AjaxUtils.sendGetJSONRequest(`/api/v1/ubibi/topic/${topic_id}`);
    },


    postTopic(topicObject){
        return AjaxUtils.sendPostJSONRequest('/api/v1/ubibi/topic', topicObject).then(displayErrorInfo);
    },


    putTopic(topic_id, topicObject){
        return AjaxUtils.sendPutJSONRequest(`/api/v1/ubibi/topic/${topic_id}`, topicObject).then(displayErrorInfo);
    },

    deleteTopic(topic_id){
        return AjaxUtils.sendDeleteJSONRequest(`/api/v1/ubibi/topic/${topic_id}`).then(displayErrorInfo);
    },

    getTopicCategorySubject(){
        return AjaxUtils.sendGetJSONRequest(`/api/v1/ubibi/topic_category_subject?clear_cache=true`,3600);
    },

    getReplyOfTopic(topic_id, page_size, page_no){
        var queryString = AjaxUtils.toQueryString({
            page_no,
            page_size
        });
        return AjaxUtils.sendGetJSONRequest(`/api/v1/ubibi/reply/${topic_id}?${queryString}`).then(parseDataListTotalCount);
    },


    postReply(replyObject){
        return AjaxUtils.sendPostJSONRequest('/api/v1/ubibi/reply', replyObject).then(function(d){
            return d;
        });
    }


};


