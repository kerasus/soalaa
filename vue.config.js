let config = {
    lintOnSave: true,
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
    },

    pwa: {
        manifestOptions: {
            name: 'آزمون آنلاین آلاء',
            short_name: 'سه آ',
            background_color: '#FFFFFF',
            display: 'standalone',
            theme_color: '#ffc107',
            start_url: ".",
            scope: "/",
        },
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: './src/service-worker.js',
        },
        navigateFallback: './public/index.html'
    },
    outputDir: 'dist'
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
// Socket
setProxy(config.devServer.proxy, process.env.VUE_APP_SOCKET_INTERNAL_API_SERVER, process.env.VUE_APP_SOCKET_TARGET_API_SERVER)
// cdn
setProxy(config.devServer.proxy, process.env.VUE_APP_CDN_INTERNAL_API_SERVER, process.env.VUE_APP_CDN_TARGET_API_SERVER)

if (process.env.VUE_APP_NODE_ENV === 'development') {
    console.log('config.devServer.proxy', config.devServer.proxy)
}

module.exports = config
