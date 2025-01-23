
const valueParser = require('postcss-value-parser');
const needParseDeclaration = /(?:url)\(/i;//url(
const isUrlFunc = /url/i;
function parseDeclaration(declaration){
    //如果声明的值里不包含需要解析的url函数，则跳过解析
    if(!needParseDeclaration.test(declaration.value)){
        return [];
    }
    //用postcss-value-parser解析声明的值，得到一个节点数
    const parsed = valueParser(declaration.value);
    const parsedURLs = [];
    //使用walk方法遍历语法树各个节点
    parsed.walk(valueNode=>{
        if(valueNode.type !== 'function'){//url
            return;
        }
        //判断url的名字叫url
        if(isUrlFunc.test(valueNode.value)){
            //从当前的函数节点中提取子节点数组
            const {nodes}= valueNode;
            //把子节点数组转换为字符串 './images/logo.png'
            const url = valueParser.stringify(nodes)
            parsedURLs.push({
                declaration,//声明本身  background-image: url(./images/logo.png);
                node:nodes[0],//{ value: './images/logo.png'}
                url,//'./images/logo.png'
                parsed //当前声明的节点语法树
            });
        }
    });
    return parsedURLs;
}

/**
 * 此插件的功能是要找到CSS源代码中的url地址
 * @param {*} options 插件选项 
 * @returns 
 */
const plugin = ({imports,urlHandler,replacements})=>{
  return {
    //给插件起一个名字，用来解析url路径，或者说url地址
    postcssPlugin:'postcss-url-parser',
    //prepare逻辑会在开解析CSS语法树之前触发
    prepare(){
        //定义一个数组，用于存储解析好的url声明
        const parsedDeclaration = [];
        return {
            //在postcss内部会进行语法树的遍历，当遍历到Declaration节点的时候，就会进入此函数进行处理
            Declaration(declaration){
                //通过parseDeclaration解析声明,获取解析后的值 
                const parsedURLs = parseDeclaration(declaration);
                parsedDeclaration.push(...parsedURLs);
            },
            //定义用于处理post处理结束的时候的逻辑
            OnceExit(){
              //如果CSS没有引入任何url,直接 返回
              if(parsedDeclaration.length === 0 ){
                return;
              }
              imports.push( {
                type:'get_url_import',
                importName:'cssLoaderGetUrlImport',
                url:urlHandler(require.resolve('../runtime/getUrl'))
              });
              //遍历所有的url路径
              for(let index = 0;index<parsedDeclaration.length;index++){
                const item = parsedDeclaration[index];
                const {url,node} = item;//./src/images/logo.png
                // 将URL导入信息添加到imports数组
                const importName = `cssLoaderUrlImport_${index}`
                //把图片的放入import以便 未来在模块内部加载此图片
                imports.push({
                    type:'url',//没什么用只是用来标识 一下是什么原因导致引入的此模块
                    importName,
                    url:JSON.stringify(url)
                })
                //为当前的url地址生成一个新的替换名称
                //这个变量有点像占位符
                const replacementName =`cssLoaderUrlReplacement${index}`;
                replacements.push({
                    replacementName,//替换后的名称
                    importName//这是要替换的名称
                });
                //把节点的值改为替换后的变量名
                node.value = replacementName;
                //修改语法树
                item.declaration.value = item.parsed.toString()
              }
            }
        }
    }
  }
}
//表示这是一个postcss插件
plugin.postcss=true;
module.exports = plugin;