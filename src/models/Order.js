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
      {
        key: 'orderstatus',
        default: {}
      },
      {
        key: 'paymentstatus',
        default: {}
      },
      {
        key: 'orderproduct',
        default: OrderItemCollection
      },

      // {
      //   key: 'order_product',
      //   relatedModel: OrderProductList
      // },
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

    const that = this
    this.apiResource = {
      fields: [
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
        // {
        //   key: 'orderproducts',
        //   default: OrderProductList
        // },
        //
        {
          key: 'order_product',
          // relatedModel: OrderProductList
          value: function () {
            return that.orderproducts.list
          }
        },
        {
          key: 'coupon_info',
          value: function () {
            return that.coupon_info
          }
        },
        { key: 'successful_transactions' },
        { key: 'pending_transactions' },
        { key: 'unpaid_transaction' },
        { key: 'posting_info' },
        {
          key: 'user',
          value: function () {
            return that.user
          }
        },
        { key: 'created_at' },
        { key: 'completed_at' },
        {
          key: 'choices',
          value: function () {
            return that.choices.list
          }
        }
      ]
    }
  }
}

class OrderList extends Collection {
  model() {
    return Order
  }
}

export { Order, OrderList }
