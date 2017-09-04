import {t1,t2,t3,t4,t5} from './TopicsView.shtml';
import Dialog,{openTips} from '../../components/Dialog/Dialog';
import TopicApis from '../../apis/TopicApis';
import compileMarkdown from '../../utils/compileMarkdown';
import './TopicsView.less';

var TopicsItemView = {
    template: t2,
    props: ['topic'],
    data: function () {
        return {};
    }
};

var TopicViewDialog = new Dialog(function (params) {
    return {
        template: t3,
        data: function () {
            return {
                params_text: params.text,
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
    };
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

        doQueryTopicList: function () {
            var that = this;
            var {topicListPageSize,topicListCur} = that;
            TopicApis.getTopicsList(topicListCur, topicListPageSize).then((d)=> {
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
            topicListPageSize: 10,
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
            topicObject: null
        };
    },
    created: function () {
        var that = this;
        var $route = this.$route;
        var id = $route.params.id;
        TopicApis.getTopicById(id).then((d)=> {
            that.topicObject = d.result[0];
            that.topicObject.contentMarked = compileMarkdown(that.topicObject.content);
        });
    }
};


function createTopicCreateUpdateView(isCreate) {

    return {
        template: t5,
        data: function () {
            return {
                topicObject: {
                    title: '',
                    content: '',
                    description: '',
                    cover_img:null
                },

                isSubmitting: false
            }
        },
        computed: {
            compiledMarkdown: function () {
                var topicObject = this.topicObject || {};
                var mmm = topicObject.content || "";
                return compileMarkdown(mmm)
            }
        },
        methods: {


            handleUploaded:function(obj){
                this.topicObject.cover_img = obj.url;
            },


            handleSubmitTopic: function () {

                var that = this;
                var obj = this.topicObject;
                if (isCreate) {
                    //创新新文章

                    that.isSubmitting = true;
                    TopicApis.postTopic(obj).then((res)=> {
                        that.isSubmitting = false;
                        var insertId = res.result.insertId;
                        openTips("发表成功");
                        that.$router.push(`/topic/${insertId}`)
                    });

                } else {

                    //更新文章

                    var $route = this.$route;
                    var id = $route.params.id;
                    that.isSubmitting = true;
                    TopicApis.putTopic(id, obj).then((res)=> {
                        that.isSubmitting = false;
                        openTips("更新成功");
                        that.$router.push(`/topic/${id}`)
                    });

                }

            },

            updateContent: _.debounce(function (e) {
                this.topicObject.content = e.target.value
            }, 300)

        },
        created: function () {

            var that = this;
            var $route = this.$route;

            if (!isCreate) {
                var id = $route.params.id;
                TopicApis.getTopicById(id).then((d)=> {
                    that.topicObject = d.result[0];
                });
            }
        }
    };
}


module.exports = {
    TopicsView: TopicsView,
    TopicSingleView: TopicSingleView,
    TopicCreateView: createTopicCreateUpdateView(true),
    TopicUpdateView: createTopicCreateUpdateView(false)
};