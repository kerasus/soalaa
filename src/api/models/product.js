import { apiV2 } from 'src/boot/axios'
import { SetList } from 'src/models/Set.js'
import { Content, ContentList } from 'src/models/Content.js'
import APIRepository from '../classes/APIRepository.js'
import { Product, ProductList } from 'src/models/Product.js'
import { ProductCategoryList } from 'src/models/ProductCategory'

export default class ProductAPI extends APIRepository {
  constructor() {
    super('product', apiV2)
    this.APIAdresses = {
      base: '/product',
      bulk: (productIds) => {
        const idParams = []
        productIds.forEach((productId, productIndex) => {
          idParams.push('ids' + '[' + productIndex + ']=' + productId)
        })
        const queryParams = idParams.join('&')
        return '/product?' + queryParams
      },
      create: '/reqres/api/users',
      edit: '/admin/product',
      index: '/admin/product',
      getSets: id => `/product/${id}/sets`,
      getComments: id => `/product/${id}/content-comments`,
      getContents: id => `/product/${id}/contents`,
      favored: (id) => '/product/' + id + '/favored',
      unfavored: (id) => '/product/' + id + '/unfavored',
      show: (id) => '/product/' + id,
      gifts: (id) => '/gift-products/' + id,
      sampleContent: (id) => '/product/' + id + '/sample',
      categories: '/product-categories',
      userLastState: (id) => '/product/' + id + '/toWatch'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      bulk: (productIds) => this.name + this.APIAdresses.bulk(productIds),
      create: this.name + this.APIAdresses.create,
      favored: id => this.name + this.APIAdresses.favored(id),
      getSets: id => this.name + this.APIAdresses.getSets(id),
      getContents: id => this.name + this.APIAdresses.getContents(id),
      unfavored: id => this.name + this.APIAdresses.unfavored(id),
      show: (id) => this.name + this.APIAdresses.show(id),
      gifts: (id) => this.name + this.APIAdresses.gifts(id),
      sampleContent: (id) => this.name + this.APIAdresses.sampleContent(id),
      categories: this.name + this.APIAdresses.categories,
      edit: this.name + this.APIAdresses.edit
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Product(response.data.data) },
      post: (response) => { return new Product(response.data.data) },
      put: (response) => { return new Product(response.data.data) },
      delete: (response) => { return new Product(response.data.data) }
    })
  }

  show(productId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.show(productId),
      cacheKey: this.CacheList.show(productId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Product(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  gifts(productId, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.gifts(productId),
      cacheKey: this.CacheList.gifts(productId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  sampleContent(productId, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.sampleContent(productId),
      cacheKey: this.CacheList.sampleContent(productId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ContentList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  favored(productId) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.favored(productId),
      cacheKey: this.CacheList.favored(productId),
      resolveCallback: (response) => {
        const defaultMessageObject = {
          message: '' // String
        }
        return this.getNormalizedSendData(defaultMessageObject, response.data).message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  unfavored(productId) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.unfavored(productId),
      cacheKey: this.CacheList.unfavored(productId),
      resolveCallback: (response) => {
        const defaultMessageObject = {
          message: '' // String
        }
        return this.getNormalizedSendData(defaultMessageObject, response.data).message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getProductList(data, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.bulk(data.productIds),
      cacheKey: this.CacheList.bulk(data.productIds),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.params
    })
  }

  getSets(data, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getSets(data),
      cacheKey: this.CacheList.getSets(data),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return new SetList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getContents(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getContents(data.id),
      cacheKey: this.CacheList.getContents(data.id),
      ...(cache !== undefined && { cache }),
      ...(cache !== data && { data: data.data }),
      resolveCallback: (response) => {
        return new ContentList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      params: data.params
    })
  }

  getCategories(cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.categories,
      cacheKey: this.CacheList.categories,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ProductCategoryList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getUserLastState(id, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.userLastState(id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Content(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}

// function loadFakeSets(sets) {
//   let categoryCounter = 1
//   return sets.map((set, setIndex) => {
//     if ((setIndex % 4) > 2) {
//       categoryCounter++
//     }
//     const lessonName = 'درس شماره ' + categoryCounter
//     const setCategoryName = 'سرفصل شماره ' + categoryCounter
//     const setName = set.short_title
//     return {
//       id: set.id,
//       sections: set.sections,
//       short_title: lessonName + '-' + setCategoryName + '-' + setName
//     }
//   })
// }
