const path = require('path');
const RunPlugin = require('./plugins/RunPlugin');
const Run1Plugin = require('./plugins/Run1Plugin');
const Run2Plugin = require('./plugins/Run2Plugin');
const DonePlugin = require('./plugins/DonePlugin');
module.exports = {
    mode:'development',
    //context:process.cwd(),//current working directory
    devtool:false,
    //entry:'./src/entry1.js',//{main:'./src/entry1.js'}
    entry:{
        entry1:'./src/entry1.js',
        entry2:'./src/entry2.js'
    },
    output:{
        path:path.resolve('./dist'),
        filename:'[name].js'
    },
    resolve:{
        //配置查找模块的路径的规则
        //当引入模块的时候，可以不写扩展名
        extensions:['.js','.jsx','.ts','.tsx','.json']
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    path.resolve(__dirname,'loaders/logger1-loader.js'),
                    path.resolve(__dirname,'loaders/logger2-loader.js')
                ]
            }
        ]
    },
    plugins:[
      
        new RunPlugin(),
      
        new Run2Plugin(),
        new Run1Plugin(),
        new DonePlugin(),
    ]
}