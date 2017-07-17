
import {t1,t2} from './TopicsView.shtml';
import './TopicsView.less';

var TopicsItemView = {
    template: t2,
    props:['topic'],
    data: function () {
        return {

        };
    }
};

var TopicsView = {
    template: t1,
    components:{
        TopicsItemView:TopicsItemView
    },
    data: function () {
        return {
            topicList: [{},{},{},{},{},{},{}]
        };
    }
};


var TopicView = {

};


module.exports = {
    TopicsView:TopicsView,
    TopicView:TopicView
};