import { Cookies } from 'quasar'
import { APIGateway } from 'src/api/APIGateway.js'

export function login (context, data) {
  return APIGateway.auth.login(data)
    .then(({ accessToken, user }) => {
      context.commit('updateUser', user)
      context.commit('updateAccessToken', accessToken)
      Cookies.set('BearerAccessToken', accessToken)
      const tokenType = 'Bearer'
      this.$accessToken = accessToken
      this.$alaaApiInstance.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
      this.$alaaApiInstance.defaults.headers.common.Authorization = tokenType + ' ' + accessToken
    })
}

export function logOut (context, clearRedirectTo = true) {
  context.commit('updateAccessToken', null)
  context.commit('updateUser', null)
  Cookies.set('BearerAccessToken', '')
  if (clearRedirectTo) {
    context.commit('updateRedirectTo', null)
  }
  this.$router.push({ name: 'login' })
}
