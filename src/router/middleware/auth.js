/**
 * Auth middleware example.
 */
export default function auth (/* { to, from, next, store } */ { next, to, store }) {
  const accessToken = store.$accessToken
  const loginRouteName = 'login'
  // const hasSessionToken = Object.keys(store.$sessions).filter(sessionName => !!store.$sessions[sessionName]).length === Object.keys(store.$sessions).length

  // if (!accessToken || !hasSessionToken) {
  if (!accessToken) {
    store.commit('Auth/updateRedirectTo', { name: to.name, params: to.params })
    return next({ name: loginRouteName })
  }

  return next()
}
