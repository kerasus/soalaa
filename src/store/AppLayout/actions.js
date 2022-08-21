export function updateAppBarAndDrawer (context, newInfo) {
  this.commit('AppLayout/updateLayoutHeaderVisible', newInfo)
  this.commit('AppLayout/updateLayoutLeftDrawerVisible', newInfo)
}
export function showConfirmDialog (context, newInfo) {
  this.commit('AppLayout/showConfirmDialog', newInfo)
}

export function updateTemplateHeaderType (context, newInfo) {
  if (newInfo.headerType !== undefined) {
    this.commit('AppLayout/changeTemplateHeaderType', newInfo.headerType)
  }
  if (newInfo.sideBarType !== undefined) {
    this.commit('AppLayout/changeTemplateSideBarType', newInfo.sideBarType)
  }
  if (newInfo.headerVisibility !== undefined) {
    this.commit('AppLayout/updateLayoutHeaderVisible', newInfo.headerVisibility)
  }
  if (newInfo.sideBarVisibility !== undefined) {
    this.commit('AppLayout/updateLayoutLeftDrawerVisible', newInfo.sideBarVisibility)
    this.commit('AppLayout/updateLayoutRightDrawerVisible', newInfo.sideBarVisibility)
  } else {
    return null
  }
}
