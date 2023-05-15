import { Notify } from 'quasar'
import { axios } from 'src/boot/axios'
import { Cart } from 'src/models/Cart.js'
import API_ADDRESS from 'src/api/Addresses'
import CookieCart from 'src/assets/js/CookieCart.js'

const addToCartMerge = function (data = {}) {
  const payload = {
    product_id: data.product_id, // Number or String
    products: data.products, // Number or String (List ofProduct's ID)
    attribute: data.attribute, // Number or String
    seller: 2
  }
  if (!payload.products || (Array.isArray(payload.products) && payload.products.length === 0)) {
    delete payload.products
  }
  if (!payload.attribute || (Array.isArray(payload.attribute) && payload.attribute.length === 0)) {
    delete payload.attribute
  }

  return payload
}

const reviewCartMerge = function (cartItems = []) {
  const queryParams = {}
  queryParams.seller = 2
  cartItems.forEach((cartItem, cartItemIndex) => {
    queryParams['cartItems' + '[' + cartItemIndex + ']' + '[product_id]'] = cartItem.product_id
    if (Array.isArray(cartItem.products)) {
      cartItem.products.forEach((productItem, productItemIndex) => {
        queryParams['cartItems' + '[' + cartItemIndex + ']' + '[products]' + '[' + productItemIndex + ']'] = productItem
      })
    }
  })

  if (Object.keys(queryParams).length === 0) {
    return ''
  }

  let paramsString = ''
  Object.keys(queryParams).forEach(key => {
    paramsString += '&' + key + '=' + queryParams[key]
  })

  return paramsString.substr(1)
}

export function addToCart(context, newProductData) {
  const isUserLogin = !!this.getters['Auth/isUserLogin']
  return new Promise((resolve, reject) => {
    const payload = {
      product_id: newProductData.product_id, // Number or String
      products: newProductData.products ? newProductData.products : [], // Array (List ofProduct's ID)
      attribute: newProductData.attribute ? newProductData.attribute : [] // Array
    }
    if (isUserLogin) {
      axios
        .post(API_ADDRESS.cart.orderproduct.add,
          addToCartMerge(payload)
          // { product_id: data[0].product.id, products: data[0].products, attribute: data[0].attribute, seller: 2 }
        )

      // APIGateway.cart.addToCart(payload)
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
                this.$router.push({ name: 'cart' })
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
            this.$router.push({ name: 'cart' })
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
    const paramsString = reviewCartMerge(cartItems)
    // APIGateway.cart.reviewCart(cartItems)

    axios
      .get(API_ADDRESS.cart.review + '?' + paramsString
      //   {
      //   // params: {
      //   //   seller: 2,
      //   //   cartItems: orders
      //   // },
      //   // paramsSerializer: {
      //   //   encode: parse,
      //   //   serialize: params => {
      //   //     const q = new URLSearchParams()
      //   //     q.set('seller', params.seller)
      //   //     for (let item = 0; item < params.cartItems.length; item++) {
      //   //       q.set(`cartItems[${item}][product_id]`, params.cartItems[item].product_id)
      //   //       for (let product = 0; product < params.cartItems[item].products.length; product++) {
      //   //         q.set(`cartItems[${item}][products][${product}]`, params.cartItems[item].products[product].id)
      //   //       }
      //   //     }
      //   //     return q
      //   //   }
      //   // }
      // }
      )
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
    axios
      .get(API_ADDRESS.cart.getPaymentRedirectEncryptedLink)
    // APIGateway.cart.getPaymentRedirectEncryptedLink()
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
      // APIGateway.cart.removeFromCart(orderProductId)
      axios
        .delete(API_ADDRESS.cart.orderproduct.delete(orderProductId))
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
