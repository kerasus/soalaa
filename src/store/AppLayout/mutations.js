export function updateLinearLoading (state, newInfo) {
  state.linearLoading = !!newInfo
}

export function updateWindowSize (state, newInfo) {
  state.windowSize.x = newInfo.width
  state.windowSize.y = newInfo.height
}

export function updateBubbleSize (state, newInfo) {
  state.bubbleSize = newInfo
}

export function updateLoginDialog (state, newInfo) {
  state.loginDialog = newInfo
}

export function showConfirmDialog (state, newInfo) {
  state.confirmDialog = newInfo
}

export function updateBreadcrumbs (state, data) {
  Object.assign(state.breadcrumbs, data)
}
export function updateBreadcrumbLoading (state, data) {
  state.breadcrumbs.loading = data
}
export function updateLastBreadcrumb (state, data) {
  state.breadcrumbs.path[state.breadcrumbs.path.length - 1] = data
}

export function updateVisibilityBreadcrumb (state, data) {
  state.breadcrumbs.visible = data
}

export function updateAppLayout (state, data) {
  const storage = JSON.parse(localStorage.getItem('vuex'))
  Object.assign(storage.AppLayout, data)
  Object.assign(state.appLayout, storage.AppLayout)
}
