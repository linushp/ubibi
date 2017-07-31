import {installStateLessComponent} from '../utils/PureVueComponent';

var StateLessComponent = require('./StateLessComponent/StateLessComponent.shtml');
import './StateLessComponent/StateLessComponent.less';

import './Dialog/Dialog';
import './Pagination/Pagination';
import './uploader/uploader';
import './directives/directives';

installStateLessComponent(StateLessComponent);

export default 'ok';