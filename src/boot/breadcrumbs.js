import { boot } from 'quasar/wrappers'

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
  router.beforeEach((to) => {
    const routeWithParent = getRouteWithParent({ children: router.options.routes }, to.name)
    store.commit('AppLayout/updateBreadcrumbs', {
      path: createBreadcrumbsFromRouteWithParent(routeWithParent)
    })
  })
})
