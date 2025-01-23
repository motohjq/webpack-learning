
class Hook{
    constructor(args){
        //指的是回调函数参数列表数组['name']
        if(!Array.isArray(args)) args = [];
        //保存参数数组
        this.args = args;
        //用来存放所有的回调函数对象
        this.taps = [];//this.taps.map(tap=>tap.fn)
        //此变量刚开始是没有值的，后面会设置为回调函数的数组
        this._x = undefined;
        this.call = CALL_DELEGATE;
        this.callAsync = CALL_ASYNC_DELEGATE;
        this.promise = PROMISE_DELEGATE;
        //存放拦截器的数组
        this.interceptors=[];
    }
    /**
     * 注册事件函数或者说回调函数
     * @param {*} options 可以是一个对象，也可以是字符串,如果是字符串等同于{name:字符串}
     * @param {*} fn 
     */
    tap(options,fn){
        //用tap注册的就是sync类型的tapInfo
        this._tap('sync',options,fn);
    }
    tapAsync(options,fn){
        this._tap('async',options,fn);
    }
    tapPromise(options,fn){
        this._tap('promise',options,fn);
    }
    _tap(type,options,fn){
        if(typeof options === 'string'){
            options={name:options}
        }
        let tapInfo = {...options,type,fn};
        //注册拦截器可以用来对tapInfo做一些修改
        tapInfo = this._runRegisterInterceptors(tapInfo);
        this._insert(tapInfo);
    }
    intercept(interceptor){
        this.interceptors.push(interceptor);
    }
    _runRegisterInterceptors(tapInfo){
        for(const interceptor of this.interceptors){
            if(interceptor.register){
                let newTapInfo = interceptor.register(tapInfo);
                if(newTapInfo){
                    tapInfo = newTapInfo;
                }
            }
        }
        return tapInfo;
    }
    _insert(tapInfo){
        let before;
        if(typeof tapInfo.before === 'string'){
            before = new Set([tapInfo.before]);
        }else if(Array.isArray(tapInfo.before)){
            before=new Set(tapInfo.before);//tap3,tap5
        }
         let stage = 0;
        if(typeof tapInfo.stage === 'number'){
            stage=tapInfo.stage;//2
        }
        let i = this.taps.length;//3 现在有的回调数组长度为3
        //从下往上找，找到第一个比当前要插入的stage小的元素，插到那个元素下面就可以
        while(i>0){
            i--;
            const x = this.taps[i];
            this.taps[i+1]=x;
            const xStage = x.stage||0;
            if(before){
                if(before.has(x.name)){
                    before.delete(x.name);
                    continue;
                }
                if(before.size >0){
                    continue;
                }
            }
            if(xStage >stage){
                continue;
            }
            i++;
            break;
        }
        this.taps[i]=tapInfo; 
       /*  this.taps.push(tapInfo);
        this.taps.sort((a,b)=>(a.stage||0)-(b.stage||0)) */
    }
    compile(options){
        throw new Error(`Abstract Method Error,Should be overridden`)
    }
    _createCall(type){
        return this.compile({
            type,//类型 sync async promise
            taps:this.taps,//回调数组
            interceptors:this.interceptors,
            args:this.args//形参数组
        });
    }
}
/**
 * 这是一个代理的call方法
 * @param  {...any} args 参数列表，args是一个数组
 * @returns 
 */
const CALL_DELEGATE = function(...args){
    //动态编译出来一个函数赋给this.call new Function()
    this.call = this._createCall('sync');
    //返回this.call的结果
    return this.call(...args);
}
const CALL_ASYNC_DELEGATE = function(...args){
    //动态编译出来一个函数赋给this.call new Function()
    this.callAsync = this._createCall('async');
    //返回this.call的结果
    return this.callAsync(...args);
}
const PROMISE_DELEGATE = function(...args){
    //动态编译出来一个函数赋给this.call new Function()
    this.promise = this._createCall('promise');
    //返回this.call的结果
    return this.promise(...args);
}
module.exports = Hook;