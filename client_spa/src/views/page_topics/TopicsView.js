
import {t1,t2,t3} from './TopicsView.shtml';
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
        }
    },
    data: function () {
        return {
            topicList: [{}]
        };
    }
};


var TopicView = {

};




module.exports = {
    TopicsView:TopicsView,
    TopicView:TopicView
};