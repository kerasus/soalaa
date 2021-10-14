export function updateUser (state, newInfo) {
  state.user = newInfo
}
export function updateAccessToken (state, newInfo) {
  console.log('mue')
  state.accessToken = newInfo
}
export function updateRedirectTo (state, newInfo) {
  state.redirectTo = newInfo
}
