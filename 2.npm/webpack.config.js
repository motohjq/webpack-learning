const path = require('path');
const {merge} = require('webpack-merge');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
//const webpack = require('webpack');
//console.log('process.env.NODE_ENV',process.env.NODE_ENV);
const baseConfig = {
    mode:'development',
    devtool:false,
    entry:'./src/index.js',
    externals:[
        //nodeExternals()//排除所有的第三方模块，就是把node_modules里的模块全部设置为外部模块
    ],
    output:{
        //library:'math',
        //libraryExport:'add',
        clean:true
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            targets:{
                                "browsers":[">0.1%"]
                            },
                            presets:[
                                ["@babel/preset-env",{
                                    useBuiltIns:false,//如果开发的是类库，不要使用污染全局环境的polyfill
                                }]
                            ],
                            plugins:[
                                [
                                    "@babel/plugin-transform-runtime",
                                    {
                                        corejs:3,//使用此插件提供的polyfill,此插件不会污染全局环境
                                        helpers:true,//使用此插件,复用帮助 方法，减少文件体积
                                        regenerator:false
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
           /*  {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            targets:{
                                "browsers":[">0.1%"]
                            },
                            presets:[
                                ["@babel/preset-env",{
                                    useBuiltIns:'usage',//实现polyfill 因为开发项目不用担心会污染全局作用域
                                    corejs:3
                                }]
                            ],
                            plugins:[
                                [
                                    "@babel/plugin-transform-runtime",
                                    {
                                        corejs:false,//不使用此插件提供的polyfill
                                        helpers:true,//使用此插件,复用帮助 方法，减少文件体积
                                        regenerator:false
                                    }
                                ]
                            ]
                        }
                    }
                ]
            }, */
            {
                test:/\.css$/,
                use:[
                    miniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new miniCssExtractPlugin(),
       /*  new webpack.DefinePlugin({
            "process.env.NODE_ENV":JSON.stringify(process.env.NODE_ENV),
            "AUTHOR":"zhufeng"
        }) */
    ]
}
module.exports =baseConfig;
/* 
module.exports2 = [
    merge(baseConfig,{
        output:{
            filename:'[name]-window.js',
            libraryTarget:'window'
        }
    }), 
     merge(baseConfig,{
        output:{
            filename:'[name]-commonjs.js',
            libraryTarget:'commonjs2'
        }
    }),  
     merge(baseConfig,{
        output:{
            filename:'[name]-umd.js',
            libraryTarget:'umd'
        }
    }), 
     merge(baseConfig,{
        output:{
            filename:'[name]-amd.js',
            libraryTarget:'amd'
        }
    }) 
]
/* module.exports = (env,argv)=>{
    console.log('env',env);
    console.log('argv',argv);
    return baseConfig;
}

webpack --env mode=production --watch
process.env.NODE_ENV undefined
env { WEBPACK_WATCH: true, mode: 'production' }
argv { env: { WEBPACK_WATCH: true, mode: 'production' }, watch: true }
 */

