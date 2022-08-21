import { boot } from 'quasar/wrappers'

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    store.dispatch('AppLayout/updateTemplateHeaderType', to.layoutConfig)
    store.commit('AppLayout/updateTemplateHeaderType', to.name)
    // return
  })
})
