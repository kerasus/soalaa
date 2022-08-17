import { Model } from 'js-abstract-model'

class Url extends Model {
  constructor (data) {
    super(data, [
      { key: 'api' },
      { key: 'web' }
    ])
  }
}

export default Url
