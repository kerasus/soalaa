export function linearLoading (context, value) {
  context.commit('linear', value)
}
export function overlayLoading (context, value) {
  context.commit('spinner', value)
}
