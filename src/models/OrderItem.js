import { Model, Collection } from 'js-abstract-model'
import { Product } from './Product'
// import Price from './Price'
import { OrderProductList } from 'src/models/OrderProduct'

class OrderItem extends Model {
  constructor(data) {
    super(data, [
      // { key: 'id' },
      // {
      //   key: 'quantity',
      //   default: 1
      // },
      // { key: 'type' },
      // {
      //   key: 'product',
      //   relatedModel: Product
      // },
      {
        key: 'order_product',
        relatedModel: OrderProductList
      },
      {
        key: 'grand',
        relatedModel: Product
      }
      // {
      //   key: 'price',
      //   relatedModel: Price
      // },
      // { key: 'photo' },
      // { key: 'extra_attributes' }
    ])
  }
}

class OrderItemCollection extends Collection {
  model () {
    return OrderItem
  }
}

export { OrderItem, OrderItemCollection }
