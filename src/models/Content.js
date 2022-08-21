import { Model, Collection } from 'js-abstract-model'
import { SetList } from './Set'
import Url from './Url'
import { ContentTimePointList } from './ContentTimePoint'
import ContentSection from './ContentSection'

class Content extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'url_key',
        value: function () {
          return 'content'
        }
      },
      { key: 'id' },
      { key: 'content_id' },
      { key: 'apiUrl' },
      { key: 'author' },
      { key: 'content_type' },
      { key: 'contenttype_id' },
      { key: 'context' },
      {
        key: 'comments',
        default: []
      },
      { key: 'description' },
      { key: 'lesson_name' },
      { key: 'lesson' },
      { key: 'can_see' },
      { key: 'color' },
      { key: 'start' },
      { key: 'end' },
      { key: 'display' },
      { key: 'duration' },
      { key: 'file' },
      { key: 'isFree' },
      { key: 'is_favored' },
      { key: 'title' },
      { key: 'short_title' },
      { key: 'type' }, // 1=> pamphlet, 8=> video
      { key: 'photo' },
      { key: 'nextApiUrl' },
      { key: 'nextUrl' },
      { key: 'order' },
      { key: 'page_view' },
      { key: 'previousApiUrl' },
      { key: 'previousUrl' },
      { key: 'redirectUrl' },
      { key: 'section_id' },
      { key: 'is_current' },
      { key: 'has_watched' },
      { key: 'set' },
      { key: 'major' },
      {
        key: 'timepoints',
        relatedModel: ContentTimePointList
      },
      {
        key: 'section',
        relatedModel: ContentSection
      },
      // {
      //     key: 'set',
      //     relatedModel: Set,
      // },
      { key: 'tags' },
      { key: 'thumbnail' },
      { key: 'tmp_description' },
      {
        key: 'url',
        relatedModel: Url
      },
      { key: 'favor_url' },
      { key: 'unfavor_url' },
      { key: 'created_at' },
      { key: 'updated_at' }
    ])

    // ToDo: must remove
    if (this.file && this.file.video) {
      this.file.video.forEach((item, key) => {
        this.file.video[key].link = this.file.video[key].link.replace('download=1', '')
      })
    }
  }

  set () {
    return new SetList(this.inputData.set)
  }

  createFavorUrl (baseUrl, favored) {
    return baseUrl + '/c/' + this.id + '/' + ((favored) ? 'favored' : 'unfavored')
  }

  setFavor (url) {
    if (typeof url === 'undefined') {
      url = this.favor_url
    }
    if (url === null) {
      console.error('url is null.')
    }
    return this.crud.create(url)
  }

  setUnfavor (url) {
    if (typeof url === 'undefined') {
      url = this.unfavor_url
    }
    if (url === null) {
      console.error('url is null.')
    }
    return this.crud.create(url)
  }
}

class ContentList extends Collection {
  model () {
    return Content
  }

  getType (type) {
    return this.list.filter(item => parseInt(item.type) === parseInt(type))
  }

  sortByOrder (sort) {
    this.list.sort(function (a, b) {
      if (isNaN(a.order) || a.order === null || isNaN(b.order) || b.order === null) {
        return 1
      }
      if (sort === 'asc') {
        return a.order - b.order
      } else if (sort === 'des') {
        return b.order - a.order
      }

      return 0
    })
  }

  videos (sort) {
    if (typeof sort !== 'undefined') {
      this.sortByOrder(sort)
    }
    return this.getType(8)
  }

  pamphlets (sort) {
    if (typeof sort !== 'undefined') {
      // this.sortByOrder(sort);
    }
    return this.getType(1)
  }

  getSections () {
    return this.list.filter((value, index, self) => self.findIndex((element) => element.section.id === value.section.id) === index).map((item) => item.section)
  }
}

export { Content, ContentList }
