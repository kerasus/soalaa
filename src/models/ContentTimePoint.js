import { Model, Collection } from 'js-abstract-model'
class ContentTimePoint extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      {
        key: 'favor_url',
        value: function (itemVal, inputData) {
          return inputData.favorUrl
        }
      },
      {
        key: 'unfavor_url',
        value: function (itemVal, inputData) {
          return inputData.unfavorUrl
        }
      },
      { key: 'isFavored' },
      { key: 'is_favored' },
      { key: 'time' },
      { key: 'title' }
    ])

    if (this.is_favored === null) {
      this.is_favored = this.isFavored
    }
    if (this.isFavored === null) {
      this.isFavored = this.is_favored
    }
  }

  contentUrl (contentUrl) {
    return contentUrl + '?t=' + this.time
  }

  formattedTime () {
    if (!this.time) {
      return '00:00:00'
    }
    return new Date(this.time * 1000).toISOString().substring(11, 19)
  }
}

class ContentTimePointList extends Collection {
  model () {
    return ContentTimePoint
  }

  removeAllTimes () {
    this.list.forEach(timepoint => {
      timepoint.time = 0
    })
  }
}

export { ContentTimePoint, ContentTimePointList }
