
const ModuleGraph = require('./ModuleGraph');
const ModuleGraphConnection = require('./ModuleGraphConnection');
const ModuleGraphModule = require('./ModuleGraphModule');
const NormalModule = require('./NormalModule');
const HarmonyImportSideEffectDependency = require('./HarmonyImportSideEffectDependency');
//1.创建模块依赖图
const moduleGraph = new ModuleGraph();
//2.创建入口依赖
const indexEntryDependency = new EntryDependency('./src/index.js');
//3.创建入口模块
let indexModule = new NormalModule('./src/index.js');
//4.每当创建 一个新的模块，就会有一个新的关系
//创建关系
const indexModuleGraphConnection = new ModuleGraphConnection(
    null, indexModule, indexEntryDependency
);
//5.把依赖和连接对象对应关系保存下来
moduleGraph._dependencyMap.set(indexEntryDependency, indexModuleGraphConnection);
//6.创建模块信息对象
const indexModuleGraphModule = new ModuleGraphModule(indexModule);
//把此模块对应的依赖关系放在_moduleMap
moduleGraph._moduleMap.set(indexModule, indexModuleGraphModule);

//开始编译 indexModule
//解析它的时候添加一些依赖 index.js title.js
//ES module导入一个模块产生的依赖
const harmonyImportSideEffectDependency = new HarmonyImportSideEffectDependency('./src/index.js')
//7.如果代码中出现了import xxx ,就会向indexModule添加一个依赖
indexModule.addDependency(harmonyImportSideEffectDependency);
processModuleDependencies();
//8.创建依赖对应的模块
let titleModule = new NormalModule('./src/title.js');
//创建一个新的连接 此连接 是 index.js引用title.js产生的连接 
const titleModuleGraphConnection = new ModuleGraphConnection(
    indexModule, titleModule, harmonyImportSideEffectDependency
);
moduleGraph._dependencyMap.set(harmonyImportSideEffectDependency, titleModuleGraphConnection);
const titleModuleGraphModule = new ModuleGraphModule(titleModule);
titleModuleGraphModule.incomingConnections.add(titleModuleGraphConnection);
indexModuleGraphModule.outgoingConnections.add(titleModuleGraphConnection);
moduleGraph._moduleMap.set(titleModule, titleModuleGraphModule);


addEntry(indexEntryDependency);
function addEntry(indexEntryDependency) {}
//处理模块依赖
function processModuleDependencies() { 
    for (const dependency of indexModule.dependencies) {
        //根据依赖创建模块
    }
}