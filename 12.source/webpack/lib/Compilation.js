const {SyncHook} = require('tapable');
const ModuleGraph = require("./ModuleGraph");
class Compilation{
    constructor(){
        this.dependencyFactories = new Map();
        //存放入口key入口的名称，值是entryData的数据对象，里面有入口的名称和依赖的数组
        this.entries = new Map();
        //这是一个放置所有的模块的集合
        this.modules = new Set();
         //这是一个放置所有的模块的集合
        this._modules = new Map();
        //模块依赖图 a.js b.js c.js
        this.moduleGraph = new ModuleGraph();
        this.hooks = {
            seal: new SyncHook([]),
            addEntry: new SyncHook(["entry", "options"]),
            succeedEntry: new SyncHook(["entry", "options", "module"]),
        }
    }
    /**
     * 1.addEntry方法用于向编译过程中添加入口点
     * @param {*} context 根目录
     * @param {*} entry ./src/index.js
     * @param {*} optionsOrName main
     * @param {*} callback 最终的回调
     */
    addEntry(context, entry, options, callback) {
        this._addEntryItem(context, entry, "dependencies", options, callback);
    }
    _addEntryItem(context, entry, target, options, callback) {
        //先获取此入口的名称
        const { name } = options;//name=main
        //获取入口数据
        let entryData = {
            dependencies: [],
            options
        };
        //把EntryDependency添加到entryData.dependencies
        entryData[target].push(entry);
		this.entries.set(name, entryData);
        //触发一个addEntry这个钩子
        this.hooks.addEntry.call(entry, options);
        //才是真正的构建的逻辑
        //2.addModuleTree方法用于向Compilation中添加整个模块树，并构建相应的依赖关系
        this.addModuleTree(
			{context,dependency: entry},
			(err, module) => {
                //在入口模块构建成功后触发的钩子
                this.hooks.succeedEntry.call(entry, options, module);
				return callback(null, module);
        })
    }
    addModuleTree({ context, dependency }, callback){
        //EntryDependency
        const Dep = dependency.constructor;
        //normalModuleFactory
        const moduleFactory = this.dependencyFactories.get(Dep);
        //根据文件的类型通过不同的模块工厂创建模块
        this.handleModuleCreation({
            factory: moduleFactory,
            dependencies: [dependency],
            context
        },(err, result) => {
            callback(err, result);
        });
    }
    //开始创建模块
    handleModuleCreation({factory,dependencies,context},callback){
        //获取模块依赖图
        //const moduleGraph = this.moduleGraph;
        this._factorizeModule({factory,dependencies,context},(err, factoryResult) => {
            const newModule = factoryResult.module;
            this._addModule(newModule, (err, module) => {
                //遍历所有的依赖，建立依赖关系图
                for (let i = 0; i < dependencies.length; i++) {
                    const dependency = dependencies[i];
                    //记录模块之间的依赖关系
                    //含义就是父模块通过此依赖添加了子模块 module
                    //因为当前的依赖entryDependency,所以说没有父级模块，null
                    moduleGraph.setResolvedModule(
                        null,//父模块
                        dependency,//依赖
                        module//新的模块实例
                    );
                    //处理模块的构建和依赖
                    //核心编译此模块，编译 就是把源代码转成抽象语法树，找到里面依赖的模块
                    //然后递归本步骤进行编译 依赖的模块，直到所有的模导都编译完毕
                    this._handleModuleBuildAndDependencies(
						originModule,
						module,
						recursive,
						callback
					);
                }
            })
        })

    }
    _handleModuleBuildAndDependencies(originModule, module, recursive, callback){
        //开始编译当前的模块
        this.buildModule(module, err => {
            //编译成功之后，就可以获取到它依赖的模块，处理模块的依赖
            this.processModuleDependencies(module, err => {
				callback(err, module);
			});
        })
    }
    buildModule(){

    }
    processModuleDependencies(){
        
    }
    _addModule(module, callback) {
        //获取模块的绝对路径
        const identifier = module.identifier();
        //设置模块的绝对路径和模块之间的对应关系
        this._modules.set(identifier, module);
        //把此新创建的模块添加到module集合
        this.modules.add(module);
        callback(null, module);
    }
    /**
     * 通过模块工厂创建模块
     * @param {*} factory NormalModuleFactory 
     * @param {*} callback 
     */
    _factorizeModule({factory,dependencies,context},callback){
        //调用工厂NormalModuleFactory方法的create方法创建一个模块 NormalModule
        factory.create({
            context,
            dependencies
        },(err, result) => {
            callback(err, result);
        });
    }
    finish(callback){
        return callback();
    }
    //把模块封装成代码块
    seal(callback){
        this.hooks.seal.call();
        return callback();
    }
}
module.exports = Compilation;