import * as HomeViewTemplate from './HomeView.shtml';
import './HomeView.less';


function createTopic(text,img){

    if(img.indexOf('.')===-1){
        img = img + ".jpeg";
    }

    return {
        text:text,
        img:"/static/images/uis/home/"+img
    };
}

var HomeView = {
    template: HomeViewTemplate['HomeViewTemplate'],
    data: function () {
        return {
            hotTopics:[
                [createTopic("JavaScript",'001'),createTopic("JavaScript",'002.jpg')],
                [createTopic("JavaScript",'003.jpg'),createTopic("JavaScript",'004.jpg'),createTopic("JavaScript",'005.jpg')],
                [createTopic("JavaScript",'006.jpg'),createTopic("JavaScript",'007.jpg'),createTopic("JavaScript",'008.jpg')],
                [createTopic("JavaScript",'009'),createTopic("JavaScript",'010')]
            ]

        };
    },
    methods:{
    },
    created: function () {

    }
};


export default HomeView;