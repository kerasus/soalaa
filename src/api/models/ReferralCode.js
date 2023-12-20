import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { ReferralCodeList } from 'src/models/ReferralCode'

export default class ReferralCodeAPI extends APIRepository {
  constructor() {
    super('gift-card', apiV2)
    this.APIAdresses = {
      base: '/referral-code',
      orderProducts: '/referral-code/orderproducts',
      batchStore: '/referral-code/batch-store',
      orderReferralCode: '/order-referral-code',
      sales_man: '/sales-man',
      contract: '/sales-man/contract',
      walletWithdraw: '/wallet/withdraw',
      walletWithdrawRequests: '/wallet/withdraw-requests',
      assign: (referralCode) => '/referral-code/' + referralCode + '/assign'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      sales_man: this.name + this.APIAdresses.sales_man,
      walletWithdrawRequests: this.name + this.APIAdresses.walletWithdrawRequests
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
  }

  // rest
  // has get

  index (data, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      ...(cache !== undefined && { cache }),
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data.data),
      resolveCallback: (response) => {
        return {
          referralCodeList: new ReferralCodeList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: '...',
          //   per_page: 15,
          //   to: 10,
          //   total: 10
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getOrderProducts () {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.orderProducts,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  batchStore (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.batchStore,
      data: this.getNormalizedSendData({
        discounttype_id: 2, // Number -- optional
        number_of_codes: 0, // Number
        commission: 0, // Number
        mobile: '', // String
        nationalCode: '', // String
        firstName: '', // String
        lastName: '' // String
      }, data.data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  submitReferralCodeOnOrder (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.orderReferralCode,
      data: this.getNormalizedSendData({
        referral_code: '', // String
        order_id: 0 // Number
      }, data.data),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  DeleteReferralCodeFromOrder (data) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.orderReferralCode,
      data: this.getNormalizedSendData({
        order_id: 0 // Number
      }, data.data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  setShared (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.assign(data.data.referralCode),
      data: this.getNormalizedSendData({
        assign: true // Boolean -- optional
      }, data.data),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getSalesManData (cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.sales_man,
      cacheKey: this.CacheList.sales_man,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return {
          wallet_type: response.data.wallet_type ? response.data.wallet_type.toString() : null, // type: String,  Example: main_account
          wallet_balance: response.data.wallet_balance ? response.data.wallet_balance.toNumber() : null, // type: Number,  Example: 10000
          total_commission: response.data.total_commission ? response.data.total_commission.toNumber() : null, // type: Number,  Example: 10000
          has_signed_contract: response.data.has_signed_contract ? response.data.has_signed_contract : null, // type: Boolean(true/false)
          minAmount_until_settlement: response.data.minAmount_until_settlement ? response.data.minAmount_until_settlement.toNumber() : null, // type: Number,  Example: 10000
          count_of_total_gift_cards: response.data.count_of_total_gift_cards ? response.data.count_of_total_gift_cards.toNumber() : null, // type: Number,  Example: 11
          count_of_used_gift_cards: response.data.count_of_used_gift_cards ? response.data.count_of_used_gift_cards.toNumber() : null, // type: Number,  Example: 3
          count_of_remain_gift_cards: response.data.count_of_remain_gift_cards ? response.data.count_of_remain_gift_cards.toNumber() : null, // type: Number,  Example: 8
          income_being_settle: response.data.income_being_settle ? response.data.income_being_settle.toNumber() : null // type: Number,  Example: 90000
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getWithdrawWallet () {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.walletWithdraw,
      cacheKey: this.CacheList.walletWithdraw,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getWithdrawHistory (cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.walletWithdrawRequests,
      cacheKey: this.CacheList.walletWithdrawRequests,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  submitContract () {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.contract,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
