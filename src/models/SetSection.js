import { Model, Collection } from 'js-abstract-model'

class SetSection extends Model {
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

class SetSectionList extends Collection {
  model () {
    return SetSection
  }
}

export { SetSection, SetSectionList }
