import AjaxUtils from '../../_commons/AjaxUtils';


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
        return AjaxUtils.sendPostJSONRequest('/api/v1/ubibi/topic', topicObject);
    },


    putTopic(topic_id, topicObject){
        return AjaxUtils.sendPutJSONRequest(`/api/v1/ubibi/topic/${topic_id}`, topicObject);
    },


    deleteTopic(topic_id){
        return AjaxUtils.sendDeleteJSONRequest(`/api/v1/ubibi/topic/${topic_id}`);
    },


    getTopicCategorySubject(clear_cache){
        return AjaxUtils.sendGetJSONRequest(`/api/v1/ubibi/topic_category_subject?clear_cache=${clear_cache}`)
    },


    getReplyOfTopic(topic_id, page_size, page_no){
        var queryString = AjaxUtils.toQueryString({
            page_no,
            page_size
        });
        return AjaxUtils.sendGetJSONRequest(`/api/v1/ubibi/reply/${topic_id}?${queryString}`);
    },


    postReply(replyObject){
        return AjaxUtils.sendPostJSONRequest('/api/v1/ubibi/reply', replyObject);
    }


};


