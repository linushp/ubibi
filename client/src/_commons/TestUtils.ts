
interface Person {
    name:string,
    sex:number
}

class Person1 implements Person {
    name = "";
    sex = 1;
    constructor(name,sex){
        this.name = name;
        this.sex = sex;
    }
    saveName(name){
        this.name = name;
        console.log(name);
    }
}

var persion1:Person = {name: "aaa", sex: 1};

function render(){
    return (
        ""
    );
}


function test(name:string,sex:number){
    return new Person1(name,sex);
}