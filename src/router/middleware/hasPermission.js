export default function hasPermission (permission) {
  return ({ next, store, to }) => {
    // console.log('const user')
    const user = store.getters['Auth/user']
    if (!user.hasPermission(permission)) {
      return next({ name: 'dashboard' })
    }

    return next()
  }
}
