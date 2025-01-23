旺仔牛奶
可以在微前端中使用嘛
可以的
风雨之后
所处位置不同，角色就不同
风雨之后
可以一个react应用，一个vue应用吗
小白
可以
14:15
风雨之后
为什么可以不用 import了


14:46
毛毛
mf会引起样式冲突么
AZHENG
为什么要懒加载
又叫动态加载
因为NewsList代码在远程服务器上，本地没有
只能动态请求加载
cai
会跨域吗
不会
js 不会跨域
黑子
http通信
旺仔牛奶
 这种方式也是异步加载啊
胡超
为啥要React.Suspense包着呀

胡超
嗦嘎
小水
jsonp 不会跨域
默认情况下加载异步代码用的是jsonp
黑子
18也一定要Suspense么?是的
黑子
使用懒加载,会自动分包吧 是的
import() 一定会自动分出一个包出来
彭时宇
每一个模块都是一个html 这样就可以构建多页应用了
旺仔牛奶
看一下 newwork
黑子
引用失败怎么优化呀?
小水
Suspense 可以处理失败的情况吧
黑子
好像不行吧

1024赫兹撤回了一条消息
1024赫兹
为啥remote和host的技术栈要一致？
胡超
异步的
黑子
应该也可以不一致
毛毛
比如remote的一个点击事件怎么调用host的方法？
黑子
props呗
14:56
旺仔牛奶
verder 和chunck 有啥区别
后面讲
vendor是第三方的意思，指的是第三方的 chunk
chunk 是代码块，也就是模块集合
vendor就是第三方代码块，也就是第三方模块的集合 lodash react react-dom
陈刚
remote这个只能启动服务，不能打包成静态资源吗？
小海
publicPath 指向的打包的静态路径吧
不是的

陈刚
比如说上线以后，这个remote必须启动一个服务

老师远程和本地怎么进行通信呢
毛毛
比如事件的通信


如果是有提交地址呢 用的是提供的项目还是使用项目?
火神
remote里的ajax请求会跨域吗？
各个模块都是独立开发的，各自请求各自的接口。
一般来说服务器也要处理跨域的问题
XMLHttp-Request-Allow-Origin:['3000','8000']
黑子
放在一个服务也可以吧,把dist放进去,就相当于把dist也起了服务了吧
也可以启动一个http服务
陈刚
我觉得可行，黑子
初心
pulicPath和contentBase区别
黑子
他问的应该是组件通信


pulicPath和contentBase区别

contentBase已经没有了，已经废弃了
替代它是static


黑子
他问的应该是组件通信
陈瑶
和后端交互的地址
黑子
都是自己配置的
毛毛
是的，远程怎么通信给host呢
黑子
看你axios怎么配置
毛毛
postmesage可以么


陈刚
怎么看起来像是配置了以后重新加载了
jaiden
这个模块联邦啥意思？它是webpack的还是 moduleFederationPlugin的
模块联邦是一种代码共享 的机制
它是通过webpack以及moduleFederationPlugin共同实现


黑子
webpack内置的插件
陈刚
引用哪里错了
陈刚
host
初心
remotes下的key是什么，用的哪个


看着像配置了共享单例，http里面加载了俩次，不应该是一次吗
旺仔牛奶
如果是安装了第三方的组件库（是我们内部编写的），也可以用模块联邦嘛
UMi4
小哈
host里面引用了remote，这个remote引用同样的host，就是嵌套互相引能行吗？
可以的

function a(){
    b();
}
function b(){
    a();
}
AZHENG
刚才没看出来shared起的作用呢
毛毛
那和name的区别呢
悟空
这个8000的地址是不是动态给的  真实的项目中
陈刚
刚才没看出来shared起的作用呢。+1
唐开放
1024
旺仔牛奶
如果是安装了第三方的组件库（是我们内部编写的），也可以用模块联邦嘛，比如是package.JSON 的wzd第三方，再配置的时候如何配置呢

webpack_sharing_consume_default_react_react


我有个问题，这个联邦模块，是提取公共的chunk吗？不是
提取公共的Chunk, SplitChunkPlugin
和我们以前手动打包绑定providePlugin全局模块，有什么区别你就是？

也不是打包全局模块。只是提供一些全局共享变量

黑子
看一下bookstrap文件
毛毛
感觉和打成esmodule插件有点像

