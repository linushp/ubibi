var Person1 = (function () {
    function Person1(name, sex) {
        this.name = "";
        this.sex = 1;
        this.name = name;
        this.sex = sex;
    }
    Person1.prototype.saveName = function (name) {
        this.name = name;
        console.log(name);
    };
    return Person1;
})();
var persion1 = { name: "aaa", sex: 1 };
function render() {
    return ("");
}
function test(name, sex) {
    return new Person1(name, sex);
}
//# sourceMappingURL=TestUtils.js.map