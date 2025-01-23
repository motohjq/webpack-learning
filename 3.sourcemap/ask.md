
- sourcemap 生成sourcemap文件
- eval 把模块代码通过eval进行包裹
- cheap 1.不包含列信息，2不包含模块的loader的map
- inline 把sourcemap信息变成base64字符串并内联到main.js中，不会生成单独的sourcemap文件


20:21
鱼饵撤回了一条消息
胡超
便宜意思就是简洁版的sourcemap吧 是的
 不包含列信息
 不包含loader的map映射
1024赫兹
source-map的话能找到es6的么
1024赫兹
不加cheap
鱼饵
是不是还有 module-source-map
火神
eval有什么优缺点？
胡超
老师，会讲怎样在线上使用sourcemap调试找问题嘛




不加cheap
鱼饵
是不是还有 module-source-map
火神
eval有什么优缺点？

胡超
老师，会讲怎样在线上使用sourcemap调试找问题嘛
1024赫兹
列也出来了好想
杨峰
每种source-map都对应工作中的哪些场景呢，老师能举个例不
胡超
没有列


所以开发环境比较推荐配置：devtool: 
cheap-module-eval-source-map
- source-map生成映射文件
- cheap不包含列信息
- module 包含有loader模块之间对应的sourceMap
- eval 因为在开发环境我要频繁修改代码，频繁重新构建，所以需要缓存提升重新构建的速度



## 如何调试测试环境的代码
- 把代码发布到了测试环境，不希望测试人员能看到你的源文件
- 但是你开发需要
- 你可以把map文件放在你的本地。




每次在本地启动就好了
小白
那把sourceMap文件删了是什么样 重新打包生成
胡超
1
小白
也就是模拟发布到线上后就没了
1024赫兹
看到sourceURL里是webpack://格式的，这是啥意思
Tony
这个生成的是cheap-source-map
Super。
那如何打包后删除sourcemap文件夹 并 重新生成这个文件夹
胡超
6
sourcemap放到sentry的话怎么定位到错误的具体代码呢
我们有sentry训练营
forrest
请求图片时，文件名称不变，图片内容被替换，但页面显示的还是之前的图片内容。
从请求中可以清楚的看到，图片是读取的“内存缓存”。这问题能通过webpack配置打包避免图片静态的图片资源被缓存吗？
韦林
webpack打包后的图片最好加上hash值作为文件名
是的
那个正则 是把 正在访问js路径跳转到带sourceMap的路径吗

http://127.0.0.1:8080/main.js
http://127.0.0.1:8081/main.js
http://127.0.0.1:8081/main.js.map


([转换前的行索引,转换前的列索引](源文件的名称)=>[转换后的行索引,转换后的列索引]) 
([0,0](script.js)=>[0,0]) 
([0,4](#0)=>[0,4]) 
([0,6](#0)=>[0,6])
([0,0](#0)=>[0,7])
([1,4](#0)=>[0,8]) 
([1,6](#0)=>[0,10])
([0,0](#0)=>[0,11]) 
([2,4](#0)=>[0,12]) 
([2,6](#0)=>[0,14])


AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE;AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE;

A=0
I=4
E=2
C=1
D=-1
N=-6
AAAA,       IAAIA,        EAAE
[0,0,0,0], [4,0,0,4,0], [2,0,0,2], 
CAAN,         CACIC,       EAAE
[1,0,0,-6], [1,0,1,4,1], [2,0,0,2],
CADN,           CAEIC,       EAAE;
 [1,0,-1,-6], [1,0,2,4,1], [2,0,0,2]


let a=1;
let b=2;
let c=3;

var a=1,b=2,c=3;

a b c 1 2 3 ,  , 开始位置 一共9个位置 
[0,a.js,0,0]第一个位置，是绝对位置  l=v
转换后的列走几步，正数向右走，负数向左走
[4,a.js,0,4,0]
0+4=4
转换后就是0行4列
0+4=4
转换前就是0行4列
a
[2,a.js,0,2]
06=>06


