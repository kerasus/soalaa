export function updateDrawer (state, newInfo) {
  state.drawer = newInfo
}
export function updateAppBar (state, newInfo) {
  state.appBar = newInfo
}
export function updateOverlay (state, newInfo) {
  state.overlay = newInfo
}
export function updateWindowSize (state, newInfo) {
  state.windowSize = newInfo
}
export function updateBubbleSize (state, newInfo) {
  state.bubbleSize = newInfo
}
export function updateColumnsWidth (state, newInfo) {
  state.ColumnsWidth = newInfo
}
export function updateAppBarAndDrawer (state, newInfo) {
  this.commit('AppLayout/updateAppBar', newInfo)
  this.commit('AppLayout/updateDrawer', newInfo)
}
// export function showConfirmDialog (state, newInfo) {
//   Vue.$confirm({
//     message: newInfo.message,
//     button: newInfo.button,
//     callback: confirm => {
//       newInfo.callback(confirm)
//     }
//   })
// }
