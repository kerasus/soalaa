import { Model, Collection } from 'js-abstract-model'
import { Product } from './Product'
import { OrderProduct, OrderProductList } from 'src/models/OrderProduct'

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

  isSelectableProduct () {
    return !!this.grand
  }

  hasProduct (productId) {
    const isGrand = this.grand.id === productId
    const findInOrderProduct = !!this.order_product.hasProduct(productId)

    return isGrand || findInOrderProduct
  }

  addOrderProducts (products) {
    products.forEach(product => {
      if (!this.hasProduct(product.id)) {
        this.order_product.add([new OrderProduct({ product })])
      }
    })
  }
}

class CartItemList extends Collection {
  model () {
    return CartItem
  }

  getCartItemByGrand (grandId) {
    return this.list.find(cartItem => cartItem.grand.id === grandId)
  }

  hasProduct (productId) {
    return !!this.list.find(cartItem => cartItem.hasProduct(productId))
  }
}

export { CartItem, CartItemList }
