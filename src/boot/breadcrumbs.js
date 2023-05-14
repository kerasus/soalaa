import { boot } from 'quasar/wrappers'
import * as QTemplateBuilderHelper from 'quasar-template-builder/src/helper.js'

export default boot(({ router, store }) => {
  router.beforeEach((to) => {
    const routeWithParent = QTemplateBuilderHelper.getRouteWithParent({ children: router.options.routes }, to.name)
    store.commit('AppLayout/updateLayoutBreadcrumbsElements', {
      path: QTemplateBuilderHelper.createBreadcrumbsFromRouteWithParent(routeWithParent)
    })
  })
})
