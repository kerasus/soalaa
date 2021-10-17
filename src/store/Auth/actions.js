import API_ADDRESS from 'src/api/Addresses'

export function login (context, data) {
  return this.$axios.post(API_ADDRESS.auth.login, data)
    .then(res => {
      const accessToken = res.data.data.access_token
      context.commit('updateAccessToken', accessToken)
      context.commit('updateUser', res.data.data.user)
      context.commit('setAccessToken', accessToken)
    })
}
export function logOut (context) {
  context.commit('updateAccessToken', null)
  context.commit('updateUser', null)
  context.commit('updateRedirectTo', null)
  this.$router.push({ name: 'login' })
}
