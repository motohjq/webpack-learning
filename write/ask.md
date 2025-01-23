胡超
根据类型做一遍转换
999
map了一下, 方便后面使用参数



胡超
run才是开始构建吧
make
胡超
beforeRun是在哪儿发布的呀
15:24
胡超
创建编译器
15:29
胡超
1
胡超
make之前都是准备工作么
张仁阳


引用嵌套的依赖的关系是如何展示的呢? 
数组索引区分父子关系还是每次需要记录关系都会new 一个moduleGraph呢
index.js a.js b.js
indexDependency 
aDependency
bDependency 

indexModule
aModule
bModule

index.js a.js b.js

chore: Remove unused parameters from functions



最后打包结果可以看出来哪些chunk属于同一个group吗



老师，异步的common chunk和同步的chunk，不能放在一个chunkGroup吧？
异步的公共chunk
同步的chunk

只要是异步的chunk,就会抽取出去成为单独的chunk,以及单独的chunkGroup


import title from './title';
console.log(title);
在分析语法树的时候，发现如果有import语句，就会添加一个依赖HarmonyImportSideEffectDependency
在修改源代码的时候 ，创建一个导入语句
[var _title__WEBPACK_IMPORTED_MODULE_0__ = webpackRequire("./src/title.js");\n','']
第1元素是开始内容，第2上元素是结束内容 
initFragments=[[var _title__WEBPACK_IMPORTED_MODULE_0__ = webpackRequire("./src/title.js");\n','']]
然后处理显示依赖 HarmonyCompatibilityDependency 
HarmonyExportDependencyTemplate
initFragments.push(['webpackRequire.r(__webpack_exports__);\n','']);__webpack_exports__.r();
再处理ConstDependency ，获取ConstDependencyTemplate
把源码中的0~27索引对应的字符全替换成为空串，也就是删除导入语句import title from './title';
再处理HarmonyImportSpecifierDependency 依赖
作为是把title变成_title__WEBPACK_IMPORTED_MODULE_0__["default"]
总结一下，
依赖模块改源码有两种方式，一种是源码替换，也就是直接修改源代码
第一种是添加新的代码片段



var _titlewebpackImportedModule0 = webpackRequire("./src/title.js");
webpackRequire.r(webpackExports);
console.log(title);





21:44
emmmmm
代码生成阶段是又要再遍历语法树进行模版的替换吗？
不需要
因为在解析阶段，已经准备好，解析好了
生成阶段不需要再遍历了
21:49
emmmmm撤回了一条消息
emmmmm
就是之前遍历语法树收集依赖的时候已经记录好从哪个位置删除哪个位置添加吗
是的
21:59
胡超
export default
22:10
小白
[表情]厉害
emmmmm
依赖里的range数组是遍历语法树的时候收集吗？
肯定是的


