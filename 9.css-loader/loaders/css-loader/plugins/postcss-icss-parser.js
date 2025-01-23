const icssUtils = require('icss-utils');
const plugin = ({exports})=>{
  return {
    postcssPlugin:'postcss-icss-parser',
    //当AST遍历完了以后执行此异步
    //Once
    async OnceExit(root){
        const {icssExports} = icssUtils.extractICSS(root);
        for(const name of Object.keys(icssExports)){
            const value = icssExports[name];
            exports.push({name,value});
        }
    }
  }
}
plugin.postcss = true;
module.exports = plugin;
//提取我们在上个插件loaders\css-loader\postcss-modules-scope.js中写入:export