module.exports = function (cssWithMappingToString) {
    var list = [];
    list.toString = function toString() {
        return this.map(function (item) {
            var content = "";
            content += cssWithMappingToString(item);
            return content;
        }).join("");
    };
    list.i = function i(modules) {
        for (var _k = 0; _k < modules.length; _k++) {
          var item = [].concat(modules[_k]);
          list.push(item);
        }
      };
    return list;
};