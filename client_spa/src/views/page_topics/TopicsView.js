
import {t1,t2,t3,t4,t5,t6} from './TopicsView.shtml';
import Dialog from '../../components/Dialog/Dialog';
import './TopicsView.less';

var TopicsItemView = {
    template: t2,
    props:['topic'],
    data: function () {
        return {

        };
    }
};

var TopicViewDialog = new Dialog({
    template: t3,
    data: function () {
        return {
            data: new Date().getTime()
        }
    },
    dialog: {
        className: 'TopicViewDialog',
        beforeClose:function(){
            //debugger;
        },
        afterClose:function(){
            //debugger;
        }
    }
});

var TopicsView = {
    template: t1,
    components:{
        TopicsItemView:TopicsItemView
    },
    methods: {
        openDialog: function () {
            TopicViewDialog.openDialog();
        },
        onPageChange:function(nextCur){
            this.currentPage = nextCur;
        }
    },
    data: function () {
        return {
            currentPage:1,
            topicList: [{id:1},{id:2,img:true},{id:3},{id:4,img:true},{id:5}]
        };
    }
};


var TopicSingleView = {
    template:t4,
    data:function(){
        return {

        };
    }
};


var TopicCreateView = {
    template:t5,
};



var TopicUpdateView = {
    template:t6,
};


module.exports = {
    TopicsView:TopicsView,
    TopicSingleView:TopicSingleView,
    TopicCreateView:TopicCreateView,
    TopicUpdateView:TopicUpdateView
};