黑子
把node_modules中文件打包进去了
是的
20:22
侧耳倾听
nosourceMaps = require('./node_modules'),这个node_modules和依赖包有关系没


20:26
999
let arr = []; 
arr.toString=fn ; 这里只是修改arr的toString方法是吧. 不是修改整个数组的

let arr = [];
arr.toString修改了这个数组arr的toString方法，不是修改的数组元素的toString
999
感觉就是实例上定义一个方法
黑子
body{ color:red }这个字符串是哪里来的?


火神
utils里的requite哪来的
AZHENG
path能不能取

黑子
require.reslove() 是 node方法么?
是的，是node的require对象的内置方法
AZHENG
绝对路径

胡超
这串内容通过remindingRequest获取的吧
火神
innerHTML的内容怎么获得的



小白
那没用到css-loader, 这里走pitch和loader有什么不一样呀. 直接loader return 那个content会怎么样
走了二次loader-runner
第一次只走style-loader pitch 返回结束了
webpack通过语法树分析，返回值里有又引入另一个模块
"!!../loaders/css-loader/index.js??ruleSet[1].rules[0].use[1]!./index.css"
又会再执行一轮loader-runner
直接读取index.css文件内容，然后返回值给css-loader的normal处理，然后就直接返回给webpack
黑子
pitch不返回就好了吧
21:25
黑子
那是不是不配置css-loader也行呀



使用style-loader pitch 提前把代码包裹好？
999
第二轮因为只是引入了css-loader, 所以不会使用style-loader吗
第一次只走style-loader.pitch
第二次只走css-loader.normal

不是走行内的css-loader 么?怎么有走到配置里面去了呀
999
还有第一次pitch执行结束后,虽然有引入css-loader. 但是引入之后不会继续执行引入文件和后面的normal了吗
不走了
火神
css-loader返回的值怎么以style标签的形式插入到页面的
张仁阳

css-loader返回的值应该给到style-loader的pitch返回值里了吧？
不是

黑子

第一次进入后，到index.css，
再进入css-loader，再加载js，就将content加载到页面，
为啥不需要再经过style-loader
21:39
小白
那这种可以用两个loader的normal实现吗


韦林
style-loader。pitch 把 css-loader!index.css 给webpack

韦林
css-loader 解析 css 代码
999
老师再看下使用style-loader的pitch位置


第一轮的时候 style-loader.pitch
返回
 let content = require(${stringifyRequest(this,`!!${remindingRequest}`)});
      let element = document.createElement('style');
      element.innerHTML = content.toString();
      document.head.appendChild(element);
给webpack了

webpack会进行语法树的分析，找里面有没有require
找到require  !!css-loader.js!index.css
然后webpack会去编译处理!!css-loader.js!index.css
而在编译处理!!css-loader.js!index.css的时候会再走一轮loader-runner
读取index.css文件内容，给css-loader的normal,得到最终的结果 
module.exports =  "body{color:red;}";
这里没有require,则编译结束




小白
那这种可以用两个loader的normal实现吗
韦林
style-loaderpitch 把 css-loader!index.css 给webpack
韦林
css-loader 解析 css 代码
999
老师再看下使用style-loader的pitch位置
胡超
明白了，因为是js代码，所以要这样走
是的
因为css-loader返回的是js,所以不能直接用，需要通过走require方法加载得到导出的结果 
胡超
解析出来是js代码段
初心
pitch能加载脚本，normal只返回转换后的代码，不能加载脚本，是这么理解吗
不管是pitch还是normal都可以加载脚本
肥鸭
style-loader 的normal 的回调拿不到 css-loader的source内容么
根本没有机会执行 

黑子撤回了一条消息
黑子
css-loader返回值直接给webpack,
style-loader.pitch返回值也给到webpack,
这个时候在走require 运行style-loader.pitch返回的函数?
初心
normal给webpack不会进行语法数的分析吗
会的

胡超
通过require导入，拿到js代码段导出的style样式，再加载到页面上

