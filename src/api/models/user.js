import { appApiInstance, alaaApiInstance } from 'src/boot/axios.js'
import { User } from 'src/models/User.js'
import { ProductList } from 'src/models/Product.js'
import { CartItemList } from 'src/models/CartItem.js'
import APIRepository from '../classes/APIRepository.js'

const APIAdresses = {
  base: '/user',
  edit: (userId) => '/user/' + userId,
  favored: '/user/favored',
  purchasedProducts: '/user/products',
  bankAccounts: '/bank-accounts',
  mobileResend: '/mobile/resend',
  mobileVerify: '/mobile/verify',
  ordersById: (id) => '/user/' + id + '/orders',
  getOrders: '/orders',
  orderStatus: '/payment/status',
  formData: '/megaroute/getUserFormData',
  showUser: '/getUserFor3a',
  eventResult: '/event-result',
  createEventResult: '/event-result/create',
  baseAdmin: '/admin/user',
  nationalCard: '/national-card-photo',
  resendGuest: '/mobile/resendGuest',
  getUserRoleAndPermission: '/getUserRoleAndPermission',
  verifyMoshavereh: '/mobile/verifyMoshavereh',
  newsletter: '/newsletter',
  subscription: {
    landing: '/subscribe/landing',
    list: '/subscribe/user',
    last: '/subscribe/user/last',
    register: (userId) => `/subscribe/user/${userId}`
  },
  statistics: '/user/dashboard/statistics',
  updatePhoto: '/user/avatar',
  feature: '/user/feature'
}

