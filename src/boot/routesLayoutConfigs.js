import { boot } from 'quasar/wrappers'
import { getRouteWithParent, createLayoutConfigArray } from 'quasar-template-builder'

export default boot(({ router, store }) => {
  router.beforeEach((to) => {
    const routeWithParent = getRouteWithParent({ children: router.options.routes }, to.name, store)
    const layoutArray = createLayoutConfigArray(routeWithParent)
    layoutArray.forEach(config => {
      store.dispatch('AppLayout/updateTemplateLayout', config)
    })
  })
})
