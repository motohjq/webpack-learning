const {SyncWaterfallHook} = require('tapable');
const hook = new SyncWaterfallHook(["name","age"]);

hook.tap('1',(name,age)=>{
    console.log(1,name,age);
    return '结果1'
});
hook.tap('2',(name,age)=>{
    console.log(2,name,age);
    //如果有一个事件函数返回值不为undefined,则跳过剩下的事件函数
    return '结果2';
});
hook.tap('3',(name,age)=>{
    console.log(3,name,age);
});
hook.call('zhufeng',12);