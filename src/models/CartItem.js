import { Product } from './Product.js'
import { Model, Collection } from 'js-abstract-model'
import { OrderProduct, OrderProductList } from './OrderProduct.js'

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
    const isGrand = this.isGrand(productId)
    const findInOrderProduct = !!this.isInOrderProducts(productId)

    return isGrand || findInOrderProduct
  }

  isGrand (productId) {
    return this.grand.id === productId
  }

  isInOrderProducts (productId) {
    return !!this.order_product.hasProduct(productId)
  }

  removeFromOrderProducts (productId) {
    this.order_product.removeProduct(productId)
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

  removeProduct (productId) {
    this.list.forEach((cartItem, cartItemIndex) => {
      const isGrand = cartItem.isGrand(productId)
      const isInOrderProduct = !!cartItem.isInOrderProducts(productId)
      if (isGrand) {
        this.list.splice(cartItemIndex, 1)
      } else if (isInOrderProduct) {
        cartItem.removeFromOrderProducts(productId)
      }
    })
  }

  removeOrderProduct (orderProductId) {
    this.list.forEach(cartItem => cartItem.order_product.removeOrderProduct(orderProductId))
  }
}

export { CartItem, CartItemList }
