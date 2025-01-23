const {AsyncSeriesBailHook} = require('tapable');
const NormalModule = require('./NormalModule');
class NormalModuleFactory{
    constructor(){
        this.hooks = {
            factorize: new AsyncSeriesBailHook(["resolveData"])
        }
        //这是异步串行保险钩子，一个一个执行，如果有一个回调函数有返回值，就直接结束
        //这个才是真正的普通模块生产模块的地方 
        this.hooks.factorize.tapAsync("NormalModuleFactory",
			(resolveData, callback) => {
                //在普通模块工厂解析模块时触发的钩子
                this.hooks.resolve.callAsync(resolveData, (err, result) => {
                    //如果返回了一个模块，就直接结束
                    if (result instanceof Module) return callback(null, result);
                    //解析普通模块之后触发的钩子
                    this.hooks.afterResolve.callAsync(resolveData, (err, result) => {
                        //可以通过resolveData进行进行解析，获得createData
                        //resolveData={context,request}
                        //resolve就是获取或者解析出模块文件的绝对路径
                        //createData={context,request:'c:/project/src/index.js',type:'javascript/auto'}
                        const createData = resolveData.createData;
                        //在创建普通模块之前触发的钩子
                        this.hooks.createModule.callAsync(
							createData,
							resolveData,
							(err, createdModule) => {
                                ///根据createData创模块NormalModule
                                createdModule = new NormalModule((createData));
                                //在普通模块创建后触发的钩子
                                createdModule = this.hooks.module.call(
									createdModule,
									createData,
									resolveData
								);
								return callback(null, createdModule);
                            })

                    })
                })
        })
    }
    /**
     * 创建一个普通模块
     * @param {*} data 
     * @param {*} callback 
     */
    create(data, callback) {
        //依赖数组 EntryDependency
        const dependencies = data.dependencies;
        //根目录
		const context = data.context;
        //EntryDependency
		const dependency = dependencies[0];
        //此入口请求的资源 './src/index.js'
		const request = dependency.request;
        //用来解析的数据
        const resolveData = {
			context,
			request //./src/index.js
		};
        //解析普通模块之前触发的钩子
        this.hooks.beforeResolve.callAsync(resolveData, (err, result) => {
            //在普通模块工厂创建模块之前触发的钩子
            //我们后会手写插件，通过此钩子你可以拦截创模块流程
            //此钩子用来创建模块
            this.hooks.factorize.callAsync(resolveData, (err, module) => {
                const factoryResult = {module};
				callback(err, factoryResult);
            })
        })

    }
}
module.exports = NormalModuleFactory;