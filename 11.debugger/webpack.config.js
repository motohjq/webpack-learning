const path = require('path');
const HtmlWebpackPlugin = require('./html-webpack-plugin');
module.exports = {
    mode:'development',
    devtool:false,
    entry:'./src/index.js',
    optimization:{
        usedExports:true,
        providedExports: true,
    },
    /**entry:{
        entry1:'./src/entry1.js',
        entry2:'./src/entry2.js'
    },**/
    optimization: {
        splitChunks: {
            // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
            chunks: 'all',
            minSize: 0,//默认值是20000,生成的代码块的最小尺寸
            cacheGroups: {
                default: {
                    minChunks: 2
                },
            },
        }
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}