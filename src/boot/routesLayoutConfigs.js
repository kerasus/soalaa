import { boot } from 'quasar/wrappers'

function setLayoutConfig (routes, toName, store) {
  for (const routeIndex in routes.children) {
    const route = routes.children[routeIndex]
    if (route.layoutConfig) {
      store.dispatch('AppLayout/updateTemplateHeaderType', route.layoutConfig)
    }
    if (route.name === toName) {
      return
    }

    if (route.children && route.children.length > 0) {
      setLayoutConfig(route, toName, store)
    }
  }
}

export default boot(({ router, store }) => {
  router.beforeEach((to) => {
    setLayoutConfig({ children: router.options.routes }, to.name, store)
  })
})
