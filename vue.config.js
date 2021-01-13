module.exports = {
  runtimeCompiler: true,
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: 80,
    disableHostCheck: true,
    proxy: {
      '/alaa/api/v2': {
        target: process.env.VUE_APP_ALAA_API,
        changeOrigin: true,
        pathRewrite: {'^/alaa/api/v2' : ''}
      },
      '/alaa/web': {
        target: process.env.VUE_APP_ALAA_WEB,
        changeOrigin: true,
        pathRewrite: {'^/alaa/web' : ''}
      },
      '/3a/api': {
        target: process.env.VUE_APP_3A_API,
        changeOrigin: true,
        pathRewrite: {'^/3a/api' : ''}
      }
    }
  }
}
