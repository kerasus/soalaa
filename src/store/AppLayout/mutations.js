const mutations = {
  updateLinearLoading: (state, newInfo) => {
    state.linearLoading = !!newInfo
  },
  updateWindowSize: (state, newInfo) => {
    state.windowSize.x = newInfo.width
    state.windowSize.y = newInfo.height
  },
  updatePageBuilderEditable: (state, newInfo) => {
    state.pageBuilderEditable = !!newInfo
  },
  updateInitialSections: (state, newInfo) => {
    state.initialSections = newInfo
  },
  updateCurrentSections: (state, newInfo) => {
    state.currentSections = newInfo
  },
  updateBubbleSize: (state, newInfo) => {
    state.bubbleSize = newInfo
  },
  updateLoginDialog: (state, newInfo) => {
    state.loginDialog = newInfo
  },
  updateLayoutHeaderType: (state, newInfo) => {
    state.layoutHeaderType = newInfo
  },
  updateLayoutLeftSideBarType: (state, newInfo) => {
    state.layoutLeftSideBarType = newInfo
  },
  updateLayoutRightSideBarType: (state, newInfo) => {
    state.layoutRightSideBarType = newInfo
  },
  showConfirmDialog: (state, newInfo) => {
    state.confirmDialog = newInfo
  },
  updateBreadcrumbs: (state, data) => {
    Object.assign(state.breadcrumbs, data)
  },
  updateBreadcrumbLoading: (state, data) => {
    state.breadcrumbs.loading = data
  },
  updateLastBreadcrumb: (state, data) => {
    state.breadcrumbs.path[state.breadcrumbs.path.length - 1] = data
  },
  updateVisibilityBreadcrumb: (state, data) => {
    state.breadcrumbs.visible = data
  },
  updateAppLayout: (state, data) => {
    const storage = JSON.parse(localStorage.getItem('vuex'))
    Object.assign(storage.AppLayout, data)
    Object.assign(state.appLayout, storage.AppLayout)
  }
}

export default mutations
