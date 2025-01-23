const Dependency = require("../Dependency");
/**
 * 所有模块依赖的父类
 */
class ModuleDependency extends Dependency {
  constructor(request) {
    super();
    this.request = request;
  }
}
module.exports = ModuleDependency;