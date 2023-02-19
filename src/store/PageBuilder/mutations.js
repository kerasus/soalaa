const mutations = {
  updatePageBuilderEditable: (state, newInfo) => {
    state.pageBuilderEditable = newInfo
  },
  updateInitialSections: (state, newInfo) => {
    state.initialSections = newInfo
  },
  updateCurrentSections: (state, newInfo) => {
    state.currentSections = newInfo
  }
}

export default mutations
