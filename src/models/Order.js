import { Model, Collection } from 'js-abstract-model'
import { User } from './User'
import { Coupon } from './Coupon'
import { OrderProductList } from 'src/models/OrderProduct'

class Order extends Model {
  constructor(data) {
    super(data, [
      { key: 'id' },
      { key: 'discount' },
      { key: 'customer_description' },
      { key: 'price' },
      { key: 'paid_price' },
      { key: 'refund_price' },
      { key: 'debt' },
      {
        key: 'orderstatus',
        default: {}
      },
      {
        key: 'paymentstatus',
        default: {}
      },
      {
        key: 'orderproducts',
        default: OrderProductList
      },
      {
        key: 'coupon_info',
        relatedModel: Coupon
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

  isEmpty() {
    return !this.orderproducts.list.length
  }
}

class OrderList extends Collection {
  model() {
    return Order
  }
}

export { Order, OrderList }
