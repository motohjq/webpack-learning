
var webpackModules = {
  "./src/index.css": (module, unusedWebpackExports, webpackRequire) => {
    //import导入别的模块
    var cssLoaderApiNoSourcemapImport = webpackRequire("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
    var cssLoaderApiImport = webpackRequire("./node_modules/css-loader/dist/runtime/api.js");
    //模块代码
    var cssLoaderExport = cssLoaderApiImport(cssLoaderApiNoSourcemapImport);
    cssLoaderExport.push([module.id, "body{\r\n    color:red;\r\n}", ""]);
    //导出内容
    module.exports = cssLoaderExport;
  },
  "./node_modules/css-loader/dist/runtime/api.js": module => {
    module.exports = function (cssWithMappingToString) {
      var list = [];
      list.toString = function toString() {
        return this.map(function (item) {
          var content = "";
          content += cssWithMappingToString(item);
          return content;
        }).join("");
      };
      return list;
    };
  },
  "./node_modules/css-loader/dist/runtime/noSourceMaps.js": module => {
    "use strict";
    module.exports = function (i) {
      return i[1];
    };
  }
};
var webpackModuleCache = {};
function webpackRequire(moduleId) {
  var cachedModule = webpackModuleCache[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = webpackModuleCache[moduleId] = {
    id: moduleId,
    exports: {}
  };
  webpackModules[moduleId](module, module.exports, webpackRequire);
  return module.exports;
}
debugger
const indexCss = webpackRequire("./src/index.css");
console.log(indexCss);

