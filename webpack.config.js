        const path=require('path');
        // 启用热更新第二步导入webpack
        const webpack=require('webpack');
        const VueLoaderPlugin=require('vue-loader/lib/plugin');
        //这个配置文件其实就是js文件,通过node操作向外暴露了一个配置对象
        // 导入在内存中生成的HTML页面插件
        // 只要是插件都一定要放到plugins节点中去
        // 1.自动在内存中根据指定页面生成一个内存页面
        // 2.自动,把打包好的bundle.js追加到页面中去
        const htmlWebpackPlugin=require('html-webpack-plugin');
        module.exports={
            entry:path.join(__dirname,'./src/main.js'),
            //入口，表示要使用webpack打包哪个文件
            output:{
                path:path.join(__dirname,'./dist'),//指定打包好的文件,输出到哪个目录中去
                filename:'bundle.js'//指定输出的文件的名称
            },
            mode:"development",
            devServer:{
                // 这是配置dev-server命令参数相对来说麻烦一些
                //webpack-dev-server --open --port 3000 --contentBase src --hot
                open:true,//自动打开浏览器
                port:3000,//设置端口
                contentBase:'src',//指定托管根目录
                hot:true//启用热更新第一步
            },
            plugins:[
                // 配置插件的节点
                // new一个热更新的模块对象
                // 启用热更新第三步
                // new webpack.HotModuleReplacementPlugin(),
                new VueLoaderPlugin(),
                new htmlWebpackPlugin({
                    // 创建一个在内存中生成HTML页面的插件
                    // 配置对象
                    // 根据模板页面
                    template:path.join(__dirname,'./src/index.html'),
                    // 会根据指定的页面路径去生成内存中的页面
                    filename:'index.html'//指定生成的页面的名称
                })
            ],
            module:{
                // 这个节点用于配置所有的第三方模块 加载器
                rules:[
                    // 所有的三方模块的匹配规则
                    // 正则
                    // 配置处理css的文件的第三方loader规则
                    {test:/\.css$/,use:['style-loader','css-loader']},
                    
                    /* 
                    处理过程:
                            1.发现不是JS文件,就去配置文件查找对应loader规则
                            2.调用对应loader处理这种文件类型
                            3.在调用loader是从后往前调用
                            4.最后一个loader调用完毕会把处理结果交给webpack打包合并,最终输出到bundle.js中去
                    */
                   {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
                //    配置.less文件的第三方loader规则
                    {test:/\.scss/,use:['style-loader','css-loader','sass-loader']},
                 //   配置.sass文件的第三方loader规则
                 {test:/\.(jpg|png|gif|bmp|jepg)$/,use:'url-loader?limit=23337&name=[hash:8]-[name].[ext]'},
                // {test:/\.(jpg|png|gif|bmp|jepg)$/,use:'url-loader?limit=3337'},
                //  当limit值等于大于图片时，会把图片进行编码
                //  当limit值小于则会是一张图片（byte）
                // [name]表示之前什么名字之后还是什么[ext]表示后缀同上
                // [hash]有32位，区分hash
                //  配置图片路径的loader(?代表传参)
                // 配置字体文件
                {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env']
                      }
                    }
                  },
                  {
                      test:/\.vue$/,use:'vue-loader'//处理.vue文件的loader
                  }
                

                // 配置Babel来转化更高级的语法
            ]
        }
    }
    
    // 1.首先webpack没有发现通过命令形式给它指定入口和出口
    // 2.webpack就会去项目根目录中查找一个webpack.config.js的配置文件
    // 3.当找到配置文件后,webpack会去解析执行这个配置文件,当解析执行完这个配置文件后
    // 就得到了导出的配置对象
    // 4.当webpack就拿到了配置对象指定的入口和出口，然后进行打包构建
    // 由于是在项目安装所以要用目录执行
    // .\node_modules\.bin\webpack-dev-server
    // npm装node-sass会失败,先装cnpm(npm i cnpm -D)