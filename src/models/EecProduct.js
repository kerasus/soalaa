import { Model } from 'js-abstract-model'

class EecProduct extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'price' },
      {
        key: 'brand',
        default: 'آلاء'
      },
      { key: 'category' },
      { key: 'variant' },
      {
        key: 'quantity',
        default: '-'
      },
      { key: 'list' },
      { key: 'position' }
    ])
    this.formatPrice()
  }

  formatPrice () {
    if (this.price) {
      return this.price.toString().concat('.00')
    }
    return '0.00'
  }

  getData () {
    const obj = {
      id: this.id,
      name: this.name,
      price: this.price,
      brand: this.brand,
      category: this.category,
      variant: this.variant,
      quantity: this.quantity,
      list: this.list,
      position: this.position
    }
    return obj
  }
}
export { EecProduct }
