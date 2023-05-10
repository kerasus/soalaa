import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import vuejsStorage from '@krasus/vuejs-storage'

import process from 'process'
import Auth from 'src/store/Auth'
import Cart from 'src/store/Cart'
import Exam from 'src/store/Exam'
import loading from 'src/store/loading'
import AppLayout from 'src/store/AppLayout'
import Widgets from 'src/store/Widgets'
import SEO from './Seo'
import PageBuilder from 'src/store/PageBuilder'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const debug = false

const plugins = []

if (process.browser) {
  const vuexPersistedState =
    createPersistedState({
      storage: window.localStorage,
      paths: [
        'userQuizListData',
        'Auth.accessToken',
        'Auth.user',
        'psychometricAnswer',
        'AppLayout',
        'Cart'
      ]
    })

  plugins.push(vuexPersistedState)
}

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      Auth,
      loading,
      Widgets,
      AppLayout,
      PageBuilder,
      SEO,
      Exam,
      Cart
    },
    plugins,
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: debug
  })

  return Store
})
