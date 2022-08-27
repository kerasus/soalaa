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
  if (newInfo.headerType !== undefined) {
    this.commit('AppLayout/changeTemplateHeaderType', newInfo.headerType)
  }
  if (newInfo.sideBarType !== undefined) {
    this.commit('AppLayout/changeTemplateSideBarType', newInfo.sideBarType)
  }
  if (newInfo.leftSideBarType !== undefined) {
    this.commit('AppLayout/changeTemplateLeftSideBarType', newInfo.sideBarType)
  }
  if (newInfo.rightSideBarType !== undefined) {
    this.commit('AppLayout/changeTemplateRightSideBarType', newInfo.sideBarType)
  }
  if (newInfo.headerVisibility !== undefined) {
    this.commit('AppLayout/updateLayoutHeaderVisible', newInfo.headerVisibility)
  }
  if (newInfo.properties !== undefined) {
    this.dispatch('AppLayout/updateStore', newInfo.properties)
  }
  if (newInfo.sideBarVisibility !== undefined) {
    this.commit('AppLayout/updateLayoutLeftDrawerVisible', newInfo.sideBarVisibility)
    this.commit('AppLayout/updateLayoutRightDrawerVisible', newInfo.sideBarVisibility)
  } else {
    return null
  }
}
