import './AppView.less';

import {AppHeaderTemplate,AppRootTemplate} from './AppView.shtml';

var AppHeader = {
    template: AppHeaderTemplate
};


var AppView = {
    template: AppRootTemplate,
    components: {
        'app-header': AppHeader
    }
};

export default AppView;