const valueParser = require('postcss-value-parser');
const cssText = `background-image: url(./images/logo.png);`;
const parsedValue = valueParser(cssText);
console.log(parsedValue.nodes);
parsedValue.walk((node)=>{
    //console.log(node);
    if(node.type === 'function'){
        //console.log(node.value);
        //console.log(node.nodes);
        node.nodes[0].value = '新的图片路径';
    }
});
const serializedValue = valueParser.stringify(parsedValue);

//background-image: url(./images/logo.png); 是一个声明
//valueParser可以把声明的值转成语法树
//url(./images/logo.png)
let parsed = [
    {
      type: 'word',
      value: 'background-image'
    },
    {
      type: 'div',//属性和值的分割值 divide
      value: ':',
    },
    {
      type: 'function',
      value: 'url',
      nodes: [ [Object] ],
    },
    { type: 'word', value: ';' }
  ]
