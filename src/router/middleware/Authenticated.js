export default function Authenticated ({ next, store, to }) {
  const accessToken = store.$accessToken
  // const hasSessionToken = Object.keys(store.$sessions).filter(sessionName => !!store.$sessions[sessionName]).length === Object.keys(store.$sessions).length

  // if (!accessToken || !hasSessionToken) {
  if (!accessToken) {
    store.commit('Auth/updateRedirectTo', { name: to.name, params: to.params, query: to.query })
    return next({ name: 'login' })
  }

  return next()
}
