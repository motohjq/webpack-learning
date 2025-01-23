/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintPLugin = require('eslint-webpack-plugin');
const WebpackSpritesmith = require('webpack-spritesmith');
//获取环境变量
const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === 'production';
module.exports = {
    mode: 'development',
    devtool: false,
    entry:{
        //vendor:'./src/vendor.js',
        //main:{
            //指的是指定入口文件
            import:'./src/index.js',
            //声明该入口的前置依赖，
            //dependOn:'vendor',
            //设置该入口的runtime chunk,
            //如果这个值不设置，那么运行时代码会打包到bundle中
           // runtime:'runtime-main'
        //}
        entry1:{
            import:'./src/entry1.js',
            runtime:'runtime'
        },
        entry2:{
            import:'./src/entry2.js',
            runtime:'runtime'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true //在新的打包之前清除历史文件
    },
    devServer: {
        host: 'localhost',//主机名
        port: 9000,//访问端口号
        open: true,//构建结束后自动打开浏览器预览项目
        compress: true,//启动gzip压缩
        hot: true,//启动支持模块热替换，这个内容我们后面会手写实现
        watchFiles: [//监听这些文件的变化，如果这些文件变化了，可以重新编译 
            "src/**/*.js"
        ],//如果不配置watchFiles就是监听所有的文件
        //不管访问哪个路径，都会把请求重定向到index.html，交给前端路由来进行处理
        historyApiFallback: true,
      /*   proxy:{
            '/api':{
                target:'http://localhost:3000',
                pathRewrite:{'^/api':''}
            }
        }, */
        onBeforeSetupMiddleware({app}){
            app.get('/api/users',(req,res)=>{
                res.json([
                    {id:1,name:'bob'}
                ]);
            });
        }
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                type: 'asset/source'
            },
            {
                test: /\.png$/,
                type: 'asset/resource'
            },
           /*  {
                test: /\.png$/,
                type: 'asset',//会输出文件和base64之间自动选择
                parser: {//如果图片大小小于某个阈值，则base64,大于某个阈值输出单独文件
                    dataUrlCondition: {
                        maxSize: 1024 * 32
                    }
                }
            }, */
            //因为不是所有的图片都需要响应式
           /*  {
                test: /\.png$/,
                //oneOf是一个优化选项，用于提高打包的速度
                oneOf:[
                    {
                        //resourceQuery是一个用于匹配请求资源的URL中查询字符中
                        resourceQuery:/sizes/,
                        use:[
                            {
                             loader:'responsive-loader',
                             options:{
                                sizes:[300,600,1024],
                                adapter:require('responsive-loader/sharp')
                             }
                            }
                         ]
                    },
                    {
                        type: 'asset/resource',
                    }
                ]
            }, */
            /* {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: !isProduction,//如果是开发环境不要压缩
                            // 是否禁用图片优化和压缩
                            disable: process.env.NODE_ENV === 'development',
                            mozjpeg: {
                                progressive: true, // 是否开启渐进式JPEG，可以有效提升JPEG图片加载速度
                                quality: 65 // 压缩JPEG图片的质量，取值范围为0到100，值越大质量越好但文件越大
                            },
                            optipng: {
                                enabled: true // 是否开启PNG图片的优化，可以有效提升PNG图片加载速度
                            },
                            pngquant: {
                                // 压缩PNG图片的质量范围，取值范围为0到1，值越大质量越好但文件越大
                                // 第一个数字表示压缩质量的下限，第二个数字表示压缩质量的上限
                                quality: [0.65, 0.9],
                                speed: 4 // 压缩PNG图片的速度，取值范围为1到10，值越大速度越快但质量越低
                            },
                            svgo: {
                                plugins: [ // 压缩SVG图片的插件列表，这里包含removeViewBox和cleanupIDs两个插件
                                    { //用于删除SVG图片中的viewBox属性
                                        //viewBox属性是用来指定SVG视口范围的，它的值是一个矩形框的坐标和宽高
                                        removeViewBox: false
                                    },
                                    { //用于删除SVG图片中的无用ID属性
                                        cleanupIDs: true
                                    }
                                ]
                            },
                            gifsicle: {
                                interlaced: true // 是否开启GIF图片的隔行扫描,可以有效提升GIF图片加载速度
                            }
                        }
                    }
                ]
            }, */
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-typescript"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-env"//V50套餐
                            ],
                            "plugins": [
                                //装饰器的插件就需要单独在这里配置
                            ]
                        }
                    }
                ]
            },
            {   //C:\aproject\zhufengwebpack20230305\1.usage\src\index.css
                test: /\.css$/,//匹配的条件 一般是一个正则，用来匹配文件的路径
                use: [//use指定的转换的方式
                    //通过style标签动态插入样式到HTML里
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    //作用是把CSS代码转换为JS代码
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader:'less-loader',
                        options:{
                            lessOptions:{
                                paths:[
                                    path.resolve(__dirname,'src/spritesmith-generated')
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin(),
        new EslintPLugin({
            extensions: ['.js', '.ts']
        }),
        new WebpackSpritesmith({
            src:{//指定输入的文件
                cwd:path.resolve(__dirname,'src/images/icons'),
                glob:'**/*.png'
            },
            target:{//指定输出的文件路径
                image:path.resolve(__dirname,'src/spritesmith-generated/sprite.png'),
                css:path.resolve(__dirname,'src/spritesmith-generated/sprite.less'),
            },
            apiOptions:{
                cssImageRef: "sprite.png"
            },
            spritesmithOptions: {
                algorithm: 'top-down',
                padding: 10
              }
        })
    ]
}
/**
 * 我们使用的时候很使用很多的ES6特性
 * 1.比如箭头函数 要把它从ES6转成ES5，需要编写对应的babel插件
 * 2. 为了方便，我们可把这些插件进行打包，称为一个预设preset
 *
 *
 */
/**
 * MiniCssExtractPlugin
 * 1.把CSS文件提取到单独的文件中
 * 1.减少了main.js文件体积
 * 2.可以让CSS和JS并行加载，提高了加载效率，减少了加载时间
 * 3.可以单独维护CSS，更清晰
 *
 * 打包环境其实主要分为二种，一种是开发环境，一种是生产环境
 * 开发环境需要尽可能的打包快一点
 * 生产环境打包可以慢一点
 *
 * cross-env NODE_ENV=production
 * 通过cross-env可以跨平台设置环境变量
 *
 * babel是一个转换器，但是它本身只是一个转换的引擎，不知道如何转换？也不知道应该转换什么?
 * 所以需要写一个一个的插件，进行转换，一般来说每个插件转换一个语法，或者说一个写法
 * 配置的时候为了减少复杂度，就可以把插件进行打包，变成一个预设，配置一个预设就可以了
 *
 */
// __dirname=C:\aproject\zhufengwebpack20230305\1.usage
/* entry:{
    main:'./src/index.js'
},
entry: ['./src/entry1.js','./src/entry2.js'],
entry:{
    entry1:'./src/entry1.js',
    entry2:'./src/entry2.js',
} 
 new HtmlWebpackPlugin({
            template:'./src/entry1.html',
            filename:'entry1.html',
            chunks:['entry1']
        }),
        new HtmlWebpackPlugin({
            template:'./src/entry2.html',
            filename:'entry2.html',
            chunks:['entry2']
        })


*/