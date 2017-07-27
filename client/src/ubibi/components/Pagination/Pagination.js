import './Pagination.less';
import template from './Pagination.shtml';

Vue.component("bs-pagination",{
    template:template,
    props:['current','pageSize','totalCount'],
    data: function () {
        return {
            showItem: 5
        }
    },
    computed: {
        allpage:function(){
            var totalCount = parseInt(this.totalCount);
            var pageSize = parseInt(this.pageSize);
            var pageCount = Math.ceil(totalCount/pageSize);
            return pageCount;
        },
        pages: function () {
            var totalCount = parseInt(this.totalCount);
            var pageSize = parseInt(this.pageSize);
            var pageCount = Math.ceil(totalCount/pageSize);

            var current = parseInt(this.current);
            var pag = [];
            if (current < this.showItem) {
                var i = Math.min(this.showItem, pageCount);
                while (i) {
                    pag.unshift(i--);
                }
            } else { //当前页数大于显示页数了
                var middle = current - Math.floor(this.showItem / 2);
                i = this.showItem;
                if (middle > (pageCount - this.showItem)) {
                    middle = (pageCount - this.showItem) + 1
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag
        }
    },
    methods: {
        goto: function (index) {
            var current = parseInt(this.current);
            if (index == current){
                return;
            }
            this.$emit('page',index);
            //this.current = index;
            //这里可以发送ajax请求
        }
    }
});