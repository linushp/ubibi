import './AppView.less';

import {AppHeaderTemplate,AppRootTemplate,AppFooterTemplate} from './AppView.shtml';

var AppHeader = {
    template: AppHeaderTemplate
};

var AppFooter = {
    template:AppFooterTemplate
};


var AppView = {
    template: AppRootTemplate,
    components: {
        'app-header': AppHeader,
        'app-footer': AppFooter
    }
};

export default AppView;