const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const FileManagerWebpackPlugin = require('filemanager-webpack-plugin');
module.exports = {
    mode:'development',
    devtool:false,
    output:{
        clean:true,
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:[
                                "@babel/preset-env"
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        //自己生成sourcemap
        //SourceMapDevToolPlugin是一个内置插件，可以更加精细的控制sourcemap的生成
        new webpack.SourceMapDevToolPlugin({
            filename:'[file].map',
            //append:'\n//# sourceMappingURL=http://127.0.0.1:8081/[url]'
            append:false
        }),
        new FileManagerWebpackPlugin({
            events:{
                onStart:{
                    delete:[path.resolve('./sourcemaps')]
                },
                onEnd:{
                    copy:[
                        {
                            source:'./dist/*.map',
                            destination:path.resolve('./sourcemaps')
                        }
                    ],
                    delete:['./dist/*.map']
                }
            }
        })
    ]
}