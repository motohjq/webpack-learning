

let name = 'name'
let age = 'age';
setTimeout(()=>{
    name='name1';
    age = 'age1';
},3000)
function d(exports2,definition){
   for(let key in definition){
    //ports2[key]=definition[key]();
     let getter = definition[key];
    Object.defineProperty(exports2,key,{
        get:getter
    })
   }
}
let exports2 = {};
d(exports2,{
    name:()=>name,
    age:()=>age
});
console.log(exports2.name);
console.log(exports2.age);
//es module 导出的引用地址
//commonjs 导出的是值本身
//es 模块规范规定如果模块内的变量发生变化，外部读到永远都是新的值
setTimeout(()=>{
    console.log(exports2.name);
    console.log(exports2.age);
},4000)