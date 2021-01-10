module.exports = {
  runtimeCompiler: true,
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: 'http://192.168.5.34'
  }
}
