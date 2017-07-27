import {DialogTemplate,AlertDialogTemplate} from './Dialog.shtml';
import './Dialog.less';

var CONST_CLOSE = 'close';

function noop() {

}

function isType(obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
}

function isPromise(obj) {
    if (isType(obj, "Object")) {
        if (isType(obj.then, 'Function') && isType(obj.catch, 'Function')) {
            return true;
        }
    }
    return false;
}

var zIndex = 1000;
Vue.component('bs-dialog', {
    props: ['className'],
    template: DialogTemplate,
    methods: {
        onCloseDialog: function (type) {
            this.$emit(CONST_CLOSE, {type: type});
        }
    },
    data: function () {
        zIndex = zIndex + 1;
        return {
            zIndex: zIndex,
            zMaskIndex: zIndex - 1
        };
    }
});


function openDialogComponent(VueComponent) {

    var vm = new VueComponent().$mount();

    var doCloseDialog = function () {
        vm.isDialogOpen = false;
        document.body.removeChild(vm.$el);
        setTimeout(function () {
            vm.$destroy();
        }, 1);
    };

    vm.$on(CONST_CLOSE, doCloseDialog);

    document.body.appendChild(vm.$el);
    vm.isDialogOpen = true;
    return vm;
}


function createDialog(componentConfig) {
    var dialog = componentConfig.dialog || {};
    var beforeClose = dialog.beforeClose || noop;
    var afterClose = dialog.afterClose || noop;

    var methods = componentConfig.methods || {};
    methods.onCloseDialog = function (obj) {

        var vm = this;
        beforeClose = beforeClose.bind(vm);
        afterClose = afterClose.bind(vm);
        var isOK = beforeClose(obj);

        if (isPromise(isOK)) {
            isOK.then(function (isOK0) {
                if (isOK !== false) {
                    vm.$emit(CONST_CLOSE, obj);
                    afterClose(obj);
                }
            });
        } else if (isOK !== false) {
            vm.$emit(CONST_CLOSE, obj);
            afterClose(obj);
        }

    };

    var className = dialog.className || '';
    var template = ''
        + '<bs-dialog @close="onCloseDialog" className="' + className + '" >'
        + componentConfig.template
        + '</bs-dialog>';

    componentConfig.template = template;
    componentConfig.methods = methods;
    return Vue.extend(componentConfig);
}


function Dialog(componentConfig) {
    var component = createDialog(componentConfig);
    this.openDialog = function () {
        return openDialogComponent(component);
    }
}

var AlertDialog = new Dialog({
    template: AlertDialogTemplate,
    data: function () {
        return {
            title: "",
            message: ""
        }
    }
});

export function openAlert(message,title){
    var vm = AlertDialog.openDialog();
    vm.message = message;
    vm.title = title;
}

export default Dialog;