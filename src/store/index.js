import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import Auth from 'src/store/module-example/Auth'
import Auth from 'src/store/Auth'
import loading from 'src/store/loading'
import AppLayout from 'src/store/AppLayout'
import quiz from 'src/store/quiz1'

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
      quiz
    },
    plugins: [
      createPersistedState({
        storage: window.localStorage,
        paths: ['userQuizListData', 'Auth.accessToken', 'Auth.user', 'psychometricAnswer']
      }),
      createPersistedState({
        key: 'AppLayout',
        storage: window.localStorage,
        paths: ['AppLayout']
      })
    ],
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: debug
  })

  return Store
})
