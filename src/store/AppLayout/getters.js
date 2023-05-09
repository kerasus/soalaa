const getters = {
  linearLoading: (state) => {
    return state.linearLoading
  },
  pageBuilderEditable: (state) => {
    return state.pageBuilderEditable
  },
  initialSections: (state) => {
    return state.initialSections
  },
  currentSections: (state) => {
    return state.currentSections
  },
  // drawer: (state) => {
  //   return state.drawer
  // },
  //
  // appBar: (state) => {
  //   return state.appBar
  // },
  loginDialog: (state) => {
    return state.loginDialog
  },
  confirmDialog: (state) => {
    return state.confirmDialog
  },
  windowSize: (state) => {
    return state.windowSize
  },
  bubbleSize: (state) => {
    return state.bubbleSize
  },
  ColumnsWidth: (state) => {
    return state.ColumnsWidth
  },
  layoutHeaderType: (state) => {
    return state.layoutHeaderType
  },
  layoutLeftSideBarType: (state) => {
    return state.layoutLeftSideBarType
  },
  layoutRightSideBarType: (state) => {
    return state.layoutRightSideBarType
  },
  breadcrumbs: (state) => {
    return state.breadcrumbs
  },
  breadcrumbLoading: (state) => {
    return state.breadcrumbs.loading
  },
  breadcrumbsVisibility: (state) => {
    return state.breadcrumbs.visible
  }
}

export default getters
