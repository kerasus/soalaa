import APIRepository from '../classes/APIRepository.js'
import { apiV2 } from 'src/boot/axios.js'
import { ProductList } from 'src/models/Product'
import { Set } from 'src/models/Set'
// import { Fake } from '../classes/fakeDataGenerator.js'
const APIAdresses = {
  base: 'events',
  formBuilder: '/admin/form-builder',
  eventsProducts: (eventId) => `/events/${eventId}/products`,
  eventAdvisor: (eventId) => `/events/${eventId}/advisor`
}
export default class EventsAPI extends APIRepository {
  constructor() {
    super('Chatr', apiV2, 'chatr', {}, APIAdresses)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      formBuilder: this.name + this.APIAdresses.formBuilder,
      eventsProducts: (eventId) => this.name + this.APIAdresses.eventsProducts(eventId),
      eventAdvisor: (eventId) => this.name + this.APIAdresses.eventAdvisor(eventId)
    }
  }

  getEventsProducts(data, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.eventsProducts(data.eventId),
      cacheKey: this.CacheList.eventsProducts(data.eventId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
    // const products = new Promise((resolve, reject) => {
    //   const productList = fake.fakeData(product, 5)
    //   resolve(productList)
    // })
    // return products
  }

  formBuilder(data = {}, cache) {
    const routeWithParams = function (defaultRoute, payload) {
      if (!Array.isArray(payload.types)) {
        const types = []
        payload.types.forEach(type => {
          types.push(type)
        })
        return defaultRoute.concat('?types[]=', types)
      }
      return defaultRoute.concat('?types[]=', payload.types)
    }
    const requestRoute = routeWithParams(this.APIAdresses.formBuilder, {
      types: data.params // array or number
    })
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: requestRoute,
      cacheKey: this.CacheList.formBuilder,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getEventsAdvisor(data, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.eventAdvisor(data.eventId),
      cacheKey: this.CacheList.eventAdvisor(data.eventId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Set(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
    // const products = new Promise((resolve, reject) => {
    //   const productList = fake.fakeData(product, 5)
    //   resolve(productList)
    // })
    // return products
  }
}

// const product = {
//   title: null,
//   description: null,
//   teacher: null,
//   photo: null,
//   url: null,
//   lastSeen: {
//     title: null,
//     section: null,
//     url: null
//   }
// }
// const fake = new Fake()
