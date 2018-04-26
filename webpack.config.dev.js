const HtmlWebpackPlugin = require('html-webpack-plugin')
//导入webpack 
const webpack = require('webpack')

module.exports = {
    entry: './src/main.js',//入口
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ttf|eot|woff|svg|png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        overlay: true //报错的时候，在页面上弹出一个遮罩，并且把错误显示在上面
    },
    plugins: [
        //将来以template为模版，生成一个index.html并且发布到webpack-dev-server开启的node服务器上面去
        new HtmlWebpackPlugin({
            template: './template.html'
        }),
        //导入全局的包
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            $axios:'axios'
        })
    ]
}
