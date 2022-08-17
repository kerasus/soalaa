import { Cookies } from 'quasar'
import { Cart } from 'src/models/Cart'

export default class CookieCart {
  static setCartInCookie (cart) {
    Cookies.set('cartItems', JSON.stringify(cart), {
      expires: '365d'
    })
  }

  static getCookieCart () {
    return Cookies.get('cartItems')
  }

  static addToCartInCookie (cart) {
    const cookieCart = cart.cartItems.list.map(item => {
      return {
        product_id: item.product.id,
        attribute: [],
        extraAttribute: [],
        products: []
      }
    })

    if (!this.isCartItemsSetInCookies()) {
      this.setCartInCookie(cookieCart)
      return
    }

    const existCookieCart = this.setNewProductInCookie(cookieCart)

    this.setCartInCookie(existCookieCart)
  }

  static setNewProductInCookie (cookieCart) {
    const existCookieCart = this.getCookieCart()

    cookieCart.forEach(product => {
      const cartItem = existCookieCart.find(item => item.product_id === product.product_id)
      if (!cartItem) {
        existCookieCart.push(product)
      }
    })

    return existCookieCart
  }

  static isCartItemsSetInCookies () {
    return Cookies.has('cartItems')
  }

  static removeCartItemFromCookieCart (productId) {
    const existCookieCart = this.getCookieCart()
    let newCookieCart = []

    if (existCookieCart) {
      newCookieCart = existCookieCart.filter(product => product.product_id !== productId)
    }

    this.setCartInCookie(newCookieCart)
  }

  static deleteCartItemListFromCookie () {
    this.deleteCartFromCookies()
    this.addToCartInCookie(new Cart())
  }

  static deleteCartFromCookies () {
    Cookies.remove('cartItems')
  }
}
