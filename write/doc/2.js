let entryModule = './src/index.js';
let entryModuleContent = `
import title from './title';
console.log(title);
`;
let titleModule = './src/title.js';
let titleModuleContent = `
export default 'title';
`;

//1.先对 index.js进行语法的分析
//第一步先触发this.hooks.program.call(ast) 
//因为HarmonyDetectionParserPlugin监听了program这个钩子，会执行对应的回调
//判断如果代码里有import(ImportDeclaration)或export,就会向index.js添加一个HarmonyCompatibilityDependency
//HarmonyCompatibilityDependency addPresentationalDependency
//依赖会在最后生成模块代码的时候添一行代码
// webpackRequire.r(webpackExports); webpackExports.esmodule=true;

//再去预遍历我们语句，主要处理导入导出
//获取每一条语句，判断如果是ImportDeclaration的话
//触发this.hooks.import.call(statement, source);这个钩子
//如果如果遇到了import语句，就会添加ConstDependency依赖
//在生成模块代码的时候，如果此模块有ConstDependency依赖，则删除对应的import语句

//如果发现有import语句，还会再添加一个依赖 HarmonyImportSideEffectDependency
//parser.state.module.addDependency(sideEffectDep);
//此依赖会在生成代码的时候，插入一行代码
//删除原import导入，变成commonjs导入
//var _titlewebpackImportedModule0 = webpackRequire("./src/title.js");
//另外放在addDependency里依赖，在当前模块编译后还要递归创建模块并递归编译

//然后遍历真个语法中的出现所有的变量
//判断此变量是不是外部导入的，如果是的话
//添加HarmonyImportSpecifierDependency依赖
//此依赖会在生成代码的时候，把此变量名改掉
// title=>_titlewebpackImportedModule0["default"]

//老师这个能拿到是局部，不能拿到是全局的能再解释一下么
//const oldInfo = this.scope.definitions.get(name);
//因为我们把外部导入的变量在解析导入语句的时候已经 保存到了definitions
//那么我们用标记符从definitions取值的，如果能取到的值，那说明此变量就是使用外部导入的变量
//如果不能取到值，就是模块内创建的变量，而非外部导入的变量



//因为由于添加了HarmonyImportSideEffectDependency
//所以webpack会递归的添加并且遍译title模块
//因为里面有export语句，所以添加依赖 //HarmonyCompatibilityDependency addPresentationalDependency
//this.hooks.export.call(statement);
//this.hooks.exportExpression.call(statement, statement.declaration)
//会添加HarmonyExportHeaderDependency依赖
//会再添加一个HarmonyExportExpressionDependency依赖


let code1 = `export default 'title';`

//HarmonyExportHeaderDependency 负责删除 export default
let code2 = `'title'`;

//再经地HarmonyExportExpressionDependency处理的
let code3 = `const webpackDefaultExport = 'title'`;
//添加导出定义
webpackRequire.d(webpackExports, {
    "default": () => webpackDefaultExport
  });