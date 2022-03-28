const url = 'http://127.0.0.1:8000'
const webpack = require('webpack')
module.exports = {
    devServer: {
        proxy: {
            // //配置跨域
            '/api': {
                target: url, // 接口的域名
                changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    lintOnSave: false,
    configureWebpack: {

        plugins: [

            new webpack.ProvidePlugin({

                $: "jquery",

                jQuery: "jquery",

                "windows.jQuery": "jquery"

            })

        ]

    }
}

