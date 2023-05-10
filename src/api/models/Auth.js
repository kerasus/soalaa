import { User } from 'src/models/User'
import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class AuthAPI extends APIRepository {
  constructor() {
    super('auth', appApiInstance)
    this.APIAdresses = {
      login: '/user/login'
    }
    this.CacheList = {}
  }

  login (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.login,
      data: this.getNormalizedSendData({
        mobile: '', // String
        password: '' // String
      }, data),
      resolveCallback: (response) => {
        // const user = response.data.data.user
        const accessToken = response.data.data.access_token
        const user = new User(response.data.data.user)

        return { accessToken, user }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
