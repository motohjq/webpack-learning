const valueParser = require('postcss-value-parser');
function parseNode(atRule){
   const params = atRule.params;//"basic.css\"
   const valueNode = valueParser(params);
   const url = valueNode.nodes[0].value;
   return {atRule,url};//basic.css
}
const plugin = ({imports,loaderContext,urlHandler,api})=>{
  return {
    //给插件起一个名字，用来解析url路径，或者说url地址
    postcssPlugin:'postcss-url-parser',
    //prepare逻辑会在开解析CSS语法树之前触发
    prepare(){
        //存储解析到的@import规则 
        const parsedAtRules = [];
        return {
            AtRule:{
                import(atRule){//捕获@import
                    let parsedAtRule = parseNode(atRule);
                    parsedAtRules.push(parsedAtRule);
                }
            },
            async OnceExit(){
                if(parsedAtRules.length==0){
                    return;
                }
                //通过此方法可以得到一个可以用解析路径的解析器
                //因为查找loader的方法和查找普通模块的方法是不一样的
                const resolver = loaderContext.getResolve();
                for(let index = 0;index<parsedAtRules.length;index++){
                    const {atRule,url} = parsedAtRules[index];
                    //语法转换后其实这个@import 语法就消失了,删除原始的@import规则
                    //atRule来自于css语法树 
                    atRule.remove();
                    //loaderContext.context指的是模块所有的目录,resolvedUrl是绝对路径
                    const resolvedUrl = await resolver(loaderContext.context,'./'+url);
                    let importName = `cssLoaderAtRuleImport${index}`;
                    imports.push({
                        type:'url_import',//没什么用，只是让开发人员看到是哪种原因导入的
                        importName,
                        url:urlHandler(resolvedUrl)
                    });
                    api.push({importName});
                }
            }
        }
    }
  }
}
//表示这是一个postcss插件
plugin.postcss=true;
module.exports = plugin;