style-loader 的normal 的回调拿不到 css-loader的source内容么
能的
如果不不给style-loader写pitch的话
先读index.css文件内容
然后传递给css-loader的normal
返回值给style-loader的normal
style-loader的normal再还给webpack
我的意思是不用pitch 就按顺序执行的话


21:53
小白
现在这个例子看起来，就是把css文件内容用style包裹放到html里面。 
有没有css loader的normal是直接返回css字符串的。这样就能直接走style loader的normal了
胡超
正常顺序走
小哈
在真实场景中，pitch和normal一般用来解决什么问题的啊？

如果当前的loader下一个loader返回一段js代码
那就只能用pitch来加载它获取返回值 
css-loader返回是JS,只能用 pitch来加载它
如果css-loader返回的是CSS，那就可以直接用normal来接收了





现在这个例子看起来，就是把css文件内容用style包裹放到html里面。 有没有css loader的normal是直接返回css字符串的。这样就能直接走style loader的normal了
胡超
正常顺序走
小哈
在真实场景中，pitch和normal一般用来解决什么问题的啊？
悟空
我之前理解的是 css-loader转化css 然后调用style-loader插入到html里面 ，现在怎么style-loader转化完了给webpack了
胡超
直接加载到页面了
小白
pitch还没去掉
小白
噢噢
韦林
那么问题来了。为什么搞得这么复杂
因为有些时候需要单独使用css-loader
另外也为了支持css-modules
import style from './style.css';
className={style.container}
也是为了让css-loader可以独立使用，不需要搭配基本的loader
如果你让css-loader返回的CSS的话，汉有直接给webpack,因为webpack只认识JS。还需要配置其它loader
来进一步处理，也就是说css-loader不能成为最左则的loader
黑子撤回了一条消息
AZHENG
为了把工作甩给webpack
火神
可能要处理里面加载的资源？
初心
normal如果返回js，返回的解析后的js，不好处理



胡超
老师等会打印cssLoaderUrlImport0看一下
"572e881627b7078e63a9.png"
韦林
.default
胡超
1
韦林
(content.default || content).toString();
xxxx
最后还要读取图片，然后把图片写入最新的生成地址吧
是的
22:32
胡超
walk是node的遍历方法么
是的


postcss和babel插件都是函数，不是类，不需要实例化
webpack插件是类，需要实例化

小刘
this.async是什么呀
把loader的执行从同步变成异步
AZHENG
这个from和to是代表什么哦
不重要，就是转换前和转换后的文件名，这是在生成sourcemap的会用到
韦林
this.async是什么呀 上次讲的 改为异步方式
小刘
是自己写的方法吗
此方法是loaderContext提供的，来自于loader-runner


胡超
可以看上节课那张图，会编译成js，再加载到页面
韦林
cssLOaderGeturlImport什么功能
现在你可以认为它没有任何作用
AZHENG
存的parseddeclaration拿去干嘛了



是规则捕获
初心
imports.push里面type是随便写的吗
AZHENG
在钩子里面对css树的处理和用了valueParser对css的处理有点混淆，比如remove为什么是在外面做的
css语法树
valueParser解析得到的节点树

postcss-value-parser可以把声明的值做成节点树，只是转换规则的值

atRule CSS语法树的一部分
而valueParser是把atRule里同的一个声明和值转成的节点

胡超
loaderContext应该是第二个参数
对象
胡超
看错了，是个对象，解构出来的
侧耳倾听
看下stringifyRequest
stringifyRequest就是把绝对路径变成相对路径



初心
item
韦林
cssLoaerExport 应该是个包含i 方法的二位数组



胡超
哈希值当类名用
胡超
我记得是一个名字[]
17:15
奈斯啊小刘超奈斯
那咋办呀
小白
 

 :local(.backgound) 是固定格式吗
 是的

