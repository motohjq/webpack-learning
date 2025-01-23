//获取一个处理url地址的函数
var cssLoaderGetUrlImport = webpackRequire("./node_modules/css-loader/dist/runtime/getUrl.js");
//获取图片的路径
var cssLoaderUrlImport0 = webpackRequire("./src/images/logo.png");
//调用url处理函数计算新的路径
var cssLoaderUrlReplacement0 = cssLoaderGetUrlImport(cssLoaderUrlImport0);
cssLoaderExport.push(
    [
        module.id, "body{\r\n    color:red;\r\n    background-image: url(" + cssLoaderUrlReplacement0 + ");\r\n    background-repeat: no-repeat;\r\n}", ""]);
//要想找包出这样的代码
//1.导入getUrl.js
//2.导入图片路径
//3.替换url里的参数为新的图片路径
// ./src/images/logo.png
//url(./src/images/logo.png)
// url(cssLoaderUrlReplacement0)
//最后在生成代码的时候还要再替换一次
//url(" + cssLoaderUrlReplacement0 + ")