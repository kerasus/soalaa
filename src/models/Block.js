import { Model, Collection } from 'js-abstract-model'
import { SetList } from 'src/models/Set'
import { ProductList } from 'src/models/Product'
import { ContentList } from 'src/models/Content'
import { BannerList } from 'src/models/Banner'

class Block extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'offer' },
      {
        key: 'url'
      },
      { key: 'order' },
      {
        key: 'contents',
        relatedModel: ContentList
      },
      {
        key: 'sets',
        relatedModel: SetList
      },
      {
        key: 'products',
        relatedModel: ProductList
      },
      {
        key: 'banners',
        relatedModel: BannerList
      },
      { key: 'updated_at' }
    ])
  }
}
class BlockList extends Collection {
  model () {
    return Block
  }
}
export { Block, BlockList }
