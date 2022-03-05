export function updateAppBarAndDrawer (context, newInfo) {
  this.commit('AppLayout/updateLayoutHeaderVisible', newInfo)
  this.commit('AppLayout/updateLayoutLeftDrawerVisible', newInfo)
}
