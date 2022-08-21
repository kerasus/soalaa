import { Model, Collection } from 'js-abstract-model'
import Price from './Price'
import { Coupon } from './Coupon'
import { CartItem, CartItemList } from './CartItem'

class Cart extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      {
        key: 'couponInfo',
        relatedModel: Coupon
      },
      {
        key: 'cartItems',
        relatedModel: CartItemList
      },
      {
        key: 'price',
        relatedModel: Price
      }
    ])
  }

  addToCart (product) {
    if (this.cartItems.list.find(item => item.product.id === product.id)) {
      // ToDo
      // if (canIncreaseQuantity) {
      //     this.cartItems.list.find(item => item.product.id === product.id).quantity++
      // }
    } else {
      this.cartItems.list.push(new CartItem({ product }))
    }
    this.changeCartItems()
    return this.cartItems.list.find(item => item.product.id === product.id).quantity
  }

  removeItem (cartId) {
    this.cartItems.list = this.cartItems.list.filter(item => item.id !== cartId)
    this.changeCartItems()
  }

  removeAllItems () {
    this.cartItems.list = []
    this.changeCartItems()
  }

  calculateTotalFinalPrice () {
    let finalPrice = 0
    this.cartItems.list.forEach(item => {
      finalPrice += item.product.price.final
    })
    this.price.final = finalPrice
  }

  calculateTotalBasePrice () {
    let basePrice = 0
    this.cartItems.list.forEach(item => {
      basePrice += item.product.price.base
    })
    this.price.base = basePrice
  }

  calculateTotalDiscount () {
    let totalDiscount = 0
    this.cartItems.list.forEach(item => {
      totalDiscount += item.product.price.discount
    })
    this.price.discount = totalDiscount
  }

  isEmpty () {
    return !this.cartItems.list.length
  }

  changeCartItems () {
    this.calculateTotalFinalPrice()
    this.calculateTotalDiscount()
    this.calculateTotalBasePrice()
  }
}

class CartList extends Collection {
  model () {
    return Cart
  }
}
export { Cart, CartList }
