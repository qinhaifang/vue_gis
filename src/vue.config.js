const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    runtimeCompiler: true,
    publicPath: '/', // 设置打包文件相对路径
    devServer: {
        // open: process.platform === 'darwin',
        // host: 'localhost',
        port: 8071,
        // open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'ws://122.112.170.1:8081/net/websocket/safeResult/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    chainWebpack: config => {
        config.resolve.symlinks(true);
        config.module
            .rule('swf')
            .test(/\.swf$/)
            .use('url-loader')
            .loader('url-loader')
            .options({
                limit: 10000
            })
    },
    configureWebpack: (config) => {
        config.resolve.modules[0] = path.resolve(__dirname, 'node_modules');
        config.resolve.modules[1] = 'node_modules';
    },
}