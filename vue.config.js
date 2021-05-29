let config = {
    runtimeCompiler: true,
    "transpileDependencies": [
        "vuetify"
    ],
    devServer: {
        port: process.env.VUE_APP_PORT,
        disableHostCheck: true,
        proxy: {}
    },
    pluginOptions: {
        webpackBundleAnalyzer: {
            openAnalyzer: process.env.VUE_APP_NODE_ENV === 'development'
        }
    }
}

function setProxy(proxy, key, target) {
  proxy[key] = {
    target: target,
    changeOrigin: true,
  }
  let pathRewriteKey = '^'+key
  config.devServer.proxy[key].pathRewrite = {
    [pathRewriteKey]: ''
  }
}

// AUTH
setProxy(config.devServer.proxy, process.env.VUE_APP_AUTH_INTERNAL_API_SERVER, process.env.VUE_APP_AUTH_TARGET_API_SERVER)
// LUMEN API
setProxy(config.devServer.proxy, process.env.VUE_APP_LUMEN_INTERNAL_API_SERVER, process.env.VUE_APP_LUMEN_TARGET_API_SERVER)
// LUMEN RABBIT MQ
setProxy(config.devServer.proxy, process.env.VUE_APP_LUMEN_INTERNAL_RABBIT_MQ_SERVER, process.env.VUE_APP_LUMEN_TARGET_RABBIT_MQ_SERVER)

setProxy(config.devServer.proxy, '/cdn/upload', 'https://cdn.alaatv.com/upload')

if (process.env.VUE_APP_NODE_ENV === 'development') {
    console.log('config.devServer.proxy', config.devServer.proxy)
}

module.exports = config
