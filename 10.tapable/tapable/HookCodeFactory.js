
class HookCodeFactory{
    /**
     * 初始化hook代码工厂
     * @param {*} hookInstance hook实例
     * @param {*} options 选项 type args taps
     */
    setup(hookInstance,options){
        //把回调函数全部取出来变成数组赋给_x
        hookInstance._x=options.taps.map(item=>item.fn);
    }
    init(options){
        //把选项对象保存到工厂的options属性上
        this.options = options;
    }
    args(options={}){
      const {before,after} = options;
      //获取原来的形参数组['name','age']
      let allArgs = this.options.args;
      if(before){
        allArgs=[before,...allArgs]
      }
      if(after){
        allArgs=[...allArgs,after]
      }
      if(allArgs.length>0){
        return allArgs.join(', ') ;// name,age
      }
      return '';
    }
    header(){
        let code = '';
        code += `var _x = this._x;\n`;
        const {interceptors} = this.options;
        if(interceptors.length>0){
            code += `var _taps = this.taps;`;
            code += `var _interceptors = this.interceptors;`;
        }
        for(let i=0;i<interceptors.length;i++){
            const interceptor = interceptors[i];
            if(interceptor.call){
                code += `_interceptors[${i}].call(${this.args()});\n`;
            }
        }

        return code;
    }
    create(options){
        this.init(options);
        let fn ;
        switch(options.type){
            case 'sync':
                fn = new Function(
                    this.args(),//name,age
                    this.header()+this.content()
                )
                break;
            case 'async':
                fn = new Function(
                    this.args({after:'_callback'}),
                    this.header()+this.content({onDone:()=>`_callback();`})
                )    
                break;
            case 'promise':
                    let tapsContent = this.content({onDone:()=>`_resolve();`});
                    let content = `
                    return new Promise(function (_resolve, _reject) {
                        ${tapsContent}
                    });
                    `;
                    fn = new Function(
                        this.args(),
                        this.header()+content
                    ) 
            default:
                break;    
        }
        return fn;
    }
    callTapsParallel({onDone}){
        let {taps=[]} = this.options;
        let code = `var _counter = ${taps.length};\n`;
        code += `
          var _done = (function() {
            ${onDone()}
          });
        `;
        for(let i=0;i<taps.length;i++){
            const content = this.callTap(i);
            code+=content;
        }
        return code;
    }
    callTapsSeries(options={onDone:()=>``}){
        let {taps=[]} = this.options;
        if(taps.length===0) return options.onDone();//_callback();
        let code = '';
        let current = options.onDone;//_callback();
        for(let j=taps.length-1;j>=0;j--){//j 2 1 0
            const i = j;
            //如果不一样，说是需要包裹
            //不是第一个，并且类型不同同步的话才会为true
            const unroll = (current !== options.onDone)&&(taps[i].type !== "sync" );;//_callback();
            if(unroll){
                code += `function _next${i}() {\n`;
                code += current();
                code += ` }`;
                current = ()=>`_next${i}();`;
            }
            const done = current;//_next1();
            const content = this.callTap(i,{onDone:done});
            current = ()=>content;
            //onDone: !onResult && done
        }
        code += current();
        return code;
    }
    //var _fn0 = _x[0];
    //_fn0(name, age);
    callTap(tapIndex,{onDone}){
        let code = '';
        const {interceptors} = this.options;
        if(interceptors.length>0){
            code += `var _tap${tapIndex} = _taps[${tapIndex}];\n`;
            for(let i=0;i<interceptors.length;i++){
                const interceptor = interceptors[i];
                if(interceptor.tap){
                        code += `_interceptors[${i}].tap(_tap${tapIndex});\n`;
                }
            }
        }
        code += `var _fn${tapIndex} = _x[${tapIndex}];\n`;
        let tapInfo = this.options.taps[tapIndex];
        switch(tapInfo.type){
            case 'sync':
                code += `_fn${tapIndex}(${this.args()});\n`;
                if(onDone){
                    code += onDone();
                }
                break;
            case 'async':
                let cbCode = `(function(){\n`;
                if(onDone)cbCode +=onDone();//_callback(); _next1()
                cbCode+=`})`;
                code +=`
                _fn${tapIndex}(${this.args({
                    after:cbCode
                })});
                `;   
                break; 
            case 'promise':
                code +=`
                var _promise${tapIndex} = _fn${tapIndex}(${this.args()});
                _promise${tapIndex}.then(function () {
                  if (--_counter === 0) _done();
                });
                `;
                break;    
            default:
                break;
        }
        return code;
    }
}
module.exports = HookCodeFactory