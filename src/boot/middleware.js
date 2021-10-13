import { boot } from 'quasar/wrappers'

/**
 * A stack of different middlewares ran in series
 * Link: https://blog.logrocket.com/vue-middleware-pipelines/
 */
function middlewarePipeline (context, middlewares, index) {
  const middleware = middlewares[index]
  if (!middleware) return context.next
  return () => {
    const nextMiddleware = middlewarePipeline(
      context, middlewares, index + 1
    )
    middleware({ ...context, next: nextMiddleware })
  }
}

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    // Now you need to add your authentication logic here, like calling an API endpoint
    if (!to.meta.middlewares) return next()
    const middlewares = to.meta.middlewares
    const context = { to, from, next, store }
    return middlewares[0]({
      ...context,
      next: middlewarePipeline(context, middlewares, 1)
    })
  })
})
