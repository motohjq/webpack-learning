var webpackModules = {
    './src/index.css':(module,exports,require)=>{
        //用来获取数组中的第2个元素 
        const noSourceMaps = require("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
        const  api = require('./node_modules/css-loader/dist/runtime/api.js');
        const cssLoaderExport = api(noSourceMaps)
        cssLoaderExport.push([module.id,"body{\r\ncolor:red;\r\n}",""]);
        module.exports = cssLoaderExport;// cssLoaderExport.toString()
    },
    "./node_modules/css-loader/dist/runtime/api.js":(module)=>{
         module.exports = (cssWithMappingToString)=>{
            var list = [];
            list.toString = function(){
                return this.map(item=>{
                    var content = '';
                    content += cssWithMappingToString(item);
                    return content;
                }).join('\r\n');
            }
            return list;
         }
    },//   ./node_modules\css-loader\dist\runtime\noSourceMaps.js
    "./node_modules/css-loader/dist/runtime/noSourceMaps.js":(module)=>{
        module.exports = (i)=> i[1];
    }
}
function require(moduleId){
    var module = {
        id:moduleId,
        exports:{}
    }
    webpackModules[moduleId](module,module.exports,require)
    return module.exports;
}
debugger
const indexCss = require('./src/index.css');
console.log(indexCss,indexCss.toString());