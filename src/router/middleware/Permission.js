class Permissions {
  static hasAllOfThese (permissionArray) {
    return this.hasPermission(permissionArray, 'hasAll')
  }

  static hasOneOfThese (permissionArray) {
    return this.hasPermission(permissionArray, 'hasOne')
  }

  static hasPermission (permission, mode) {
    return ({ next, store, to }) => {
      const user = store.getters['Auth/user']
      let StopRouting = false
      if (typeof permission === 'string') {
        if (!user.hasPermission(permission)) {
          StopRouting = true
        }
      } else if (mode === 'hasOne') {
        const includedPermissions = permission.find(permission => user.hasPermission(permission))
        if (!includedPermissions) {
          StopRouting = true
        }
      } else if (mode === 'hasAll') {
        const notIncludedPermissions = permission.find(permission => !user.hasPermission(permission))
        if (notIncludedPermissions) {
          StopRouting = true
        }
      }
      if (StopRouting) {
        return next({ name: 'dashboard' })
      }

      return next()
    }
  }
}

export default Permissions
