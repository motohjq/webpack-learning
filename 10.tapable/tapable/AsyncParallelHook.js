const Hook = require('./Hook');
const HookCodeFactory = require('./HookCodeFactory');
//生产代码的工厂
class AsyncParallelHookCodeFactory extends HookCodeFactory{
    content({onDone}){
        return this.callTapsParallel({onDone});
    }
}
//创建工厂的实例
const factory = new AsyncParallelHookCodeFactory();
class AsyncParallelHook extends Hook{
    compile(options){
        //通过代码工厂创建函数
        //初始化工厂
        factory.setup(this,options);
        //调用代码工厂创建函数
        return factory.create(options);
    }
}
module.exports = AsyncParallelHook;