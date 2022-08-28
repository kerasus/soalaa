import API_ADDRESS from 'src/api/Addresses'
import Price from 'src/models/Price'
import { Coupon } from 'src/models/Coupon'
import { CartItemList } from 'src/models/CartItem'
import { axios } from 'src/boot/axios'
import CookieCart from 'src/assets/js/CookieCart'

export function addToCart (context, product) {
  const isUserLogin = !!this.getters['Auth/isUserLogin']
  const cart = context.getters.cart

  return new Promise((resolve, reject) => {
    if (isUserLogin) {
      axios
        .post(API_ADDRESS.cart.orderproduct.add, { product_id: product.id })
        .then((response) => {
          return resolve(response)
        })
        .catch((error) => {
          return reject(error)
        })
    } else {
      cart.addToCart(product)
      return resolve(true)
    }
  })
}

export function reviewCart (context, product) {
  const isUserLogin = !!this.getters['Auth/isUserLogin']
  const currentCart = context.getters.cart

  if (!isUserLogin) {
    CookieCart.addToCartInCookie(currentCart)
  }

  return new Promise((resolve, reject) => {
    axios
      .get(API_ADDRESS.cart.review)
      .then((response) => {
        const invoice = response.data.data

        const cart = {
          count: invoice.count,
          price: new Price(invoice.price),
          items: new CartItemList(),
          couponInfo: new Coupon(invoice.coupon)
        }

        if (invoice.count > 0) {
          invoice.items[0].order_product.forEach((order) => {
            cart.items.list.push(order)
          })
        }

        if (product) {
          const isExist = cart.items.list.find(
            (item) => item.id === product.id
          )
          if (!isExist) {
            cart.items.list.push(product)
          }
        }

        context.commit('updateCart', cart)

        return resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function removeItemFromCart (context, productId) {
  const isUserLogin = !!this.getters['Auth/isUserLogin']

  return new Promise((resolve, reject) => {
    if (isUserLogin) {
      axios
        .delete(API_ADDRESS.cart.orderproduct.delete(productId))
        .then((response) => {
          return resolve(response)
        })
        .catch((error) => {
          return reject(error)
        })
    } else {
      const cart = context.getters.cart

      cart.removeItem(productId)
      context.commit('updateCart', cart)

      CookieCart.removeCartItemFromCookieCart(productId)
      return resolve(true)
    }
  })
}

export function deleteList (context) {
  const isUserLogin = !!this.getters['Auth/isUserLogin']
  const cart = context.getters.cart

  return new Promise((resolve, reject) => {
    if (isUserLogin) {
      cart.items.list.forEach((item) => {
        // TODO => very bad code
        context
          .dispatch('removeItemFromCart', item.id)
          .then((response) => {
            return resolve(response)
          })
          .catch((error) => {
            return reject(error)
          })
      })
    } else {
      cart.removeAllItems()
      CookieCart.deleteCartItemListFromCookie()
      return resolve(true)
    }
  })
}
