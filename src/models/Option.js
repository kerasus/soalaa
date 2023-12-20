import { Model, Collection } from 'js-abstract-model'

class Option extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'value' },
      { key: 'image' },
      { key: 'order' },
      { key: 'type' },
      { key: 'updated_at' },
      { key: 'created_at' }
    ])
  }
}

class OptionList extends Collection {
  model () {
    return Option
  }
}

export { Option, OptionList }