export default class UserAPI extends APIRepository {
  constructor() {
    super('user', appApiInstance, '/user', new User(), APIAdresses)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      purchasedProducts: this.name + this.APIAdresses.purchasedProducts,
      favored: this.name + this.APIAdresses.favored,
      mobileResend: this.name + this.APIAdresses.base,
      mobileVerify: this.name + this.APIAdresses.base,
      bankAccounts: this.name + this.APIAdresses.bankAccounts,
      ordersById: (id) => this.name + this.APIAdresses.ordersById(id),
      getOrders: this.name + this.APIAdresses.base,
      orderStatus: this.name + this.APIAdresses.base,
      formData: this.name + this.APIAdresses.base,
      showUser: this.name + this.APIAdresses.base,
      eventResult: this.name + this.APIAdresses.base,
      createEventResult: this.name + this.APIAdresses.createEventResult,
      baseAdmin: this.name + this.APIAdresses.baseAdmin,
      nationalCard: this.name + this.APIAdresses.nationalCard,
      getUserRoleAndPermission: this.name + this.APIAdresses.getUserRoleAndPermission,
      subscriptionLanding: this.name + this.APIAdresses.subscription.landing,
      subscriptionList: this.name + this.APIAdresses.subscription.list,
      subscriptionLast: this.name + this.APIAdresses.subscription.last,
      subscriptionRegister: (userId) => this.name + this.APIAdresses.subscription.register(userId),
      statistics: this.name + this.APIAdresses.statistics,
      feature: this.name + this.APIAdresses.feature
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new User(response.data.data) },
      post: (response) => { return new User(response.data.data) },
      put: (response) => { return new User(response.data.data) },
      delete: (response) => { return new User(response.data.data) }
    })
  }

  nationalCard(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.nationalCard,
      cacheKey: this.CacheList.nationalCard,
      data,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  storeBankAccounts(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.bankAccounts,
      cacheKey: this.CacheList.bankAccounts,
      data: this.getNormalizedSendData({
        preShabaNumber: 'IR', // String
        shabaNumber: '' // String
      }, data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  edit(data = {}) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.edit(data.userId),
      data: data.data,
      resolveCallback: (response) => {
        return new User(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  updatePhoto(data = {}) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.updatePhoto,
      data: data.data,
      resolveCallback: (response) => {
        return response.data // String
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  // getBankAccounts() {
  //   return this.sendRequest({
  //     apiMethod: 'get',
  //     api: this.api,
  //     request: this.APIAdresses.bankAccounts,
  //     cacheKey: this.CacheList.bankAccounts,
  //     resolveCallback: (response) => {
  //       return new BankAccountsList(response.data)
  //     },
  //     rejectCallback: (error) => {
  //       return error
  //     }
  //   })
  // }

  mobileResend(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.mobileResend,
      cacheKey: this.CacheList.mobileResend,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          code: response
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  mobileVerify(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.mobileVerify,
      resolveCallback: (response) => {
        return {
          status: response
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        code: null // number - string
      }, data)
    })
  }

  ordersById(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.ordersById(data.userId),
      cacheKey: this.CacheList.ordersById(data.userId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          cartItemList: new CartItemList(response.data.data)
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getOrders(data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getOrders,
      cacheKey: this.CacheList.getOrders,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  orderStatus(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.orderStatus,
      cacheKey: this.CacheList.orderStatus,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  formData(data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.formData,
      cacheKey: this.CacheList.formData,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          genders: response.data.data.genders,
          grades: response.data.data.grades,
          majors: response.data.data.majors,
          provinces: response.data.data.provinces,
          cities: response.data.data.cities
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  showUser(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: alaaApiInstance,
      request: this.APIAdresses.showUser,
      cacheKey: this.CacheList.showUser,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return new User(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  // eventResult(data = {}) {
  //   return this.sendRequest({
  //     apiMethod: 'get',
  //     api: this.api,
  //     request: this.APIAdresses.eventResult,
  //     cacheKey: this.CacheList.eventResult,
  //     ...(data.cache && { cache: data.cache }),
  //     resolveCallback: (response) => {
  //       return new EventResult(response.data.data)
  //     },
  //     rejectCallback: (error) => {
  //       return error
  //     }
  //   })
  // }

  createEventResult(data = {}, cache = 1000) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.createEventResult,
      cacheKey: this.CacheList.createEventResult,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          events: response.data.data.events,
          majors: response.data.data.majors,
          eventResultStatuses: response.data.data.eventResultStatuses,
          regions: response.data.data.regions
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  adminIndex(data = {}) {
    const routeWithParams = function (defaultRoute, payload) {
      if (typeof payload.rollId === 'object') {
        const hasRoll = []
        payload.rollId.forEach(rollId => {
          hasRoll.push(rollId)
        })
        return defaultRoute.concat('?hasRole[]=', hasRoll)
      }
      return defaultRoute.concat('?hasRole[]=', payload.rollId)
    }
    const requestRoute = routeWithParams(this.APIAdresses.baseAdmin, {
      rollId: data.data.rollId // array or number
    })
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: requestRoute,
      cacheKey: this.CacheList.baseAdmin,
      ...(data.cache && { cache: data.cache }),
      // paramSerializer: '/?hasRoll[]=10',
      // params: this.getPayload({
      //   hasRoll: [] // array
      // }, data.data),
      resolveCallback: (response) => {
        return {
          list: response.data.data,
          links: response.data.links,
          meta: response.data.meta
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getPurchasedProducts(data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.purchasedProducts,
      cacheKey: this.CacheList.purchasedProducts,
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          referralCodeList: new ProductList(response.data.data),
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

  getUserRoleAndPermission(data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getUserRoleAndPermission,
      cacheKey: this.CacheList.getUserRoleAndPermission,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  // getFavored(data = {}, cache) {
  //   return this.sendRequest({
  //     apiMethod: 'get',
  //     api: this.api,
  //     request: this.APIAdresses.favored,
  //     cacheKey: this.CacheList.favored + JSON.stringify(data),
  //     ...(cache !== undefined && { cache }),
  //     data: this.getNormalizedSendData({
  //       page: 1 // Number
  //     }, data),
  //     resolveCallback: (response) => {
  //       return {
  //         favoredList: new FavoredList(response.data.data),
  //         paginate: response.data.meta
  //         // {
  //         //   current_page: 1,
  //         //   from: 1,
  //         //   last_page: 1,
  //         //   path: '...',
  //         //   per_page: 15,
  //         //   to: 10,
  //         //   total: 10
  //         // }
  //       }
  //     },
  //     rejectCallback: (error) => {
  //       return error
  //     }
  //   })
  // }

  resendGuest(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.resendGuest,
      data: this.getNormalizedSendData({
        mobile: '' // String
      }, data),
      resolveCallback: (response) => {
        return {
          message: response.data.message,
          code: response.data.code ? response.data.code : null
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  verifyMoshavereh(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.verifyMoshavereh,
      data: this.getNormalizedSendData({
        mobile: '', // String
        code: '' // String
      }, data),
      resolveCallback: (response) => {
        return response.data.message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  newsletter(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.verifyMoshavereh,
      data: this.getNormalizedSendData({
        mobile: '', // String
        code: '', // String
        first_name: '', // String
        last_name: '', // String
        major_id: '', // String
        grade_id: '' // String
      }, data),
      resolveCallback: (response) => {
        return response.data.message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getFeature(data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.feature,
      cacheKey: this.CacheList.feature,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data // Boolean
      },
      rejectCallback: (error) => {
        return error
      },
      ...(data && { data })
    })
  }

  subscriptionLanding(data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.subscription.landing,
      cacheKey: this.CacheList.subscriptionLast,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data // Array of Strings Object (key,val)
      },
      rejectCallback: (error) => {
        return error
      },
      ...(data && { data })
    })
  }

  subscriptionLast(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.subscription.last,
      cacheKey: this.CacheList.subscriptionLast,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data.subscribe
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  subscriptionList(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.subscription.list,
      cacheKey: this.CacheList.subscriptionList,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  subscriptionRegister(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.subscription.register(data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  statistics(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.statistics,
      cacheKey: this.CacheList.statistics,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
