export function updateAppBarAndDrawer (context, newInfo) {
  this.commit('AppLayout/updateLayoutHeaderVisible', newInfo)
  this.commit('AppLayout/updateLayoutLeftDrawerVisible', newInfo)
}
export function showConfirmDialog (context, newInfo) {
  this.commit('AppLayout/showConfirmDialog', newInfo)
}
export function showLoginDialog (context, newInfo) {
  let redirectTo = newInfo?.redirectTo
  if (!newInfo?.redirectTo) {
    redirectTo = null
  }
  this.dispatch('Auth/logOut', null, { root: true })
  this.commit('Auth/updateRedirectTo', redirectTo, { root: true })
  this.commit('AppLayout/updateLoginDialog', true)
}

export function updateTemplateHeaderType (context, newInfo) {
  this.commit('AppLayout/changeTemplateHeaderType', newInfo)
}
