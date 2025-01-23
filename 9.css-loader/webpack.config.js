const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    devtool:false,
    //可以单独为loader配置查找的规则
    resolve:{

    },
    resolveLoader:{

    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {
                        //loader:'style-loader',
                        loader:path.resolve('loaders/style-loader')
                    }, 
                    {
                        //loader:'css-loader',
                        loader:path.resolve('loaders/css-loader'),
                        options:{
                            esModule:false,
                            url:true,
                            import:true,//支持import导入别的css文件
                            //在处理包含的CSS之前要执行几个前置loader
                            importLoaders:2,
                            modules:{
                                mode:'local',
                                //指的是导出的是一个数组，数组有一个locals属性
                                exportOnlyLocals:false
                            }
                        }
                    },
                    {
                        loader:path.resolve(__dirname,'loaders/logger-loader2')
                    },
                    {
                        loader:path.resolve(__dirname,'loaders/logger-loader1')
                    }
                ]
            },
            {
                test:/\.png$/,
                type:'asset/resource'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}