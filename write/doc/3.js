let oldCode = `
import title from './title';
console.log(title);
`;

//HarmonyCompatibilityDependency

let oldCode2 = `
webpackRequire.r(webpackExports);
import title from './title';
console.log(title);
`;

//ConstDependency

let oldCode3 = `
webpackRequire.r(webpackExports);
console.log(title);
`;

//HarmonyImportSideEffectDependency

let oldCode4 = `
webpackRequire.r(webpackExports);
var _titlewebpackImportedModule0 = webpackRequire("./src/title.js");
console.log(title);
`;

//HarmonyImportSpecifierDependency

let oldCode5 = `
webpackRequire.r(webpackExports);
var _titlewebpackImportedModule0 = webpackRequire("./src/title.js");
console.log(_titlewebpackImportedModule0.default);
`;
