import * as TopBannerImageTemplate from './TopBannerImage.shtml';
import './TopBannerImage.less';

Vue.component('bs-topbannerimage', {
    props:['className'],
    template: TopBannerImageTemplate['TopBannerImageTemplate'],
    data: function () {
        return {
            topBannerIndex:0,
            imgArray:[
                "https://static.lagou.com/i/proimage/M00/00/79/CgpvS1gpnuaAHXrqAAI9GDLmaic770.jpg",
                "https://static.lagou.com/i/proimage/M00/00/79/CgpvS1gpntmAdFB_AAI26s4nE-A071.jpg",
                "https://static.lagou.com/i/proimage/M00/00/79/CgpnS1gpnuCAA7QKAAEzsv25cXo283.jpg"
            ]
        };
    },
    methods:{
        topBannerSwitch:function(){
            var that = this;
            window.setInterval(function(){
                var topBannerIndex = that.topBannerIndex;
                topBannerIndex++;
                if(topBannerIndex>=3){
                    topBannerIndex = 0;
                }
                that.topBannerIndex = topBannerIndex;
            },5000);
        }
    },
    created: function () {
        this.topBannerSwitch();
    }
});