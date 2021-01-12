module.exports = {
  runtimeCompiler: true,
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    // proxy: 'http://192.168.5.34'
    proxy: {
      '/api/v2': {
        target: 'https://alaatv.com/api/v2',
        pathRewrite: {'^/api/v2' : ''}
      },
      '/api/3a': {
        target: 'http://192.168.5.28',
        pathRewrite: {'^/api/3a' : ''}
      }
    }
  }
}
