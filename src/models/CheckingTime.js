import { Collection, Model } from 'js-abstract-model'
// eslint-disable-next-line import/named
import { createApp } from 'vue'
import Time from '../plugins/time'
if (!window.app) {
// window.app
  window.app = createApp({})
}

class CheckingTime extends Model {
  constructor (data) {
    super(data, [
      { key: 'start' },
      { key: 'end' }
    ])
  }
}

class CheckingTimeList extends Collection {
  model () {
    return CheckingTime
  }

  getLastItem () {
    const listLength = this.list.length
    if (listLength === 0) {
      return false
    }
    return this.list[(listLength - 1)]
  }

  addStart () {
    this.addItem({
      start: Time.now()
    })
  }

  addEnd () {
    const lastItem = this.getLastItem()
    if (!lastItem) {
      return
    }
    // ToDo : app.set sth used instead
    lastItem.end.push(Time.now())
    // window.app.set(lastItem, 'end', Time.now())
  }
}

export { CheckingTime, CheckingTimeList }
