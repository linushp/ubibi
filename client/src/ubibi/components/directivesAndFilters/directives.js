Vue.directive("cdn",{
    bind: function (el) {
        var src = el.getAttribute('src');
        var server_vars_static_host = window.server_vars_static_host;
        if(src.indexOf('/static/')===0 && server_vars_static_host){
            src = server_vars_static_host + src;
        }
        el.setAttribute("src",src);
    }
});