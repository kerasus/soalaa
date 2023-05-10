import { Notify } from 'quasar'
import { Cart } from 'src/models/Cart.js'
import { APIGateway } from 'src/api/APIGateway.js'
import CookieCart from 'src/assets/js/CookieCart.js'

export function addToCart(context, newProductData) {
  const isUserLogin = !!this.getters['Auth/isUserLogin']
  return new Promise((resolve, reject) => {
    const payload = {
      product_id: newProductData.product_id, // Number or String
      products: newProductData.products ? newProductData.products : [], // Array (List ofProduct's ID)
      attribute: newProductData.attribute ? newProductData.attribute : [] // Array
    }
    if (isUserLogin) {
      APIGateway.cart.addToCart(payload)
        .then((response) => {
          Notify.create({
            type: 'positive',
            color: 'positive',
            timeout: 5000,
            position: 'top',
            message: 'محصول به سبد خرید اضافه شد.',
            icon: 'report_problem',
            actions: [{
              label: 'سبد خرید',
              icon: 'isax:shopping-cart',
              color: 'white',
              class: 'bg-green-3',
              handler: () => {
                this.$router.push({ name: 'Public.Checkout.Review' })
              }
            }]
          })
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      const cart = context.getters.cart
      cart.addToCart(payload)
      context.commit('updateCart', cart)
      Notify.create({
        type: 'positive',
        color: 'positive',
        timeout: 5000,
        position: 'top',
        message: 'محصول به سبد خرید اضافه شد.',
        icon: 'report_problem',
        actions: [{
          label: 'سبد خرید',
          icon: 'isax:shopping-cart',
          color: 'white',
          class: 'bg-green-3',
          handler: () => {
            this.$router.push({ name: 'Public.Checkout.Review' })
          }
        }]
      })
      resolve(true)
    }
  })
}

export function reviewCart(context) {
  const isUserLogin = this.getters['Auth/isUserLogin']
  const currentCart = this.getters['Cart/cart']
  const cartItems = []
  currentCart.items.list.forEach(currentCartItem => {
    const cartItemObject = { products: [] }
    if (currentCartItem.grand.id) {
      cartItemObject.product_id = currentCartItem.grand.id
      currentCartItem.order_product.list.forEach(orderProduct => {
        cartItemObject.products.push(orderProduct.product.id)
      })
    } else {
      currentCartItem.order_product.list.forEach(orderProduct => {
        cartItemObject.product_id = orderProduct.product.id
      })
    }
    cartItems.push(cartItemObject)
  })

  return new Promise((resolve, reject) => {
    APIGateway.cart.reviewCart(cartItems)
      .then((response) => {
        if (isUserLogin) {
          context.commit('updateCart', new Cart(response))
        }
        return resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
  // return new Promise((resolve, reject) => {
  //   axios
  //     .get(API_ADDRESS.cart.review, {
  //       params: {
  //         seller: 1,
  //         cartItems
  //       },
  //       paramsSerializer: {
  //         encode: parse,
  //         serialize: params => {
  //           const q = new URLSearchParams()
  //           q.set('seller', params.seller)
  //           for (let item = 0; item < params.cartItems.length; item++) {
  //             q.set(`cartItems[${item}][product_id]`, params.cartItems[item].product_id)
  //             for (let product = 0; product < params.cartItems[item].products.length; product++) {
  //               q.set(`cartItems[${item}][products][${product}]`, params.cartItems[item].products[product].id)
  //             }
  //           }
  //           return q
  //         }
  //       }
  //     })
  //     .then((response) => {
  //       if (isUserLogin) {
  //         context.commit('updateCart', new Cart())
  //       }
  //       return resolve(response)
  //     })
  //     .catch((error) => {
  //       reject(error)
  //     })
  // })
}

export function paymentCheckout(context) {
  return new Promise((resolve, reject) => {
    APIGateway.cart.getPaymentRedirectEncryptedLink()
      .then(encryptedPaymentRedirectLink => {
        return resolve(encryptedPaymentRedirectLink)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function removeItemFromCart(context, orderProductId) {
  const removeProductFromStore = function (productId) {
    const cart = context.getters.cart
    cart.removeProduct(productId)
    context.commit('updateCart', cart)
  }
  const removeOrderProductFromCart = function (orderProductId) {
    const cart = context.getters.cart
    cart.items.removeOrderProduct(orderProductId)
    context.commit('updateCart', cart)
  }
  return new Promise((resolve, reject) => {
    const isUserLogin = this.getters['Auth/isUserLogin']
    if (isUserLogin) {
      APIGateway.cart.removeFromCart(orderProductId)
        .then((response) => {
          removeOrderProductFromCart(orderProductId)
          Notify.create({
            type: 'positive',
            color: 'positive',
            timeout: 5000,
            position: 'top',
            message: 'محصول از سبد خرید حذف شد.',
            icon: 'report_problem'
          })
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      const productId = orderProductId
      removeProductFromStore(productId)
      resolve()
    }
  })
}

export function deleteList(context) {
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
