

Error: Conflict: 
Multiple chunks emit assets to the same filename bundle.js (chunks entry1 and entry2)




20:11
毛毛
这个runtime有什么用
因为我们打包出来的代码都是common.js
但是浏览器不能运行common.js
所以需要自己实现一套common.js规范，并可以运行在浏览器,核心就是一个require方法

胡江
入口可以模糊匹配吗
