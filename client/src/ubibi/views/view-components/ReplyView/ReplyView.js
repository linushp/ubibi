import './ReplyView.less';
import TopicApis from '../../../apis/TopicApis';
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
            replyListCount: 0
        }
    },
    created: function () {
        this.doLoadReplyList();
    },
    methods: {

        doLoadReplyList: function () {
            var that = this;
            var {fid,ftype} = that;
            var {page_size,page_no} = that;
            if (ftype === 'topic_reply') {
                var topic_id = fid;
                TopicApis.getReplyOfTopic(topic_id, page_size, page_no).then((d)=> {
                    that.replyList = d.data_list;
                    that.replyListCount = d.total_count;
                });
            }
        },

        onReply: function () {
            var that = this;

            var createMsg = trimString(that.createMsg);
            if(createMsg.length===0){
                return;
            }

            var {fid,ftype} = that;
            var promise = Promise.resolve();
            if (ftype === 'topic_reply') {
                promise = TopicApis.postReply({topic_id: fid, content: that.createMsg});
            }
            promise.then(()=> {
                that.createMsg = '';
                that.doLoadReplyList();
            });
        }
    }
});