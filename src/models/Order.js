import { Model, Collection } from 'js-abstract-model'
import { User } from './User'
import { Coupon } from './Coupon'
// import {OrderProductList} from "src/models/OrderProduct";
import { OrderItemCollection } from './OrderItem'
class Order extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'discount' },
      { key: 'customer_description' },
      { key: 'price' },
      { key: 'paid_price' },
      { key: 'refund_price' },
      { key: 'debt' },
      {
        key: 'coupon_info',
        relatedModel: Coupon
      },
      // {
      //   key: 'order_product',
      //   relatedModel: OrderItemCollection
      // },
      {
        key: 'orderproduct',
        relatedModel: OrderItemCollection
      },
      {
        key: 'orderstatus',
        default: {}
      },
      {
        key: 'paymentstatus',
        default: {}
      },
      { key: 'successful_transactions' },
      { key: 'pending_transactions' },
      { key: 'unpaid_transaction' },
      { key: 'posting_info' },
      {
        key: 'user',
        relatedModel: User
      },
      { key: 'created_at' },
      { key: 'completed_at' }
    ])
  }

  checkInformationCompletionKey (key) {
    return (
      (this[key] !== null && typeof this[key] === 'object' && typeof this[key].id !== 'undefined' && this[key].id !== null) ||
      (this[key] && typeof this[key].id === 'undefined')
    )
  }
}

class OrderList extends Collection {
  model() {
    return Order
  }
}

export { Order, OrderList }
