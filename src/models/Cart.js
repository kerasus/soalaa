import { Model, Collection } from 'js-abstract-model'
import Price from './Price'
import { Product } from 'src/models/Product'
import { Coupon } from './Coupon'
import { CartItemList } from './CartItem'
class Cart extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'couponInfo',
        relatedModel: Coupon
      },
      {
        key: 'items',
        relatedModel: CartItemList
      },
      {
        key: 'price',
        relatedModel: Price
      },
      { key: 'pay_by_wallet' },
      { key: 'coupon' },
      {
        key: 'order_has_donate',
        default: false
      },
      { key: 'count' },
      { key: 'redirect_to_gateway' }
    ])
  }

  isExistInCart (productId) {
    return this.items.hasProduct(productId)
  }

  addToCart (data) {
    const isSelectableProduct = !!data.products

    if (isSelectableProduct) {
      const grand = data.product
      const cartItemThatHasGrand = this.items.getCartItemByGrand(grand.id)
      cartItemThatHasGrand.addOrderProducts(data.products.map(product => new Product({ id: product })))
    } else {
      const product = data.product
      if (this.items.hasProduct(product.id)) {
        return
      }
      this.items.addOrderProducts([new Product(product)])
    }

    this.changeCartItems()
  }

  removeItem (cartId) {
    this.items.list = this.items.list.filter(item => item.grand.id !== cartId)
    this.changeCartItems()
  }

  removeAllItems () {
    this.items.list = []
    this.changeCartItems()
  }

  calculateTotalFinalPrice () {
    let finalPrice = 0
    this.items.list.forEach(item => {
      finalPrice += item.grand.price.final
    })
    this.price.final = finalPrice
  }

  calculateTotalBasePrice () {
    let basePrice = 0
    this.items.list.forEach(item => {
      basePrice += item.grand.price.base
    })
    this.price.base = basePrice
  }

  calculateTotalDiscount () {
    let totalDiscount = 0
    this.items.list.forEach(item => {
      totalDiscount += item.grand.price.discount
    })
    this.price.discount = totalDiscount
  }

  isEmpty () {
    return !this.items.list.length
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
