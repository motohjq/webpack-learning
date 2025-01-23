commonjs2 是啥

commonjs
exports.math
commonjs2
module.exports

韦林
new 是一个是插件 一个 loader
杯影含珊
为什么要这样使用了
杯影含珊
插件不是可以直接解决吗
黑子
写项目可以这样用么?项目我都没有排除呀
杨峰
如果我在入口文件处给个export 一个函数，
打包完是不是跟libraryExport一样的效果？
可以作为我们项目 入口？
阿狸
commonjs2：将库导出为一个CommonJS2模块，该模块在Node.js环境下可用
andy
lodash是不是要拿到外面来，不应该是对象套对象吧
韦林
window全局变量吗  =  root
20:44
鱼饵
在commonjs环境下加载哪个模块
commonjs2: 'jquery' 值可以随便写码
转身撤回了一条消息
转身
转身
可以写点注释嘛
黑子
在\正常写项目,需要排除所有第三方模块么?
不行
写库可以，写项目肯定不能排除
綠ぃ嗏
nodeExternals 这个是 webpack5的嘛


鱼饵
1也支持module.exports吧
exports.xxx
module.exports=xxx
1024赫兹
external后直接require('jquery')不会报错吗？ 要用户自己装jquery依赖吗
旺仔牛奶
打包成一个库，外部怎么引用呢
AZHENG
为什么css需要loader 箭头函数不需要
因为箭头函数就是JS
杨峰
css不加loader就会和 js打在一起的
CSS如果不加loader,会报错
Mason
最近面试问过一道题，rollup 与 webpack 的打 npm 包区别是什么，为什么大部分选择rollup？
rollup打包出来的代码非常的干净，没有runtime



css是css文件,webpack只打包js和json,其他文件需要loader转换,箭头函数是js,不需要
黑子
最近面试问过一道题，rollup 与 webpack 的打 npm 包区别是什么，为什么大部分选择rollup？ / 按需引入吧
韦林
peerDependencies lodash jquery
小刘
module可以有多个rules吗

韦林
rollup 现在默认是commonjs 1 还是2 ？
rollup 默认打出来的格式是es module
20:57
比哑巴吃黄连还要苦
不写的话默认是啥
webpack不写默认就是commonjs2
毛毛
esmodule呢
andy
还有esm
韦林
export main from '***.js' 用 main.math.add  能不能 math.add  这样使用层级有点深？？
鱼饵
js和json认识
韦林
treeshaking  只能用 esModlue 语法写吧

commonjs的treeshaking


打出来是esmodule, 那岂不是还要再打一遍成commonjs
rollup可以打包成common.js
1024赫兹
webpack能打出来esmodule吗



--mode可以决定 模块源代码中的process.env.NODE_ENV的值



韦林
treeshaking  只能用 esModlue 语法写吧
1024赫兹
打出来是esmodule, 那岂不是还要再打一遍成commonjs
1024赫兹
webpack能打出来esmodule吗
周先森
vite就是解决了esbuild的问题吗
阿狸撤回了一条消息
阿狸
老师每节课录短一点吧
andy
不长啊，老师这样的不是挺好吗
阿狸
看录播的时候每节课太长了不好找知识点
韦林
老师估计没时间剪切视频
jaiden
你不是道有东西叫暂停
杨峰
webpack 配置里面的mode没去掉
可以同时写，然后 package.json中的会覆盖配置文件中的mode
初心
覆盖
1024赫兹
config里的mode和pacakge.json里的mode 有优先级么



黑子撤回了一条消息
小海
node 中也没有吧
侧耳倾听
那在webpack.config.js中怎么取啊
黑子撤回了一条消息
黑子
那怎么根据环境启动不同的配置呀
小刘
一般不用这种方法配置环境变量吧？
黑子
用
初心
cross-env
小刘
一般用cross-env吧
jaiden
"'pordcution'" 可以吗
u
什么是跨平台哟
旺仔牛奶
--mode ，的话，webpack 也可以用参数接收我记得
黑子
这个好像分系统的吧
旺仔牛奶
coress-env 设置了 definePlugin
鱼饵
cross-env只能设置node的环境变量吗


cross-env只能设置node的环境变量吗是的
但是我们可以通过node的环境变量去设置别的变量mode
旺仔牛奶
coress-env 设置了 definePlugin 不设置会咋样
如果你不主动关联process.env.NODE_ENV和mode,那它们之间就是没有关系
鱼饵
是否可以只设置cross-env不设置 mode
可以的，但没有
杯影含珊
设置coress-env 就不需要在插件里面配置了吧
需要
韦林
coress-env 设置了 definePlugin 不设置会咋样 
 cross-env 跟 definePlugin 是两个功能
 两个功能

definePlugin 设置是为了在 业务代码中使用
是的
emmmmm
老师env是process自带的属性，NODE_ENV是自己设置上去的属性是嘛
是的
搞清楚
在node里，process表示node进程，env代表node环境变量对象。NODE_ENV是一个环境变量




mode和NODE_ENV有关系么?相同的吧
不同
mode是webpack中的一个概念，
如果你设置了mode
那么webpack在编译代码的时候
会把process.env.NODE_ENV替换为mode对应的变更 


鱼饵
mode 和  DefinePlugin设置一个不就可以了
是的
但是 DefinePlugin可以定义自定义属性，在代码中使用
韦林
mode 和  DefinePlugin设置一个不就可以了 这是两个功能




