import { Cookies } from 'quasar'
import { APIGateway } from 'src/api/APIGateway.js'

export function login (context, data) {
  return APIGateway.auth.login(data)
    .then(({ accessToken, user }) => {
      context.commit('updateUser', user)
      context.commit('updateAccessToken', accessToken)
      if (typeof window !== 'undefined') {
        Cookies.set('BearerAccessToken', accessToken, {
          // domain: '.' + window.location.host,
          path: '/',
          expires: '365d'
        })
      }
      context.commit('updateAxiosAuthorization', accessToken)
      // const tokenType = 'Bearer'
      // this.$accessToken = accessToken
      // this.$alaaApiInstance.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      // this.$alaaApiInstance.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
    })
}

export function logOut (context, payload) {
  const redirectTo = payload?.redirectTo
  const clearRedirectTo = payload?.clearRedirectTo
  context.commit('updateAccessToken', null)
  context.commit('updateUser', null)
  if (typeof window !== 'undefined') {
    Cookies.set('BearerAccessToken', '', {
      // domain: '.' + window.location.host,
      path: '/'
      // expires: '365d'
    })
  }
  context.commit('updateAxiosAuthorization', null)
  // this.$accessToken = null
  // this.$axios.defaults.headers.common.Authorization = null
  // this.$apiV1.defaults.headers.common.Authorization = null
  // this.$apiV2.defaults.headers.common.Authorization = null
  // this.$apiWeb.defaults.headers.common.Authorization = null
  if (typeof clearRedirectTo === 'undefined' || clearRedirectTo === true) {
    context.commit('updateRedirectTo', null)
  }
  if (typeof redirectTo === 'undefined' || redirectTo === true) {
    this.$router.push({ name: 'login' })
  }
}
