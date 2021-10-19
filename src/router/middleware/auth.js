/**
 * Auth middleware example.
 */
export default function auth (/* { to, from, next, store } */ { next, store }) {
  if (!store.getters['Auth/accessToken']) {
    return next({ name: 'login' })
  }
  return next()
}
