import state from './state'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

import QuasarTemplateBuilderState from 'quasar-template-builder/src/store/QuasarTemplateBuilderAppLayout/state.js'
const QState = QuasarTemplateBuilderState
import QuasarTemplateBuilderGetters from 'quasar-template-builder/src/store/QuasarTemplateBuilderAppLayout/getters.js'
const QGetters = QuasarTemplateBuilderGetters
import QuasarTemplateBuilderMutations from 'quasar-template-builder/src/store/QuasarTemplateBuilderAppLayout/mutations.js'
const QMutations = QuasarTemplateBuilderMutations
import QuasarTemplateBuilderActions from 'quasar-template-builder/src/store/QuasarTemplateBuilderAppLayout/actions.js'
const QActions = QuasarTemplateBuilderActions

const assignedState = Object.assign({}, QState, state)
const assignedGetters = Object.assign({}, QGetters, getters)
const assignedMutations = Object.assign({}, QMutations, mutations)
const assignedActions = Object.assign({}, QActions, actions)

Object.assign(QState, state)
Object.assign(QGetters, getters)
Object.assign(QMutations, mutations)
Object.assign(QActions, actions)

export default {
  namespaced: true,
  state: assignedState,
  getters: assignedGetters,
  mutations: assignedMutations,
  actions: assignedActions
}
