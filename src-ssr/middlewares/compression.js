import compression from 'compression'
import { ssrMiddleware } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/developing-ssr/ssr-middlewares
export default ssrMiddleware(async ({ app /*, resolveUrlPath, publicPath, render */ }) => {
  // something to do with the server "app"
  app.use(
    compression({ threshold: 0 })
  )
})
