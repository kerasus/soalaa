export function updateAppBarAndDrawer (context, newInfo) {
  this.commit('updateLayoutHeaderVisible', newInfo)
  this.commit('updateLayoutLeftDrawerVisible', newInfo)
}
