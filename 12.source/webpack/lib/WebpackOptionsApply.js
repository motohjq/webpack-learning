
const EntryOptionPlugin = require('./EntryOptionPlugin');
const EntryPlugin = require("./EntryPlugin");
class WebpackOptionsApply{
  process(options, compiler){
    new EntryOptionPlugin().apply(compiler);
    //8.触发entryOption钩子：在解析入口选项前，Compiler触发entryOption钩子事件
    compiler.hooks.entryOption.call(options.context, options.entry);
  }
 
}
module.exports = WebpackOptionsApply;