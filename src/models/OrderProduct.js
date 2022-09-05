import { Model, Collection } from 'js-abstract-model'
import { Product } from './Product'
import Price from './Price'

class OrderProduct extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'order_id' },
      { key: 'orderproducttype' },
      { key: 'purchased_coupon_code' },
      { key: 'purchased_coupons' },
      { key: 'attributevalues' },
      { key: 'include_in_coupon' },
      { key: 'type' },
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

class OrderProductList extends Collection {
  model () {
    return OrderProduct
  }

  hasProduct (productId) {
    return !!this.list.find(order => order.product.id === productId)
  }
}

export { OrderProduct, OrderProductList }
