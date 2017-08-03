import {t1,t2,t3,t4,t5} from './TopicsView.shtml';
import Dialog from '../../components/Dialog/Dialog';
import TopicApis from '../../apis/TopicApis';
import './TopicsView.less';

var TopicsItemView = {
    template: t2,
    props: ['topic'],
    data: function () {
        return {};
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
        beforeClose: function () {
            //debugger;
        },
        afterClose: function () {
            //debugger;
        }
    }
});

var TopicsView = {
    template: t1,
    components: {
        TopicsItemView: TopicsItemView
    },
    methods: {
        openDialog: function () {
            TopicViewDialog.openDialog();
        },
        onPageChange: function (nextCur) {
            this.topicListCur = nextCur;
            this.doQueryTopicList();
        },

        doQueryTopicList:function(){
            var that = this;
            var {topicListPageSize,topicListCur} = that;
            TopicApis.getTopicsList(topicListCur,topicListPageSize).then((d)=> {
                that.topicList = d.dataList.result;
                that.topicListTotal = d.totalCount.result[0]['total_count'];
            });
        }
    },
    created: function () {
        this.doQueryTopicList();
    },
    data: function () {
        return {
            topicListPageSize:10,
            topicListTotal: 0,
            topicListCur: 1,
            topicList: []
        };
    }
};


var TopicSingleView = {
    template: t4,
    data: function () {
        return {
            topicObject:{}
        };
    },
    created:function(){
        var that = this;
        var $route = this.$route;
        var id = $route.params.id;
        TopicApis.getTopicById(id).then((d)=>{
            that.topicObject  = d.result[0];
        });
    }
};


var TopicCreateView = {
    template: t5,
    data: function () {
        return {
            topicObject:{
                title:'',
                content:'',
                description:''
            }
        }
    },
    methods:{
        handleSubmitTopic:function(){
            var obj = this.topicObject;
            TopicApis.postTopic(obj);
        }
    }
};


var TopicUpdateView = {
    template: t5,
    data: function () {
        return {
            topicObject:{}
        };
    },
    methods:{
        handleSubmitTopic:function(){
            var that = this;
            var $route = this.$route;
            var id = $route.params.id;
            var obj = this.topicObject;
            TopicApis.putTopic(id, obj);
        }
    },
    created:function(){
        var that = this;
        var $route = this.$route;
        var id = $route.params.id;
        TopicApis.getTopicById(id).then((d)=>{
            that.topicObject  = d.result[0];
        });
    }
};


module.exports = {
    TopicsView: TopicsView,
    TopicSingleView: TopicSingleView,
    TopicCreateView: TopicCreateView,
    TopicUpdateView: TopicUpdateView
};