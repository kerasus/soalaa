import Price from './Price.js'
import { Product } from './Product.js'
import { Model, Collection } from 'js-abstract-model'

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
      { key: 'extra_attributes' },
      { key: 'photo' },
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
    return this.getProductIndex(productId) !== -1
  }

  getProductIndex (productId) {
    return this.list.findIndex(order => order.product.id === productId)
  }

  getOrderProductIndex (orderProductId) {
    return this.list.findIndex(order => order.id === orderProductId)
  }

  removeProduct (productId) {
    const index = this.getProductIndex(productId)
    if (index !== -1) {
      this.list.splice(index, 1)
    }
  }

  removeOrderProduct (orderProductId) {
    const index = this.getOrderProductIndex(orderProductId)
    if (index !== -1) {
      this.list.splice(index, 1)
    }
  }
}

export { OrderProduct, OrderProductList }
