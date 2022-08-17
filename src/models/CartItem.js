import { Model, Collection } from 'js-abstract-model'
import { Product } from './Product'
import Price from './Price'

class CartItem extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'order_id' },
      { key: 'orderproducttype' },
      { key: 'purchased_coupon_code' },
      { key: 'purchased_coupons' },
      { key: 'quantity' },
      {
        key: 'product',
        relatedModel: Product
      },
      {
        key: 'price',
        relatedModel: Price
      },
      {
        key: 'quantity',
        default: 1
      }
    ])
    if (!this.id) {
      this.id = this.product.id
    }
  }
}

class CartItemList extends Collection {
  model () {
    return CartItem
  }
}

export { CartItem, CartItemList }
