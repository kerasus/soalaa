module.exports = {
  runtimeCompiler: true,
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    // proxy: 'http://192.168.5.34'
    proxy: {
      '/alaa/api/v2': {
        target: 'https://alaatv.com/api/v2',
        pathRewrite: {'^/alaa/api/v2' : ''}
      },
      '/alaa/web': {
        target: 'https://alaatv.com/',
        pathRewrite: {'^/alaa/web' : ''}
      },
      '/3a/api': {
        target: 'http://192.168.5.36',
        pathRewrite: {'^/3a/api' : ''}
      }
    }
  }
}
