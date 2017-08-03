import formatDateTime from '../../../_commons/formatDateTime';

Vue.filter("formatTime",function(aa,format){

    format = format || 'YYYY-MM-DD hh:mm:ss';

    var number0 = parseInt(aa,10);
    var date0 = new Date(number0);
    return formatDateTime(date0,format);
});