import API_ADDRESS from 'src/api/Addresses'

export function login (context, data) {
  return this.$axios.post(API_ADDRESS.auth.login, data)
    .then(res => {
      console.log(res)
      const accessToken = res.data.data.access_token
      console.log('in action', this.$axios.defaults.headers)
      context.commit('updateAccessToken', accessToken)
      context.commit('updateUser', res.data.data.user)
      this.$axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken
    })
}
