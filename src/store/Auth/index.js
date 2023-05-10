import state from './state'
import getters from './getters.js'
import * as actions from './actions'
import mutations from './mutations.js'

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
