import { Model, Collection } from 'js-abstract-model'
import Price from '../models/Price'
import { EecProduct } from '../models/EecProduct'
import { SetList } from '../models/Set'

class Product extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'redirect_url' },
      { key: 'type' },
      { key: 'category' },
      {
        key: 'title'
      },
      {
        key: 'teacher_name'
      },
      {
        key: 'teacher_image'
      },
      { key: 'is_free' },
      { key: 'photo' },
      { key: 'attributes' },
      { key: 'description' },
      { key: 'longDescription' },
      { key: 'specialDescription' },
      {
        key: 'sets',
        relatedModel: SetList
      },
      {
        key: 'price',
        relatedModel: Price
      },
      {
        key: 'isFavored',
        default: false
      },
      { key: 'catalog' },
      {
        key: 'eec',
        relatedModel: EecProduct
      },
      {
        key: 'sample_photos',
        default: []
      },
      { key: 'intro' },
      {
        key: 'blocks',
        default: []
      }
    ])
  }
}

class ProductList extends Collection {
  model () {
    return Product
  }
}

export { Product, ProductList }
