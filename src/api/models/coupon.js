import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'

export default class CouponAPI extends APIRepository {
  constructor() {
    super('coupon', apiV2)
    this.APIAddresses = {
      base: '/orderCoupon',
      // delete: '/orderCoupon',
      create: '/v2/admin/coupon',
      edit: '',
      index: '/admin/coupon',
      show: '/v2/admin/coupon/10'
    }
    this.CacheList = {
      base: this.name + this.APIAddresses.base
    }
  }

  base(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAddresses.base,
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  deleteCoupon(data = {}) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAddresses.base,
      cacheKey: this.CacheList.base,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
