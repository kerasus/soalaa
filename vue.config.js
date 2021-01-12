module.exports = {
  runtimeCompiler: true,
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    // proxy: 'http://192.168.5.34'
    proxy: {
      '/alaa/api/v2': {
        target: process.env.VUE_APP_ALAA_API,
        pathRewrite: {'^/alaa/api/v2' : ''}
      },
      '/alaa/web': {
        target: process.env.VUE_APP_ALAA_WEB,
        pathRewrite: {'^/alaa/web' : ''}
      },
      '/3a/api': {
        target: process.env.VUE_APP_3A_API,
        pathRewrite: {'^/3a/api' : ''}
      }
    }
  }
}
