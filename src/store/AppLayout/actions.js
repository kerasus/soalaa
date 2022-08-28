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

export function updateTemplateLayout (context, newInfo) {
  if (newInfo.layoutHeaderType !== undefined) {
    this.commit('AppLayout/changeTemplateHeaderType', newInfo.layoutHeaderType)
  }
  if (newInfo.layoutLeftSideBarType !== undefined) {
    this.commit('AppLayout/changeTemplateLeftSideBarType', newInfo.layoutLeftSideBarType)
  }
  if (newInfo.layoutRightSideBarType !== undefined) {
    this.commit('AppLayout/changeTemplateRightSideBarType', newInfo.layoutRightSideBarType)
  }
  this.dispatch('AppLayout/updateStore', newInfo)
}
