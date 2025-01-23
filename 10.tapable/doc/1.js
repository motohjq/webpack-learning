//this.call = CALL_DELEGATE; 动态创建的

let callFn = new Function('a,b','return a+b');

//这种写法其实是一种语法糖
function callFn2(a,b){
    return a+b
}
console.log('====================================');
console.log(callFn(1,2));
console.log(callFn2(1,2));
console.log('====================================');

//这个和eval类似的吧?

eval('1+2');
