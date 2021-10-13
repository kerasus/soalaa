/**
 * Auth middleware example.
 */
export default function auth (/* { to, from, next, store } */ { next, store }) {
  if (!store.getters.auth) {
    return next({ name: 'login' })
  }
  return next()
}
