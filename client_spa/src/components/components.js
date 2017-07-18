import {installStateLessComponent} from '../utils/PureVueComponent';

var StateLessComponent = require('./StateLessComponent/StateLessComponent.shtml');
import './StateLessComponent/StateLessComponent.less';

import './Dialog/Dialog';

installStateLessComponent(StateLessComponent);

export default 'ok';