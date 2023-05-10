import { Collection, Model } from 'js-abstract-model'

class PageSettingValue extends Model {
  constructor (data) {
    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    if (Array.isArray(data)) {
      data = {
        sections: data,
        layoutConfig: [],
        seo: {}
      }
    }
    super(data, [
      {
        key: 'sections',
        default: []
      },
      {
        key: 'layoutConfig',
        default: []
      },
      {
        key: 'seo',
        default: {}
      }
    ])
  }
}

class PageSettingValueList extends Collection {
  model() {
    return PageSettingValue
  }
}

export { PageSettingValue, PageSettingValueList }
