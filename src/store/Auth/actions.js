import API_ADDRESS from 'src/api/Addresses'
import { axios } from 'boot/axios'

export function login (context, data) {
  return axios.post(API_ADDRESS.auth.login, data)
    .then(res => {
      const accessToken = res.data.data.access_token
      axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken
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
