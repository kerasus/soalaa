import { Cart } from 'src/models/Cart'
import { appApiInstance } from 'src/boot/axios'
import APIRepository from '../classes/APIRepository'

export default class CartAPI extends APIRepository {
  constructor() {
    super('cart', appApiInstance)
    this.seller = 2 // 1: Alaa - 2: Soala
    this.APIAdresses = {
      addToCart: '/orderproduct',
      discountSubmit: '/order/submitCoupon',
      discountRemove: '/order/RemoveCoupon',
      reviewCart: '/checkout/review',
      getPaymentRedirectEncryptedLink: '/getPaymentRedirectEncryptedLink?seller=' + this.seller,
      removeFromCart: (id) => '/orderproduct/' + id
    }
    this.CacheList = {
      addToCart: this.name + this.APIAdresses.addToCart,
      discountSubmit: this.name + this.APIAdresses.discountSubmit,
      discountRemove: this.name + this.APIAdresses.discountRemove,
      getPaymentRedirectEncryptedLink: this.name + this.APIAdresses.getPaymentRedirectEncryptedLink,
      reviewCart: this.name + this.APIAdresses.reviewCart,
      removeFromCart: id => this.name + this.APIAdresses.removeFromCart(id)
    }
  }

  addToCart(data = {}, cache) {
    const payload = {
      product_id: data.product_id, // Number or String
      products: data.products, // Number or String (List ofProduct's ID)
      attribute: data.attribute, // Number or String
      seller: this.seller
    }
    if (!payload.products || (Array.isArray(payload.products) && payload.products.length === 0)) {
      delete payload.products
    }
    if (!payload.attribute || (Array.isArray(payload.attribute) && payload.attribute.length === 0)) {
      delete payload.attribute
    }
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.addToCart,
      cacheKey: this.CacheList.addToCart,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data: payload
    })
  }

  discountSubmit(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.discountSubmit,
      cacheKey: this.CacheList.discountSubmit,
      ...(data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      params: data.params
    })
  }

  discountRemove(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.discountRemove,
      cacheKey: this.CacheList.discountRemove,
      ...(!!data.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  reviewCart(cartItems = [], cache = { TTL: 100 }) {
    const queryParams = {}
    queryParams.seller = this.seller
    cartItems.forEach((cartItem, cartItemIndex) => {
      queryParams['cartItems' + '[' + cartItemIndex + ']' + '[product_id]'] = cartItem.product_id
      if (Array.isArray(cartItem.products)) {
        cartItem.products.forEach((productItem, productItemIndex) => {
          queryParams['cartItems' + '[' + cartItemIndex + ']' + '[products]' + '[' + productItemIndex + ']'] = productItem
        })
      }
    })
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.reviewCart,
      cacheKey: this.CacheList.reviewCart,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return new Cart(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: queryParams
    })
  }

  getPaymentRedirectEncryptedLink(data = {}, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getPaymentRedirectEncryptedLink,
      cacheKey: this.CacheList.getPaymentRedirectEncryptedLink,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return response.data.data.url
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  removeFromCart(orderProductId) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.removeFromCart(orderProductId),
      cacheKey: this.CacheList.removeFromCart(orderProductId),
      resolveCallback: (response) => {
        return new Cart(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
