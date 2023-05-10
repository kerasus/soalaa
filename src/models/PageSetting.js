import { Collection, Model } from 'js-abstract-model'
import { PageSettingValue } from 'src/models/PageSettingValue'

class PageSetting extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'key' },
      {
        key: 'value',
        relatedModel: PageSettingValue
      }
    ])
  }

  getStringifyValue () {
    return JSON.stringify(this.value)
  }
}

class PageSettingList extends Collection {
  model() {
    return PageSetting
  }
}

export { PageSetting, PageSettingList }
