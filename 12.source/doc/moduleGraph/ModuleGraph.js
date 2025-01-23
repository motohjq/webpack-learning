
class ModuleGraph{
    constructor(){
        //记录依赖的信息
        this._dependencyMap = new Map();
        //记录模块之间的关系
        this._moduleMap = new Map();
    }
}
module.exports = ModuleGraph;