胡超
traverseNode不用传参吗
17:41
小白
option里面会传入自定义的规则是不
胡超
digest('hex‘)是啥意思呀
输出16进制字符串

modules.css

表示把background这个类名变成本地类名
```css
:local(.background){
    background-color: green;
}
```
css-loader加载这个CSS文件
找:local这样的伪类，找到进行处理
获取老的类名`background`，然后生成一个新类名`_hash_background`
然后把两件事
1.把原来的类名替换掉:local(.background)=>._hash_background
2.向CSS中文件添加一个新的伪类
:export {
      background:_hash_background
}
icss-utils可以解析:export伪类，得到一个对象
const icssExports={
       background:_hash_background
}
然后webpack会向模块的输出结果中写入
 cssLoaderExport.locals = {
        "background": "src-modulesbackground--tTVAW"
      };
modulesCss.locals.background

each和walk有啥区别呀

web
root是什么 指的是语法树的根节点
web
哪来的
postcss = babel
是postcss这个CSS语法树解析器解析得到的
emmmmm
Walk是不是说的前面课程里遍历CSS语法的那个walk
const postcss = require('postcss');
把CSS源代码转成语法树
const selectorParser = require('postcss-selector-parser');
把规则的选择器变成语法树
const valueParser = require('postcss-value-parser');
把规则的值变成语法树
parsed.walk(
walk来自于postcss-value-parser

root也是postcss创建
 node.each(traverseNode);
 来自于postcss




 {
  "raws": {
    "semicolon": false,
    "after": ""
  },
  "type": "root",
  "nodes": [
    {
      "raws": {
        "before": "",
        "between": "",
        "semicolon": true,
        "after": "\r\n"
      },
      "type": "rule",
      "nodes": [
        {
          "raws": {
            "before": "\r\n    ",
            "between": ":"
          },
          "type": "decl",
          "source": {
            "inputId": 0,
            "start": {
              "offset": 26,
              "line": 2,
              "column": 5
            },
            "end": {
              "offset": 37,
              "line": 2,
              "column": 16
            }
          },
          "prop": "width",
          "value": "100px"
        },
        {
          "raws": {
            "before": "\r\n    ",
            "between": ":"
          },
          "type": "decl",
          "source": {
            "inputId": 0,
            "start": {
              "offset": 44,
              "line": 3,
              "column": 5
            },
            "end": {
              "offset": 56,
              "line": 3,
              "column": 17
            }
          },
          "prop": "height",
          "value": "100px"
        },
        {
          "raws": {
            "before": "\r\n    ",
            "between": ": "
          },
          "type": "decl",
          "source": {
            "inputId": 0,
            "start": {
              "offset": 63,
              "line": 4,
              "column": 5
            },
            "end": {
              "offset": 86,
              "line": 4,
              "column": 28
            }
          },
          "prop": "background-color",
          "value": "green"
        }
      ],
      "source": {
        "inputId": 0,
        "start": {
          "offset": 0,
          "line": 1,
          "column": 1
        },
        "end": {
          "offset": 89,
          "line": 5,
          "column": 1
        }
      },
      "selector": "._3b39c33a7ba1bf6a188603c223ae0537__background",
      "lastEach": 2,
      "indexes": {}
    },
    {
      "raws": {},
      "select": ":export",
      "type": "rule",
      "nodes": [
        {
          "raws": {
            "before": "\n"
          },
          "prop": "background",
          "value": "_3b39c33a7ba1bf6a188603c223ae0537__background",
          "type": "decl"
        }
      ],
      "lastEach": 1,
      "indexes": {}
    }
  ],
  "source": {
    "inputId": 0,
    "start": {
      "offset": 0,
      "line": 1,
      "column": 1
    }
  },
  "lastEach": 2,
  "indexes": {},
  "inputs": [
    {
      "hasBOM": false,
      "css": ":local(.background){\r\n    width:100px;\r\n    height:100px;\r\n    background-color: green;\r\n}",
      "file": "C:\\aproject\\zhufengwebpack20230305\\9.css-loader\\src\\modules.css"
    }
  ]
}

css中本身有export的用法吗
21:15
奈斯啊小刘超奈斯
打包文件优化越多,build的时候运行时间越长么?

