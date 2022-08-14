class Permissions {
  static hasAllOfThese (permissionArray) {
    return ({ next, store, to }) => {
      const user = store.getters['Auth/user']
      const notIncludedPermissions = permissionArray.find(permission => !user.hasPermission(permission))
      console.log('notIncludedPermissions', notIncludedPermissions)
      if (notIncludedPermissions) {
        return next({ name: 'dashboard' })
      }
      return next()
    }
  }

  static hasOneOfThese (permissionArray) {
    return ({ next, store, to }) => {
      const user = store.getters['Auth/user']
      const includedPermissions = permissionArray.find(permission => user.hasPermission(permission))
      console.log('includedPermissions', includedPermissions)
      if (!includedPermissions) {
        return next({ name: 'dashboard' })
      }

      return next()
    }
  }

  static hasPermission (permission) {
    return ({ next, store, to }) => {
      const user = store.getters['Auth/user']
      if (!user.hasPermission(permission)) {
        return next({ name: 'dashboard' })
      }

      return next()
    }
  }
}

export default Permissions
