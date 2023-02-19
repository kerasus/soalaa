import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import vuejsStorage from '@krasus/vuejs-storage'

import Auth from 'src/store/Auth'
import Cart from 'src/store/Cart'
import Exam from 'src/store/Exam'
import loading from 'src/store/loading'
import AppLayout from 'src/store/AppLayout'
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
export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      Auth,
      loading,
      AppLayout,
      PageBuilder,
      Exam,
      Cart
    },
    plugins: [
      // vuejsStorage({
      //   keys: [
      //     'userQuizListData',
      //     'Auth',
      //     'psychometricAnswer',
      //     'AppLayout'
      //   ],
      //   // keep state.count in localStorage
      //   namespace: 'vuex-localstorage'
      //   // if you want to use sessionStorage instead of localStorage:
      //   // driver: vuejsStorage.drivers.sessionStorage
      // })

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
    ],
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: debug
  })

  return Store
})
