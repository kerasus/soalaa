import API_ADDRESS from 'src/api/Addresses'
import { axios } from 'boot/axios'

const actions = {
  login: (context, data) => {
    return new Promise((resolve, reject) => {
      axios.post(API_ADDRESS.auth.login, data)
        .then(response => {
          const accessToken = response.data.data.access_token
          axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken
          context.commit('updateAccessToken', accessToken)
          context.commit('updateUser', response.data.data.user)
          context.commit('setAccessToken', accessToken)
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logOut: (context) => {
    context.commit('updateAccessToken', null)
    context.commit('updateUser', null)
    context.commit('updateRedirectTo', null)
  }
}

export default actions
