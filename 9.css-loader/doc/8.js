const icssUtils = require('icss-utils');
const postcss = require('postcss');
const plugin = ()=>{
  return {
    postcssPlugin:'postcss-icss-parser',
    OnceExit(root){
        const {icssExports} = icssUtils.extractICSS(root);
        console.log('icssExports',icssExports);
    }
  }
}
const inputCSS = `
.bak{}
:export{
    oldClassName:newClassName
}
`;
plugin.postcss = true;
const result = postcss([plugin()]).process(inputCSS);
console.log('##',result.css,'###');

//没明白exports最终映射是什么作用
