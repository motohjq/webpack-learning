class ModuleGraphConnection{
    /**
     * 因为父模块中的依赖才创建了这个子模块
     * a.js b.js
     * a.js=>a模块
     * 编译a模块找到b依赖
     * 然后根据b依赖创建b模块
     * 当你创建完b模块后是可以创建这样的一个关系了
     * originModule=a模块
     * module=b模块
     * =dependency=b依赖
     * @param {*} originModule 父模块
     * @param {*} module 子模块
     * @param {*} dependency 依赖
     */
    constructor(originModule,module,dependency){
        this.originModule = originModule;
        this.module = module;
        this.dependency=dependency;
    }
}
module.exports = ModuleGraphConnection