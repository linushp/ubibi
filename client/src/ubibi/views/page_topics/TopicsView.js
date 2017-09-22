import * as tpl from './TopicsView.shtml';
import Dialog,{openTips} from '../../components/Dialog/Dialog';
import TopicApis from '../../apis/TopicApis';
import connectMyUserInfo from '../helpers/connectMyUserInfo';
import compileMarkdown from '../../utils/compileMarkdown';
import parseAuthorInfo from '../../utils/parseAuthorInfo';
import './TopicsView.less';


/**
 * 1.列表页面
 * @type {*}
 */
var TopicsView = connectMyUserInfo({
    template: tpl.TopicsView,
    beforeRouteUpdate: function (to, from, next) {
        next();
        var that = this;
        setTimeout(function () {
            that.initPage();
        }, 10);
    },
    methods: {

        onDelete: function (topic) {

        },

        onUpdate: function (topic) {

        },

        onPageChange: function (nextCur) {
            var path = this.$route.path;
            var topicListPageSize = this.topicListPageSize;
            this.$router.push(path + "?page_size=" + topicListPageSize + "&page_no=" + nextCur);
        },
        doQueryTopicList: function () {
            var that = this;
            var {topicListPageSize,topicListCur} = that;
            if (!topicListCur || parseInt(topicListCur) <= 0) {
                topicListCur = 1;
            }
            var categoryCid = that.categoryCid;

            if(parseInt(categoryCid)===0){
                categoryCid = undefined;
            }

            TopicApis.getTopicsList(topicListCur, topicListPageSize,categoryCid).then((d)=> {
                that.topicList = parseAuthorInfo(d.dataList.result || [], {
                    nickname: '未知',
                    avatar: "/static/images/tmpimg/aaaa.png"
                });
                that.topicListTotal = d.totalCount.result[0]['total_count'];
                that.isInited = true;
            });
        },
        doQueryTopicCategorySubject: function () {
            var that = this;
            TopicApis.getTopicCategorySubject().then((d)=> {
                that.categoryList = [{
                    id: "0",
                    title: "全部"
                }].concat(d[0].result || []);
            });
        },

        initPage(){
            var that = this;
            var params = that.$route.params;
            var query = that.$route.query;
            that.isInited = false;
            that.categoryCid = params.cid || 0;
            that.topicListCur = query.page_no || 1;
            that.topicListPageSize = query.page_size || 20;
            that.doQueryTopicList();
            that.doQueryTopicCategorySubject();
        }
    },
    created: function () {
        this.initPage();
    },
    data: function () {
        return {
            isInited:false,
            categoryCid: 0,
            categoryList: [],
            topicListPageSize: 20,
            topicListTotal: 0,
            topicListCur: 1,
            topicList: []
        };
    }
});


/**
 *
 *
 * 2.文章内容查看页面
 * @type {*}
 */
var TopicSingleView = connectMyUserInfo({
    template: tpl.TopicSingleView,
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
});


/**
 *
 *
 *
 * 3. 新建或修改页面
 * @param isCreate
 * @returns {*}
 *
 *
 *
 */
function createTopicCreateUpdateView(isCreate) {

    return connectMyUserInfo({
        template: tpl.TopicCreateView,
        data: function () {
            return {
                topicObject: {
                    title: '',
                    content: '',
                    description: '',
                    cover_img: null,
                    category_id: 0
                },
                categoryList: [],
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


            handleUploaded: function (obj) {
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


            TopicApis.getTopicCategorySubject().then((d)=> {
                that.categoryList = d[0].result || [];
                if (!isCreate) {
                    var id = $route.params.id;
                    TopicApis.getTopicById(id).then((d)=> {
                        that.topicObject = d.result[0];
                    });
                }
            });
        }
    });
}


module.exports = {
    TopicsView: TopicsView,
    TopicSingleView: TopicSingleView,
    TopicCreateView: createTopicCreateUpdateView(true),
    TopicUpdateView: createTopicCreateUpdateView(false)
};