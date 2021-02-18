module.exports = {
  runtimeCompiler: true,
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: process.env.VUE_APP_PORT,
    disableHostCheck: true,
    proxy: {
      '/alaa/api/v2': {
        target: process.env.VUE_APP_ALAA_API,
        changeOrigin: true,
        pathRewrite: {'^/alaa/api/v2' : ''}
      },
      '/3a/api': {
        target: process.env.VUE_APP_3A_API,
        changeOrigin: true,
        pathRewrite: {'^/3a/api' : ''}
      },
      '/3a/rb/api': {
        target: process.env.VUE_APP_3A_RB_API,
        changeOrigin: true,
        pathRewrite: {'^/3a/rb/api' : ''}
      }
    }
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: process.env.NODE_ENV === 'development'
    }
  }
}
