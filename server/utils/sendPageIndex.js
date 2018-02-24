var path = require('path');

module.exports = function(res, name, data) {
    data = data || {};
    var mm = path.join(__dirname, '../../static/pages/'+ name + "/index.html");
    res.render(mm,data);
};