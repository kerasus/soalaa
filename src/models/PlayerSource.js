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
      },
      {
        key: 'caption',
        default: ''
      },
      {
        key: 'link',
        default: ''
      },
      {
        key: 'res',
        default: ''
      },
      {
        key: 'selected',
        default: false
      }
    ])
    this.label = this.res
    this.src = this.link
  }
}

class PlayerSourceList extends Collection {
  model () {
    return PlayerSource
  }
}

export { PlayerSource, PlayerSourceList }
