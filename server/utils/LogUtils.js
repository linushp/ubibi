var formatDate = require('rebix-utils/formatDate');

module.exports = {
    info:function(msg){
        console.log(formatDate(new Date(),"YYYY-MM-DD hh:mm:ss") ," : "  ,msg);
    }
};