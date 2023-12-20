export function updateAxiosAuthorization (state, accessToken) {
  const tokenType = 'Bearer'
  const token = accessToken ? (tokenType + ' ' + accessToken) : null

  this.$accessToken = accessToken
  if (this.$axios) {
    this.$axios.defaults.headers.common.Authorization = token
  }
  if (this.$apiV1) {
    this.$apiV1.defaults.headers.common.Authorization = token
  }
  if (this.$apiV2) {
    this.$apiV2.defaults.headers.common.Authorization = token
  }
  if (this.$apiWeb) {
    this.$apiWeb.defaults.headers.common.Authorization = token
  }
}

export function updateUser (state, newInfo) {
  state.user = newInfo
}

export function updateAccessToken (state, newInfo) {
  state.accessToken = newInfo
}
export function updateRedirectTo (state, newInfo) {
  state.redirectTo = newInfo
}
export function setAccessToken (state, newInfo) {
  // ToDo: set token
  // axios.defaults.headers.common.Authorization = 'Bearer ' + newInfo
}
