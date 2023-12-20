import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class GiftCardAPI extends APIRepository {
  constructor() {
    super('gift-card', apiV2)
    this.APIAdresses = {
      withdraw: '/wallet/withdraw', // POST
      withdrawRequests: '/wallet/withdraw-requests' // GET
    }
    this.restUrl = (id) => this.url + '/' + id
  }

  withdrawTotalWallet (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.withdraw,
      data: data.date,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getWithdrawRequests (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.withdrawRequests,
      data: data.date,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
