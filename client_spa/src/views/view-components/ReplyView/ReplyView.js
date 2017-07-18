import './ReplyView.less';
import {ReplyViewTemplate} from './ReplyView.shtml';


Vue.component('bsv-reply', {
    template: ReplyViewTemplate,
    data: function () {
        return {
            createMsg: '',
            replyList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        }
    },
    methods: {
        onReply: function () {
            debugger;
        }
    }
});