旺仔牛奶
index.js 入口文件引入了env。js ma
悟空
我去年封装了一些方法上传到公司的npm服务器  好像不是和你前面讲的一样   好像操作很简单就发布上去了
悟空
npm init -y
悟空
然后就写东西  写完就打包还是怎么的  然后就publish 就好了
npm login 
npm publish
cai
老师可以讲一下esmodule和commonjs的区别吗
悟空
请问 咱们前面说的发布npm  不是我说这个么  我听岔了么
侧耳倾听
是的,只是老师详细讲了打包和配置,没讲发布而已
韦林
process.env.NODE_ENV 
process.env.BASE_URL 
 如果不使用DefinePlugin 做替换，
 代码打包后在浏览器中 是识别不了
 process.env.NODE_ENV  
  process.env.BASE_URL
process.env.BASE_URL=api.baidu.com 是运维打入node中环境变量 只有在node 环境下可以解析
悟空
侧耳， 问题是配置我也没这么做呢
我也能拉下来安装使用



import '@babel/polyfill'
 引入全量的polyfill
403 KiB


21:45
小刘
新特性不转也不会报错吧
旺仔牛奶
按照刚才说的，webpack 是不能打包成esodule嘛，是不可以的对吗
黑子
@babel/core是干啥的呀
babel的核心包，语法树解析
1024赫兹
preset是 一系列插件的集合吗
是的
韦林
是
鱼饵
只使用babel-loader不使用preset-env会出现什么
什么效果都没有
jaiden
0.1也去掉吧
比哑巴吃黄连还要苦
Polyfill好像不支持fetch




805 KiB
entry 并不考虑代的实际使用情况
只要你要兼容的浏览器不支持，添加polyfill,跟你代码用到没用没关系

387




后面会讲 webpack chain 么 可以安排
旺仔牛奶
那不配置 use 那个是啥意思
小哈
有次用polyfill做兼容性，最后还还报一个什么global的错误
fuyb
配置是真复杂啊
旺仔牛奶
那你这个考虑兼容性的也是全部引入啊
false preset完全不考虑polyfill，如果你在代码中引入了polyfill无视兼容性完全导入
entry 需要你在入口手工导入poyfill,preset会根据你要兼容的浏览器引入polyfill,不考虑你的使用情况
usage 不需要你手工引入pofyfill, preset会根据你的使用情况，按需导入polyfill

陈瑶
1%大致有哪些浏览器哦
黑子
corejs 是做什么的呀
实现polyfill 
Array find
Array.prototype.find = find哪来的?主是由core.js实现的
小刘
已知的主流浏览器吧
毛毛
corejs3 是什么
false
function _createClass(Constructor, protoProps, staticProps) { if (pro
var A = /*#__PURE__*/_createClass(function A() {
  _classCallCheck(this, A);
});



/**
 * var A = (0, _babel_runtime_corejs3_helpers_createClass_4__["default"])(function A() {
      (0, _babel_runtime_corejs3_helpers_classCallCheck_5__["default"])(this, A);
    });
 */




function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Fhis.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(gen);
function gen() {
  return _regeneratorRuntime().wrap(function gen$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
      case "end":
        return _context.stop();
    }
  }, _marked);
}



提取运行时 是什么
把比如说类的创的工具方法，或者说utils从一个包里导入，而不是重复创建

旺仔牛奶
babel 是真的强大
旺仔牛奶
那这个promise 本身就支持，她还是用的run-time的嘛
阿狸
老师你的文档用的啥写的？vuepress吗 idoc
jaiden
和之前那个runtime是不是一样的
其实大家会发现

@babel/preset-env usage=@babel/plugin-transform-runtime

jaiden
webapck
22:20
fuyb
完全没办法记住 害
小哈
应该不要记得，能记得解决那些问题就行了，以后遇到了查文档
黑子
广度
小刘
一会整个整体最优解吧
悟空
嗯嗯  等会弄个最优秀的配置   以后自己配置就抄
fuyb
现在用 chain 的方案蛮多的，也支持外部传入自定义的，章老师之后安排安排 哈哈
悟空
这些东西对于我来说   就是乱码！@@#￥￥%
悟空
哈哈
黑子
你是用umi的吧


proxy不行
jaiden
这个好像没有polyfill
綠ぃ嗏
这里的配置会跟 .babelrc 冲突嘛
fuyb
https://github.com/ambit-tsai/es6-proxy-polyfill
有的
旺仔牛奶
helpers 啥意思来着
提取公共运行时代码

韦林
helpers 提取公共代码到一个文件中 避免重复声明
1024赫兹
polyfill.io相当于entry吗

polyfill.io useBuiltIns entry
考虑你的浏览器，但不考虑你的使用情况


通常上在根项目中babel基本上有四个配置文件：

babel.config.js ，以command.js格式配置；
.babelrc， 配置文件内容为JSON数据结构；
第三种是在package.json文件中配置babel字段；
babelrc.js ，该配置与.babelrc相同，但是需要使用JavaScript实现；
babel配置文件的优先级
在这4种配置文件中，
最常用的是babel.config.js配置和.babelrc配置，
Babel官方推荐babel.config.js配置，因为该配置是项目级别的配置，会影响整个项目中的代码，
包括node_modules。有了babel.config.js配置之后，就不会去执行.babelrc了。
.babelrc配置只影响本项目中的代码



面试会问吗 这个
shadowhunter
预设除了会污染，其他比插件的优点是啥
小

旺仔牛奶
regenerte false 啥意思

韦林
是否开启generator函数转换成使用regenerator runtime来避免污染全局域
毛毛
老师什么时候讲源码


黑子
打包优化哪里讲呀
讲完源码讲优化

韦林
polyfill.io 污染全局的按需打补丁
黑子
今天结束了么?老师
毛毛
useBuiltins的entry要和target结合起来用吗
肯定 是的


