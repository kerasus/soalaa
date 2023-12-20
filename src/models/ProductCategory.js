import { Model, Collection } from 'js-abstract-model'

class ProductCategory extends Model {
  constructor(data) {
    super(data, [
      { key: 'name' },
      { key: 'value' },
      {
        key: 'selected',
        default: false
      }
    ])
  }
}

class ProductCategoryList extends Collection {
  model() {
    return ProductCategory
  }
}

export { ProductCategory, ProductCategoryList }
