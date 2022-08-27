import { Model, Collection } from 'js-abstract-model'
import { Product } from './Product'
import { OrderProductList } from 'src/models/OrderProduct'

class CartItem extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'grand',
        relatedModel: Product
      },
      {
        key: 'order_product',
        relatedModel: OrderProductList
      }
    ])
  }
}

class CartItemList extends Collection {
  model () {
    return CartItem
  }
}

export { CartItem, CartItemList }
