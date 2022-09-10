import { boot } from 'quasar/wrappers'

export default boot(({ app, store, router }) => {
  app.config.globalProperties.$q.iconMapFn = (iconName) => {
    if (iconName.startsWith('isax:') === true) {
      const name = iconName.substring(5)
      return {
        cls: 'isax isax-' + name
      }
    }
  }
})
