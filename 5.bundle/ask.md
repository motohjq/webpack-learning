

## 
- common.js加载common.js



浏览器不支持commonjs
陈刚
node里面支持common
悟空
comm的好像是后端的吧
悟空
谢谢
初心
要添加require方法
綠ぃ嗏
这是没有配代码压缩的吧，如果打包之后压缩了....就很难分辨了...
jaiden
expor ()=>{}  ?es
jaiden
这样怎么命名

export ()=>{
    
}

require.d这里直接把def对象赋给exports也是可以的吧
不行的
因为def对象的属性是一个getter,只能用在Object.defineProperty

src_title_js

title.js这个模块的相对路径，就是相对于根目录的相对路径
./src/title.js
src/title.js
src_title_js



老师,关于esModule不太了解,就是require.r不太了解
exports添加一个__esModule

为什么打印模块是 Object [Module] {},然后.name 和.age是有值的,并且__esModule没有显示出来
悟空
发了
南南
今天讲什么呢老师
黑子
还有异步导入的流程没太明白
黑子


为什么打印 Object [Module] {}
为什么要异步加载
鱼饵
一会再解释一下什么是chuck
chunk就是模块的集合

黑子
上节课 
esModule 导出的模块, 
 经过    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })包装,
 之后 打印 exports 结果是Object [Module] {} ,为什么打印 Object [Module] {}
胡超
第三个元素
胡江
为啥不用对象啊
小刘
外面的chunkid只有两个吧没有第三个promise吧
小哈
resolve reject为啥要收集起来，干啥用的啊？
为后当异步代码块加载成功后让当前的promise成功

var chunkLoadingGlobal = self["webpackChunk_5_bundle"] = self["webpackChunk_5_bundle"] || [];
	chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
韦林
webpackJsonpCallback. 一定要重写的是数组的push 方法  webpackJsonpCallback. 可以不是数组吗？
胡超
1
小刘
installedChunkData存了后面会用吗



require.bind(require,'src/age.js) 函数内部没有用到this 是不是不会bind apply