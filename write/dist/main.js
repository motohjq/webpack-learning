(() => { 
var __webpack_modules__ = ({

 "./src/title.js":
 ((module, __webpack_exports__, webpackRequire) => {

webpackRequire.r(__webpack_exports__);
webpackRequire.d(__webpack_exports__, {"default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
const webpackDefaultExport = ('title');

 })

});
// The module cache
var __webpack_module_cache__ = {};

// The require function
function webpackRequire(moduleId) {

			var cachedModule = __webpack_module_cache__[moduleId];
			if (cachedModule !== undefined) {
				return cachedModule.exports;
			}
			var module = __webpack_module_cache__[moduleId] = { exports: {} };
			__webpack_modules__[moduleId](module, module.exports, webpackRequire);
			return module.exports
}


				(() => {
				webpackRequire.d = (exports, definition) => {
					for (var key in definition) {
						if (webpackRequire.o(definition, key) && !webpackRequire.o(exports, key)) {
							Object.defineProperty(exports, key, {
								enumerable: true,
								get: definition[key]
							});
						}
					}
				};
			})();
			(() => {
				webpackRequire.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
			})();
			(() => {
				webpackRequire.r = exports => {
					if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
						Object.defineProperty(exports, Symbol.toStringTag, {
							value: 'Module'
						});
					}
					Object.defineProperty(exports, 'esmodule', {
						value: true
					});
				};
			})();
		var __webpack_exports__ = {};
(() => {
var _title__WEBPACK_IMPORTED_MODULE_0__ = webpackRequire("./src/title.js");
webpackRequire.r(__webpack_exports__);

console.log(_title__WEBPACK_IMPORTED_MODULE_0__["default"]);

})();

})()
;