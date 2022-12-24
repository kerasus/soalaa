import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

import * as QuasarTemplateBuilderState from 'quasar-template-builder/src/store/QuasarTemplateBuilderAppLayout/state.js'
const QState = QuasarTemplateBuilderState
import * as QuasarTemplateBuilderGetters from 'quasar-template-builder/src/store/QuasarTemplateBuilderAppLayout/getters.js'
const QGetters = QuasarTemplateBuilderGetters
import * as QuasarTemplateBuilderMutations from 'quasar-template-builder/src/store/QuasarTemplateBuilderAppLayout/mutations.js'
const QMutations = QuasarTemplateBuilderMutations
import * as QuasarTemplateBuilderActions from 'quasar-template-builder/src/store/QuasarTemplateBuilderAppLayout/actions.js'
const QActions = QuasarTemplateBuilderActions

Object.assign(QState, state)
Object.assign(QGetters, getters)
Object.assign(QMutations, mutations)
Object.assign(QActions, actions)

export default {
  namespaced: true,
  state: QState,
  getters: QGetters,
  actions: QActions,
  mutations: QMutations
}
