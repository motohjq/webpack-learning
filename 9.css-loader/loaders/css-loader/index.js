const {getImportCode,getModuleCode,getExportCode,stringifyRequest,
    combineRequests,getPreRequester,getModulePlugins} = require('./utils');
const postcss = require('postcss');//babel postcss可以转源码为语法树，修改语法树，生成源代码
const urlParser = require('./plugins/postcss-url-parser');
const importerParser = require('./plugins/postcss-importer-parser');
const icssParser = require('./plugins/postcss-icss-parser');
/**
 * @param {*} content 将要转换的CSS文件的源代码 "body{\r\ncolor:red;\r\n}"
 */
function loader(content){
    //调用async方法可以把同步变成异步执行
    const callback = this.async();
    const options = this.getOptions();
    //这是我将要使用的postcss插件 ，类似比babel插件
    const plugins = [];
    //替换的变量名
    const replacements = [];
    const exports = [];
    //如果modules为true
    if(options.modules){
        plugins.push(...getModulePlugins(this));
        plugins.push(icssParser({
            loaderContext:this,
            exports
        }));
    }
    //由于url插件导致的新导入的模块
    const urlPluginImports = [];
    //定义将要通过import导入引入的模块
    const importPluginImports = [];
    //存放将来要调用i方法的模块
    const importPluginApi = [];
    if(options.import){
        plugins.push(importerParser({
            imports:importPluginImports,
            //loader函数中的this指针
            loaderContext:this,
            api:importPluginApi,
            //可以把绝对路径变成相对路径
            urlHandler:url=>stringifyRequest(this,
                combineRequests(
                    // -!css-loader!logger-loader2!
                    getPreRequester(this,options),//代表要执行的loaders
                    // basic.css
                    url//代表要处理的文件的绝对路径
                )
            ),
        }));
    }
    //如果在配置文件中配置了需要解析url地址
    if(options.url){
        plugins.push(urlParser({
            imports:urlPluginImports,
            replacements,
            urlHandler:url=>stringifyRequest(this,url)
        }));
    }
    //配置好postcss插件，并且开始处理css源代码
    postcss(plugins)
    //处理的时候变成CSS抽象语法树
    .process(content,{from:this.resourcePath,to:this.resourcePath})
    .then(result=>{
        const imports = [
            {
                importName:'cssLoaderApiNoSourcemapImport',
                url:stringifyRequest(this,require.resolve('./runtime/noSourceMaps'))
            },
            {
                importName:'cssLoaderApiImport',
                url:stringifyRequest(this,require.resolve('./runtime/api'))
            }
        ]
        imports.push(...importPluginImports,...urlPluginImports);
        const importCode = getImportCode(imports);
        const moduleCode = getModuleCode(result,importPluginApi,replacements);
        const exportCode = getExportCode(exports,options);
        callback(null,`${importCode}${moduleCode}${exportCode}`);
    })
    
}
module.exports = loader;