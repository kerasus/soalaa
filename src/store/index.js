import process from 'process'
import SEO from 'src/store/Seo'
import Auth from 'src/store/Auth'
import Cart from 'src/store/Cart'
import Exam from 'src/store/Exam'
import { createStore } from 'vuex'
import { store } from 'quasar/wrappers'
import Widgets from 'src/store/Widgets'
import loading from 'src/store/loading'
import AppLayout from 'src/store/AppLayout'
import PageBuilder from 'src/store/PageBuilder'
import createPersistedState from 'vuex-persistedstate'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const plugins = []

if (process.browser) {
  const vuexPersistedState =
    createPersistedState({
      key: 'vuex',
      storage: window.localStorage,
      fetchBeforeUse: true,
      paths: [
        'Cart',
        'Auth.user',
        'AppLayout',
        'Auth.accessToken',
        'userQuizListData',
        'psychometricAnswer'
      ]
    })

  plugins.push(vuexPersistedState)
}

const debug = false
export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      SEO,
      Auth,
      Exam,
      Cart,
      Widgets,
      loading,
      AppLayout,
      PageBuilder
    },
    plugins,
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: debug
  })

  return Store
})
