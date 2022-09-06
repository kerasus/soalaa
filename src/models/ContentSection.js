import { Model } from 'js-abstract-model'

class ContentSection extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      { key: 'title' }
    ])
    if (this.name) {
      this.title = this.name
    } else if (this.title) {
      this.name = this.title
    }
  }
}

export default ContentSection
