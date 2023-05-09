import { boot } from 'quasar/wrappers'
import merge from 'deepmerge'

const key = process.env.VUEX_PERSISTED_STATE_KEY

export default boot(({ store, ssrContext }) => {
  if (ssrContext) {
    return
  }

  const savedStateOnLocalStorage = JSON.parse(window.localStorage.getItem(key))
  if (!savedStateOnLocalStorage) {
    return
  }
  store.replaceState(
    merge(store.state, savedStateOnLocalStorage, {
      arrayMerge: function (store, saved) {
        return saved
      },
      clone: false
    })
  )
})
