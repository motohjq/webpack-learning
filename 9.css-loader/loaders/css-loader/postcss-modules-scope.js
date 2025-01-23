
const selectorParser = require('postcss-selector-parser');
const crypto = require('crypto');
function generateScopedName(className,loaderContext){
    const hash = crypto.createHash('md4').update(loaderContext.resourcePath).digest('hex');
    return `_${hash}__${className}`;
}
const plugin = ({loaderContext})=>{
  // 返回 postcss的插件对象
  return {
    postcssPlugin:'postcss-modules-scope',
    //表示在处理postcss语法树根节点的时候走一次
    Once(root,{rule}){
        //创建一个新的空对象
        const exports = Object.create(null);
        function exportScopeName(className){
            const scopedClassName = generateScopedName(className,loaderContext)
            exports[className]=scopedClassName;
            return scopedClassName;
        }
        function localizeNode(node){
            switch(node.type){
                case 'selector':
                    node.nodes = node.map(localizeNode);
                    return node;
                case 'class':
                    // 用于生成或者说创建一个类名选择器的节点
                    return selectorParser.className({
                        value:exportScopeName(node.value)
                    }) 
            }
        }
        function traverseNode(node){
            if(node.type === 'root' || node.type ==='selector'){
                //遍历它的所有的子节点,不判断节点类型，遍历所有的子节点
                node.each(traverseNode);
                //说明找到我们想到的伪类节点
            }else if(node.type === 'pseudo' && node.value === ':local'){
                const selector = localizeNode(node.first);
                node.replaceWith(selector);
                return;
            }
            return node;
        }
        //root就是语法树的节点
        //遍历语法树中所有的规则,只遍历规则子节点
        root.walkRules(rule=>{
            //把此规则的选择器变成一个对象 :local(.background) =>新的background
            const parsedSelector = selectorParser().astSync(rule);
            rule.selector = traverseNode(parsedSelector.clone()).toString();
        });
        const exportedNames = Object.keys(exports);
        if(exportedNames.length>0){
            //rule这个工厂函数行成一个新规则 :export{}
            const exportRule = rule({
                selector:':export'
            })
            //遍历所有的老类名
            exportedNames.forEach(exportedName=>{
                //向导出规则中添加新的属性和值，也就是声明
                exportRule.append({
                    prop:exportedName,// background
                    value:exports[exportedName],//_hash__background
                    raws:{before:'\n'}
                });
            });
            //把此规则 添加到CSS语法树的根节点上
            root.append(exportRule);
            /* const importRule = rule({
                selector:':import'
            })
            root.append(importRule); */
        }
    }
  }
}
plugin.postcss = true;
module.exports = plugin;
/**
 * 1.改变了选择器的名称 :local(.background)=> _hash__background
 * 2.exports[background]= _hash__background;
 * 3.把exports写入到语法树中，以伪类的方式:export
 * 
 * :export{
 * background:_hash__background
 * }
 */