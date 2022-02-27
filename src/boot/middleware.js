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

function getRouteWithParent (routeNode, toName) {
  const routes = routeNode.children
  for (const routeIndex in routes) {
    const route = routes[routeIndex]
    if (route.name === toName) {
      return {
        route,
        parent: routeNode
      }
    } else {
      if (route.children && route.children.length > 0) {
        const res = getRouteWithParent(route, toName)
        if (res) {
          return {
            route: res,
            parent: routeNode
          }
        }
      }
    }
  }
}
function createBreadcrumbsFromRouteWithParent (routeWithParent) {
  if (routeWithParent.route) {
    const array = createBreadcrumbsFromRouteWithParent(routeWithParent.route)
    if (routeWithParent.parent.breadcrumbs) {
      array.unshift(routeWithParent.parent.breadcrumbs)
    }
    return array
  } else {
    if (routeWithParent.breadcrumbs) {
      return [routeWithParent.breadcrumbs]
    } else {
      return []
    }
  }
}

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const routeWithParent = getRouteWithParent({ children: router.options.routes }, to.name)
    store.commit('AppLayout/updateBreadcrumbs', {
      path: createBreadcrumbsFromRouteWithParent(routeWithParent)
    })
    // Now you need to add your authentication logic here, like calling an API endpoint
    if (!to.meta.middlewares) {
      return next()
    }
    const middlewares = to.meta.middlewares
    const context = { to, from, next, store }
    return middlewares[0]({
      ...context,
      next: middlewarePipeline(context, middlewares, 1)
    })
  })
})
