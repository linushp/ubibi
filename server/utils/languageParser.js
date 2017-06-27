var supportLanguageList = ['en', 'zh', 'ar'];

function getBrowserLanguage(req, defaultLanguage) {

    var clientLanguages = req.headers['accept-language'] || '';
    var clientLanguageArray = clientLanguages.split(',') || [];
    var clientLanguage0 = (clientLanguageArray[0] || '').toLowerCase();

    for (var i = 0; i < supportLanguageList.length; i++) {
        var langName = supportLanguageList[i];
        if (clientLanguage0.indexOf(langName) === 0) {
            return langName;
        }
    }

    return defaultLanguage;
}



function isSupportLanguage(languageName) {
    for (var i = 0; i < supportLanguageList.length; i++) {
        var obj = supportLanguageList[i];
        if (obj === languageName) {
            return true;
        }
    }
    return false;
}




module.exports = function (paramName, defaultLanguage) {

    function setReqLanguageAttribute(req, language) {
        req[paramName] = language;
    }

    return function (req, res, next) {

        var language = defaultLanguage;

        //1.浏览器参数 siteLanguage
        var queryLanguage = req.query[paramName];
        if (isSupportLanguage(queryLanguage)) {
            language = queryLanguage;
            res.cookie(paramName, language, {expires: new Date(Date.now() + 1000 * 3600 * 24 * 366)});
            setReqLanguageAttribute(req, language);
            next();
            return;
        }


        //2.Cookie参数 siteLanguage
        var cookies = req.cookies || {};
        var cookieLanguage = cookies[paramName];
        if (isSupportLanguage(cookieLanguage)) {
            language = cookieLanguage;
            setReqLanguageAttribute(req, language);
            next();
            return;
        }


        //3.浏览器 accept-language
        language = getBrowserLanguage(req, defaultLanguage);
        setReqLanguageAttribute(req, language);
        next();
    };
};