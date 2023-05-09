/**
 * Auth middleware example.
 */
export default function auth (/* { to, from, next, store } */ { next, to, store }) {
  if (!store.getters['Auth/accessToken']) {
    const loginRouteName = 'login'
    const currentRoute = to
    if (currentRoute && currentRoute.name !== loginRouteName) {
      store.commit('Auth/updateRedirectTo', currentRoute)
    }

    return next({ name: loginRouteName })
  }
  return next()
}
