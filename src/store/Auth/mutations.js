export function updateUser (state, newInfo) {
  state.user = newInfo
}
export function updateAccessToken (state, newInfo) {
  state.accessToken = newInfo
}
export function updateRedirectTo (state, newInfo) {
  state.redirectTo = newInfo
}
export function setAccessToken (newInfo) {
  this.$axios.defaults.headers.common.Authorization = 'Bearer ' + newInfo
}
