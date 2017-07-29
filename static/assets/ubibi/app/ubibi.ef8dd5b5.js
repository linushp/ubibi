!function(e){function t(a){if(i[a])return i[a].exports;var s=i[a]={i:a,l:!1,exports:{}};return e[a].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var i={};t.m=e,t.c=i,t.d=function(e,i,a){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,i){"use strict";function a(){}function s(e,t){return Object.prototype.toString.call(e)==="[object "+t+"]"}function n(e){return!!(s(e,"Object")&&s(e.then,"Function")&&s(e.catch,"Function"))}function o(e){var t=(new e).$mount(),i=function(){t.isDialogOpen=!1,document.body.removeChild(t.$el),setTimeout(function(){t.$destroy()},1)};return t.$on(d,i),document.body.appendChild(t.$el),t.isDialogOpen=!0,t}function r(e){var t=e.dialog||{},i=t.beforeClose||a,s=t.afterClose||a,o=e.methods||{};o.onCloseDialog=function(e){var t=this;i=i.bind(t),s=s.bind(t);var a=i(e);n(a)?a.then(function(i){!1!==a&&(t.$emit(d,e),s(e))}):!1!==a&&(t.$emit(d,e),s(e))};var r=t.className||"",c='<bs-dialog @close="onCloseDialog" className="'+r+'" >'+e.template+"</bs-dialog>";return e.template=c,e.methods=o,Vue.extend(e)}function c(e){var t=r(e);this.openDialog=function(){return o(t)}}function l(e,t){var i=v.openDialog();i.message=e,i.title=t}Object.defineProperty(t,"__esModule",{value:!0}),t.openAlert=l;var p=i(9);i(10);var d="close",u=1e3;Vue.component("bs-dialog",{props:["className"],template:p.DialogTemplate,methods:{onCloseDialog:function(e){this.$emit(d,{type:e})}},data:function(){return u+=1,{zIndex:u,zMaskIndex:u-1}}});var v=new c({template:p.AlertDialogTemplate,data:function(){return{title:"",message:""}}});t.default=c},function(e,t,i){"use strict";var a=i(2),s=(function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);t.default=e}(a),i(3)),n=function(e){return e&&e.__esModule?e:{default:e}}(s);i(6),i(18);var o=i(22),r=i(25);i(28);var c=new VueRouter({mode:"hash",routes:[{path:"/",redirect:"/topics",component:n.default,children:[{path:"/topics",component:r.TopicsView},{path:"/topic",redirect:"/topics"},{path:"/topic/create",component:r.TopicCreateView},{path:"/topic/update",component:r.TopicUpdateView},{path:"/topic/:id",component:r.TopicSingleView},{path:"/user/create",component:o.UserCreateComponent},{path:"/user/login",component:o.UserLoginComponent}]}]}),l=new Vue({el:"#mainBody",router:c});window.ubibiApp=l,t.app=l},function(e,t,i){"use strict";function a(e,t,i,a,s){return new Promise(function(n,o){var r=new XMLHttpRequest;r.open(e,t,!0),r.responseType=s||"text";"form"===a&&r.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),"json"===a&&r.setRequestHeader("Content-Type","application/json;charset=UTF-8"),r.onreadystatechange=function(){if(4==r.readyState)if(r.status>=200&&r.status<300||304==r.status){var e=r.responseText;n(e)}else o(r.status)},i?r.send(i):r.send()})}function s(e){return JSON.parse(e)}function n(e,t){return t&&l[e]&&l[e].timeStamp+864e5<(new Date).getTime()?Promise.resolve(l[e].data):a("GET",e).then(function(i){return t&&(l[e]={data:i,timeStamp:(new Date).getTime()}),i})}function o(e,t){return n(e,t).then(s)}function r(e,t,i){return a("POST",e,t,i)}function c(e,t){return r(e,JSON.stringify(t),"json").then(s)}var l={};e.exports={sendXmlHttpRequest:a,sendGetRequest:n,sendGetJSONRequest:o,sendPostRequest:r,sendPostJSONRequest:c}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),i(4);var a=i(5),s={template:a.AppHeaderTemplate},n={template:a.AppRootTemplate,components:{"app-header":s}};t.default=n},function(e,t){},function(e,t){e.exports={AppRootTemplate:'<div class="app-root"> <app-header /> <router-view/> </div>',AppHeaderTemplate:'<div class="app-header"> <div class="nav"> <div class="nav-right"> <router-link class="login-link" to="/user/login">登录</router-link> <router-link class="login-link" to="/user/create">注册</router-link> </div> </div> </div>'}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(7);i(8),i(0),i(11),i(14);var s=i(17);(0,a.installStateLessComponent)(s),t.default="ok"},function(e,t,i){"use strict";function a(e){for(var t in e)if(e.hasOwnProperty(t)){var i=e[t];if("string"==typeof i)Vue.component(t,{template:i});else{var a=i.content,s=i.propsMap,n=s.props||"",o=n.split(",");Vue.component(t,{template:a,props:o,methods:{onClick:function(e){this.$emit("click",e)}}})}}}Object.defineProperty(t,"__esModule",{value:!0}),t.installStateLessComponent=a},function(e,t){},function(e,t){e.exports={DialogTemplate:'<div class="bs-dialog-wrapper"> <div class="bs-dialog" :class="className" :style=\'{"z-index":zIndex}\'> <div class="bs-dialog-header"> <div class="bs-dialog-title"><slot name="title"/></div> <span @click="onCloseDialog(0)"></span> </div> <div class="bs-dialog-body"> <slot name="body"/> </div> <div class="bs-dialog-footer"> <i class="bs-button bs-button-cancel" @click="onCloseDialog(0)">取消</i> <i class="bs-button bs-button-ok" @click="onCloseDialog(1)">确定</i> </div> </div> <div class="bs-dialog-mask" :style=\'{"z-index":zMaskIndex}\'></div> </div>',AlertDialogTemplate:"<div slot='title'>{{title}}</div> <div slot='body'>{{message}}</div>"}},function(e,t){},function(e,t,i){"use strict";i(12);var a=i(13),s=function(e){return e&&e.__esModule?e:{default:e}}(a);Vue.component("bs-pagination",{template:s.default,props:["current","pageSize","totalCount"],data:function(){return{showItem:5}},computed:{allpage:function(){var e=parseInt(this.totalCount),t=parseInt(this.pageSize);return Math.ceil(e/t)},pages:function(){var e=parseInt(this.totalCount),t=parseInt(this.pageSize),i=Math.ceil(e/t),a=parseInt(this.current),s=[];if(a<this.showItem)for(var n=Math.min(this.showItem,i);n;)s.unshift(n--);else{var o=a-Math.floor(this.showItem/2);for(n=this.showItem,o>i-this.showItem&&(o=i-this.showItem+1);n--;)s.push(o++)}return s}},methods:{goto:function(e){e!=parseInt(this.current)&&this.$emit("page",e)}}})},function(e,t){},function(e,t){e.exports='<ul class="bs-pagination" > <li v-show="current != 1" @click="goto(current-1)" ><span>上一页</span></li> <li v-for="idx in pages" @click="goto(idx)" :class="{\'bs-pagination-active\':current == idx}" :key="idx"> <span>{{idx}}</span> </li> <li v-show="allpage != current && allpage != 0 " @click="goto(current+1)"><span>下一页</span></li></ul>'},function(e,t,i){"use strict";i(15);var a=i(16);Vue.component("bs-upload-button",{props:["className"],template:a.t1})},function(e,t){},function(e,t){e.exports={t1:'<div class="bs-upload bs-upload-button" :class="className"> <input type="file" /> <bs-button title="文件上传" theme="ok" /> </div>'}},function(e,t){e.exports={"bs-card":{content:'<div class="bs-card" :class="className"> <div class="bs-card-ms"> <div class="bs-card-title" v-if="title&&title.length>0">{{title}}</div> <slot /> </div> </div>',propsMap:{id:"bs-card",props:"className,title"},propsLength:2,firstProp:"id"},"bs-button":{content:'<div @click="onClick()" class="bs-button" :class="(className||\'\') + \' bs-button-\'+theme ">{{title}}</div>',propsMap:{id:"bs-button",props:"className,title,theme"},propsLength:2,firstProp:"id"}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),i(19),t.default="ok"},function(e,t,i){"use strict";i(20);var a=i(21);Vue.component("bsv-reply",{template:a.ReplyViewTemplate,data:function(){return{createMsg:"",replyList:[{},{},{},{},{},{},{},{},{},{}]}},methods:{onReply:function(){}}})},function(e,t){},function(e,t){e.exports={ReplyViewTemplate:'<div class="ReplyView"> <div class="ReplyCreate"> <textarea v-model="createMsg" placeholder="说些什么..."/> <div class="clear"></div> <bs-button title="提交回复" theme="ok" @click="onReply()"/> </div> <div class="ReplyItem" v-for="replyItem in replyList"> <div class="reply-avatar"> <img src="/static/images/tmpimg/aaaa.png"/> </div> <div class="reply-content"> <div class="line1"> <span class="nickname">栾海鹏</span> <span class="floorNumber">1楼</span> <span class="createtime">2017年07月18日19:55</span> </div> <div class="line2"> 咱都是开发就你上空间大非农看就 </div> </div> </div> <div class="ReplyLoad">加载更多回复...</div> </div>'}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UserLoginComponent=t.UserCreateComponent=void 0;var a=i(23);i(24);t.UserCreateComponent={template:a.UserCreateTemplate,data:function(){return{regType:"email"}}},t.UserLoginComponent={template:a.UserLoginTemplate,data:function(){return{regType:"email"}}}},function(e,t){e.exports={UserCreateTemplate:'<div class="user-create"> <div class=""> <div @click="regType=\'email\'" :class="{regTypeCurrent:regType==\'email\'}">邮箱注册</div> <div @click="regType=\'mobile\'" :class="{regTypeCurrent:regType==\'mobile\'}">手机注册</div> </div> </div>',UserLoginTemplate:'<div class="user-login"> user login </div>'}},function(e,t){},function(e,t,i){"use strict";var a=i(26),s=i(0),n=function(e){return e&&e.__esModule?e:{default:e}}(s);i(27);var o={template:a.t2,props:["topic"],data:function(){return{}}},r=new n.default({template:a.t3,data:function(){return{data:(new Date).getTime()}},dialog:{className:"TopicViewDialog",beforeClose:function(){},afterClose:function(){}}}),c={template:a.t1,components:{TopicsItemView:o},methods:{openDialog:function(){r.openDialog()},onPageChange:function(e){this.currentPage=e}},data:function(){return{currentPage:1,topicList:[{id:1},{id:2,img:!0},{id:3},{id:4,img:!0},{id:5}]}}},l={template:a.t4,data:function(){return{}}},p={template:a.t5,data:function(){return{}}},d={template:a.t6,data:function(){return{}}};e.exports={TopicsView:c,TopicSingleView:l,TopicCreateView:p,TopicUpdateView:d}},function(e,t){e.exports={t1:'<div class="TopicsView"> <button @click="openDialog">openDialog</button> <bs-card> <TopicsItemView v-for="topic in topicList" :topic="topic" key="topic.id"/> <bs-pagination :current=\'currentPage\' pageSize="10" totalCount="13" @page="onPageChange"/> </bs-card> </div>',t2:'<div :class="topic.img?\'TopicsItemView\':\' TopicsItemView noCover\'"> <div class="cover"> <img src="/static/images/tmpimg/aaaa.png" > </div> <div class="content"> <router-link :to="\'/topic/\'+topic.id" class="title bs-nowrap">宝塔管理面安装tipask3.x视频教程（5分钟急速安装）</router-link> <div class="summary">网站的关键词排名优化是每个网站运营者必须的工作，做SEO优化说难也不难，说容易也不容易，如果想把网站关键词排名优化到百度首页，那也要看关键词竞争强度，优化网站的时间，网站权重，SEOer经验与优化技术等因素能否把网站关键词排名优化到百度首页。所以想要把关键词排名优化到百度首页，起码要清楚百度搜索引擎是通过什么数据来判断页面的质量，然而再进一步不断进行完善改进! </div> <div class="infos"> <img class="avatar" src="/static/images/tmpimg/aaaa.png"> <span class="nickname">luanhaipeng</span> <span class="createtime">发布于 2017-06-20 13:57</span> <span class="viewcount"> 阅读 ( 340 ) </span> </div> </div> <div class="bs-clear"></div> </div>',t3:'<div slot="title" class="title111">新建文件夹</div> <div slot="body">hello world--{{data}}</div>',t4:'<div> <bs-card className="TopicSingleView" title=""> <h1 class="topic-title">宝塔管理面安装tipask3.x视频教程（5分钟急速安装）</h1> <div class="topic-summary">最近发现一个非常好用的管理面板，正好有点时间就写了这个快速安装教程，希望能够帮助大家快速来安装和体验tipask社区问答系统。</div> <div class="topic-content"> <p>最近发现一个非常好用的宝塔管理面板，正好有点时间就写了这个快速安装教程，希望能够帮助大家快速来安装和体验tipask社区问答系统。 </p> Tipask3.x安装教程 安装步骤如下： 1、安装宝塔管理面板，详情教程参见宝塔管理面板官网 www.bt.cn 2、配置php扩展，需要开启fileinfo、opcache扩展 3、添加网站，保存数据库账号信息，后面会用到。 4、上传程序源码，解压并修改bootstrap、storage目录权限为可读写 5、设置程序目录和程序运行目录 6、配置网站伪静态规则 7、重启nginx服务器加载网站伪静态规则 8、访问网站安装地址进行可视化安装 9、文件管理中修改网站目录.env文件权限为可读可写 10、打开网站安装地址继续安装，填写网站相关信息，即可完成安装。 详细教程见下方视频： </div> </bs-card> <div class="bs-clear10"></div> <bs-card title="回复"> <bsv-reply id="topic:1" /> </bs-card> </div>',t5:'<div class="TopicCreateView"> <bs-card> <div class="box"> <h2>文章标题:</h2> <input type="text" placeholder="标题字数10字以上"> </div> <div class="box"> <h2>文章封面:</h2> <div> <bs-upload-button className="upload-cover"/> </div> </div> <div class="box"> <h2>文章正文:</h2> <div class="bs-textarea-wrapper"> <textarea placeholder="撰写文章"></textarea> </div> </div> <div class="box"> <h2>文章摘要:</h2> <div class="bs-textarea-wrapper summary-textarea"> <textarea placeholder="文章摘要"></textarea> </div> </div> <div class="box"> <select class="select-category"> <option value="0">请选择分类</option> </select> </div> <div class="box"> <bs-button title="发布文章" theme="ok"/> </div> </bs-card> </div>',t6:'<div class="TopicUpdateView"> update </div>'}},function(e,t){},function(e,t){}]);