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

function createLayoutConfigArray (routeWithParent) {
  if (routeWithParent.route) {
    const array = createLayoutConfigArray(routeWithParent.route)
    if (routeWithParent.parent.layoutConfig) {
      array.unshift(routeWithParent.parent.layoutConfig)
    }
    return array
  } else {
    if (routeWithParent.layoutConfig) {
      return [routeWithParent.layoutConfig]
    } else {
      return []
    }
  }
}

export default boot(({ router, store }) => {
  router.beforeEach((to) => {
    const routeWithParent = getRouteWithParent({ children: router.options.routes }, to.name, store)
    const layoutArray = createLayoutConfigArray(routeWithParent)
    layoutArray.forEach(config => {
      store.dispatch('AppLayout/updateTemplateLayout', config)
    })
  })
})
