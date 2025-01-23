const postcssModuleScope = require('./postcss-modules-scope');
function getImportCode(imports) {
  let code = '';
  for (const item of imports) {
    const { importName, url } = item;
    code += `var ${importName} = require(${url});\r\n`;
  }
  return code;
}
function getModuleCode(result, api, replacements) {
  //获取CSS的文本内容
  let code = JSON.stringify(result.css);
  let beforeCode = `var cssLoaderExport = cssLoaderApiImport(cssLoaderApiNoSourcemapImport);\r\n`;
  for (const item of api) {
    beforeCode += `cssLoaderExport.i(${item.importName});\n`;
  }
  for (const item of replacements) {
    const { importName, replacementName } = item;
    beforeCode += `var ${replacementName} = cssLoaderGetUrlImport(${importName});`;
    code = code.replace(
      new RegExp(replacementName, 'g'),
      () => `"+${replacementName}+"`
    );
  }
  return `${beforeCode}cssLoaderExport.push([module.id, ${code}, ""]);`;
}
function getExportCode(exports, options) {
  let code = '';
  let localsCode = '';
  function addExportToLocalsCode(name, value) {
    if (localsCode) {
      localsCode += `,\n`;
    }
    localsCode += `\t${JSON.stringify(name)}:${JSON.stringify(value)}`;
  }
  for (const { name, value } of exports) {
    addExportToLocalsCode(name, value);
  }
  if (options.modules.exportOnlyLocals) {
    return (options.esModule ? `export default` : `module.exports=`) + `{\n
      ${localsCode}\n
    }`;
  }
  code += `cssLoaderExport.locals = {\n
   ${localsCode}\n
  };\n`;
  code += options.esModule ? `export default cssLoaderExport` : `module.exports = cssLoaderExport;`;
  return code;
}
/**
 * 用于把请求字符串，一般是绝对路径变成相对于当的正在转换模块的相对路径
 * @param {*} loaderContext 
 * @param {*} request 
 */
function stringifyRequest(loaderContext, request) {
  //contextify是新的方法，用来计算相对路径
  //loaderContext.context当前正在转换的模块的绝对路径 
  //loaderContext.context=C:\aproject\zhufengwebpack20230305\9.css-loader\src
  //request=C:\aproject\zhufengwebpack20230305\9.css-loader\loaders\css-loader\runtime\api.js
  // ../loaders/css-loader/runtime/api.js
  return JSON.stringify(loaderContext.utils.contextify(
    loaderContext.context, request
  ));
}
//合并请求
function combineRequests(preRequest, request) {
  return preRequest + request;
}
//获取要执行几个loader
//loaders所有的loader,loaderIndex当前正在执行的loader的索引importLoader是用户配置的要执行的loader的数量
function getPreRequester({ loaders, loaderIndex }, { importLoaders = 0 }) {
  const loaderRequest = loaders
    .slice(loaderIndex, loaderIndex + importLoaders + 1)
    .map(x => x.request)
    .join('!')
  // 只要行内loader
  return `-!${loaderRequest}!`;
}
function getModulePlugins(loaderContext) {
  return [postcssModuleScope({ loaderContext })];
}
exports.getImportCode = getImportCode;
exports.stringifyRequest = stringifyRequest;
exports.getModuleCode = getModuleCode;
exports.getExportCode = getExportCode;
exports.getPreRequester = getPreRequester;
exports.combineRequests = combineRequests;
exports.getModulePlugins = getModulePlugins;