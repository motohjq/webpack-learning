


999
异步统一处理吗
侧耳倾听
缩小一下
初心
2个异步的放两个异步chunk,还是异步的都放在一起吗

每个异步都是一个独立的chunk和chunkgroup

胡超
不一定一对一的吧
胡超
公用的chunk，可以放多个group里面吧
是的
小白
一个代码块一个js吗


小白
一个chunk group 一个js吗
一个chunk对应一个文件
entry1 chunkgroup
里有两个chunk
entry1 common

杨澜
有公共得chunkgroup吗
有公共 的chunk,但不是共用的chunkgroup

?
同一个chunkgroup之间的chunk有什么关系？
同一个chunkgroup中的chunk会共享 一个运行时代码
 function webpackRequire(moduleId) {
    var cachedModule = webpackModuleCache[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = webpackModuleCache[moduleId] = {
      exports: {}
    };
    webpackModules[moduleId](module, module.exports, webpackRequire);
    return module.exports;
  }

一个chunk会属于多个group吗，对于那个common
会


同一个chunk group的模块，如果有一个模块出错了就挂了吗
不一定
要看挂的是哪个模块的。如果入口挂了就全挂了。如果挂非入口模块则只持一个



单页面应用时候，webpack development build时候只build一个js，
出错了其他页面就挂了。如果我分chunk build，那是不是就不会挂了
是的是的是的


老师，如果入口只有entry1，依赖了同步和异步，没有公用模块，
那就只会生成同步和异步两个chunk么？
是的是的是的


本周日 晚上8点
我们手写EMP2
里面会手写webpack-chain



胡超
老师这个EMP2是啥呀
小海
tapAsync 的字符串是固定的嘛
名字不是固定的，没用

emmmmm

