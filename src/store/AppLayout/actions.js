const actions = {
  showConfirmDialog: (context, newInfo) => {
    context.commit('showConfirmDialog', newInfo)
  },
  showLoginDialog: (context, newInfo) => {
    let redirectTo = newInfo?.redirectTo
    if (!newInfo?.redirectTo) {
      redirectTo = null
    }
    this.dispatch('Auth/logOut', null, { root: true })
    context.commit('Auth/updateRedirectTo', redirectTo, { root: true })
    context.commit('updateLoginDialog', true)
  }
}

export default actions
