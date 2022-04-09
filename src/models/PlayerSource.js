import { Model, Collection } from 'js-abstract-model'

class PlayerSource extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'src',
        default: ''
      },
      {
        key: 'type',
        default: 'video/mp4'
      },
      {
        key: 'label',
        default: ''
      }
    ])
  }
}

class PlayerSourceList extends Collection {
  model () {
    return PlayerSource
  }
}

export { PlayerSource, PlayerSourceList }
