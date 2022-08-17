import { Model, Collection } from 'js-abstract-model'

class Coupon extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'couponCode' },
      { key: 'couponName' },
      { key: 'detail' },
      {
        key: 'numberOfProducts',
        default: 0
      },
      {
        key: 'totalDiscount',
        default: 0
      }
    ])
  }
}

class CouponList extends Collection {
  model () {
    return Coupon
  }
}
export { Coupon, CouponList }
