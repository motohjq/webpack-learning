
const path = require('path');
console.log('====================================');
//解析获取绝对路径
//C:\aproject\zhufengwebpack20230305\9.css-loader\loaders\css-loader\runtime\api.js
//解析出来的是一个路径，文件在不在没关系
console.log(path.resolve('./runtime/api'));
//找的一个文件,如果文件不存在可有会报错
console.log(require.resolve('./runtime/api'));
console.log('====================================');

//第一个区别
//path.resolve解析出来的是一个路径，文件在不在没关系
//require.resolve找的一个文件,如果文件不存在可有会报错
//C:\aproject\zhufengwebpack20230305\9.css-loader\loaders\css-loader\runtime\api
//C:\aproject\zhufengwebpack20230305\9.css-loader\loaders\css-loader\runtime\api.js

//第二个区别
//path.resolve是从执行命令所在的目录里开始查找的
//require.resolve是从模块所在的目录里开始查找的
//C:\aproject\zhufengwebpack20230305\9.css-loader>
//C:\aproject\zhufengwebpack20230305\9.css-loader\runtime\api
//C:\aproject\zhufengwebpack20230305\9.css-loader\loaders\css-loader\runtime\api.js