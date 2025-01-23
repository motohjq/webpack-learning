

脚手架  是node内容  还是webpack
陈瑶撤回了一条消息
HEIzi
html-webpack-plugin 的功能能用loader实现么?不能
loader功能非常的单一，只能用来转换模块
插件是无所不能的

插件和loader的区别是啥
綠ぃ嗏
多模板对应多入口也可以吧？
Error: Conflict: 
Multiple chunks emit assets to the same filename bundle.js (chunks entry1 and entry2)
chunk是代码块，从入口文件开始，找到它所有的依赖，这些模块打包在一起会形成一个代码块

悟空
loader只做一件事   插件可以做多件事
u
defer ?
赵江兵
defer
jaiden
插件怎么调用
HEIzi
插件和loader执行时机不一样
jaiden
webpack自己调用的插件吗

webpack自己调用的插件吗
HEIzi
类似生命周期一样
u
node 包含webpack ?
李富强
为啥是defer  怎么生成async？异步包会阻塞文档渲染吗？
HEIzi
webpack有自己的生命周期,会去调用plugin
Tony
filename也要改吧 [name]
Tony
chunk吧
旺仔牛奶
一般都会写成 inject ：true 吧
刘佳欣
块
杨峰
这个问题我前段时间还遇到了。。。
李富强
import('xx.js') 会阻塞文档渲染吗？
这个我们后面详细讲
异步加载模块，可以以同步的方式，也可以以异步的方式。
forrest
老师把这个错误信息发一下，我整理下常见错误
Echo
那两个模块共同依赖了一个模块呢
重复打包。后面会讲splitChunks ,提取公共模块
胡超
老师，代码块是指这个么(function())()
代码块其实是模块的集合
杨峰
我之 前是想把vue打成一个JS，配了好久
Tony
需要设置chunks
刘佳欣
不写默认就是全部引入吗?是的
HEIzi
chunks:entry1 这个value是引入的那个名字,是entry的可以么
chunks的值是一个数组，配置的是入口的名字，也就是入口的chunk的应的名字
旺仔牛奶
但是他们都还是 defer 
jaiden
webpack里面的插件和loader的区别？他们怎么调用的？谁调了谁？
插件和loader后面会详细 讲
宇相随
我们讲的是第几版本的webpack webpack5
HEIzi
5



node_env ?
用梦想拴住远方的地平线
--mode=development 怎么用呢
u
怎么设置的哟
接线小菜
如果不用cross-env,设置mode="development",在webpack的配置文件能读取到process.env.NODE_ENV吗？



旺仔牛奶
代码块具体指的代码中的哪里啊
webpack里的代码块指的是模块的集合，一堆模块放在一起成为一个代码块
webpack chunk和node里的chunk没有关系
如果非说有关系，就是他们都是指一部分数据

一个文件就是一个模块，是打包后模块依赖关系的最终结果嘛
后面讲源码

webpack打包，输入是文件，输出也是文件

module -> 一个文件
chunk -> 一条有相关依赖模块关系的路径，是过程中的代码块
bundle -> 结果代码块，chunk 构建完成后就是 bundle=输出的文件


佳佳
老师对象的属性名为啥是test condition judge

你也可以这么理解  
let reg = /\.js$/
判断模块的路径和正则是否匹配，就是一个测试条件
reg.test('c:/a.js')

刘佳欣
less-loader和css-loader的版本号怎么匹配呀


vue-style-loader 做了啥特殊操作么
vue-loader 功能非常全 后写vue-loader实现



侧耳倾听撤回了一条消息
15:56
Tony
现在还需要配置 module:false吗
u
.belrc  和 babel.config.js 中选一个就可以了吗
fuyb
选一个就行了
Ace
3选1都可以
悟空
有次别人问babel是把ES6的什么转成ES5



15:56
Tony
现在还需要配置 module:false吗

module:false 不转换
因为我们现在写代码更多的是es module
import export
但是 webpack打包之后只使用common.js module.exports exports.xxx
如果你不希望babel把你的es module转成common.js就可以设置module:false

u
.belrc  和 babel.config.js 中选一个就可以了吗
fuyb
选一个就行了
Ace
3选1都可以
悟空
有次别人问babel是把ES6的什么转成ES5
后面我们会手写插件
AZHENG
预设里面的插件有前后顺序或者相互依赖的关系吗
可能有，也可能没有
@babel/preset-env里是没有依赖关系 

杨峰
那预设只能是es6转es5的吗，如果我有es7是不是用这预设就不行了？
这是可以配置的



预设还是没懂
fuyb
可以这样理解，es5 代码是大部分浏览器能跑的，es6 只有一部分浏览器能跑。为了让一份es6 的规范代码在大部分浏览器都能跑，就需要一个转换器(babel)，就是把语法糖转成更通用的代码
fuyb
预设就是这份转换规则
u
好的
fuyb
比如把 () => {} 转成 function(){}
fuyb
本质就是一份规则映射，后面讲了 ast 之后，就比较好理解了
u
这样理解些了
HEIzi
统一称为es6
fuyb
出一份规范了，就会有人去做相应的转换器（loader）不然这份新规范也没法推广（狗头




雪碧图用的很少，那现在用什么
杨峰
现在都用iconfont了
HEIzi
有重复的图片webpack打包会只打包一个么
HEIzi
iconfont 自定义的去哪里找呀?
杨峰
字体图标
杨峰
可以加上去的
HEIzi
你们项目图片资源就放在本地么?还是引用的链接?
一般都是CDN
綠ぃ嗏
glob 能配数组嘛？
HEIzi
js引用图片这个雪碧图回生效么
HEIzi
把全部png都打包成雪碧图,name第一次请求时间会很长呀
所以说不要打包全部，只打包了icon
17:33
悟空
webpack把小图片都变成雪碧图  但是开发的时候写样式都是按单个图片写的，这么处理了 ，上线了图片是雪碧图，那样是不是坏了    是做了什么处理么
旺仔牛奶
为啥去除 clean 啊
jaiden
位置好像不对
悟空
每次打包不都是要清楚以前的文件么
HEIzi
可能使用雪碧图打包了两次吧
悟空
webpack把小图片都变成雪碧图  
但是开发的时候写样式都是按单个图片写的，
这么处理了 ，上线了图片是雪碧图，那样是不是坏了    是做了什么处理么



cdn 现在也总不稳定
免费的不行，选择收费的或者自建的
悟空
比小公司的服务器还是强的
悟空
放在阿里  或者腾讯   华为的  oss上 不会有问题的

是写代码的时候就直接上传到oss,然后直接引入链接么




其实
web-dev-server内置的是一个express的http服务器