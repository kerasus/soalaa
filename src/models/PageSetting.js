import { Collection, Model } from 'js-abstract-model'

class PageSetting extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'key' },
      {
        key: 'value',
        default: {
          sections: [],
          layoutConfig: {},
          seo: {}
        }
      }
    ])

    if (typeof this.value === 'string') {
      this.value = JSON.parse(this.value)
    }
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
