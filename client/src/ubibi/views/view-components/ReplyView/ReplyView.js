import './ReplyView.less';
import TopicApis from '../../../apis/TopicApis';
import UserStore from '../../../apis/UserStore';
import {openTips} from '../../../components/Dialog/Dialog';
import trimString from '../../../../_commons/trimString';
import {ReplyViewTemplate} from './ReplyView.shtml';


Vue.component('bsv-reply', {
    props: ['fid', 'ftype'],
    template: ReplyViewTemplate,
    data: function () {
        return {
            createMsg: '',
            page_size: 20,
            page_no: 1,
            replyList: [],
            replyListCount: 0,
            isReplying: false,
            isInit:false
        }
    },
    created: function () {
        var that = this;
        that.doLoadReplyList(function(){
            that.isInit = true;
        });
    },
    methods: {
        doLoadReplyList: function (callback) {
            var that = this;
            var {fid,ftype} = that;
            var {page_size,page_no} = that;

            if (ftype === 'topic_reply') {
                var topic_id = fid;
                TopicApis.getReplyOfTopic(topic_id, page_size, page_no).then((d)=> {
                    that.replyList = d.data_list;
                    that.replyListCount = d.total_count;
                    callback && callback(d);
                });
            }
        },

        onReply: function () {
            var that = this;

            if (that.isReplying) {
                return;
            }

            var createMsg = trimString(that.createMsg);
            if (createMsg.length === 0) {
                return;
            }

            var {fid,ftype} = that;
            var promise = Promise.resolve();

            that.isReplying = true;
            if (ftype === 'topic_reply') {
                promise = TopicApis.postReply({topic_id: fid, content: that.createMsg});
            }

            promise.then((d)=> {
                setTimeout(function(){
                    that.isReplying = false;
                },500);

                if (d.errorCode) {
                    openTips(d.msg);
                    return;
                }
                that.createMsg = '';
                that.doLoadReplyList();
                openTips("回复成功");
            }, ()=> {
                that.isReplying = false;
                openTips("系统错误");
            });

        }
    }
});