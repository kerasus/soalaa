import { Model, Collection } from 'js-abstract-model'
import Price from './Price'
import { Product } from 'src/models/Product'
import { Coupon } from './Coupon'
import { CartItem, CartItemList } from './CartItem'
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
    const isSelectableProduct = data.products && data.products.length > 0

    if (isSelectableProduct) {
      const grand = data.product
      const cartItemThatHasGrand = this.items.getCartItemByGrand(grand.id)
      cartItemThatHasGrand.addOrderProducts(data.products.map(product => new Product({ id: product })))
    } else {
      const product = new Product({ id: data.product_id })
      if (this.items.hasProduct(product.id)) {
        return
      }
      this.items.add(new CartItem({
        grand: product
      }))
    }

    // this.changeCartItems()
  }

  removeProduct (productId) {
    this.items.removeProduct(productId)
  }

  removeItem (cartItemId) {
    this.items.list = this.items.list.filter(item => item.grand.id !== cartItemId)
    // this.changeCartItems()
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
