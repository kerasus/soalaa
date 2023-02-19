import { boot } from 'quasar/wrappers'
// import { getRouteWithParent, createBreadcrumbsFromRouteWithParent } from 'quasar-template-builder'
import helper from 'quasar-template-builder/src/helper.js'
const { getRouteWithParent, createBreadcrumbsFromRouteWithParent } = helper

export default boot(({ router, store }) => {
  router.beforeEach((to) => {
    const routeWithParent = getRouteWithParent({ children: router.options.routes }, to.name)
    store.commit('AppLayout/updateLayoutBreadcrumbsElements',
      createBreadcrumbsFromRouteWithParent(routeWithParent)
    )
  })
})
