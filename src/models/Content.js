import Url from 'src/models/Url.js'
import { SetList } from 'src/models/Set.js'
import { Model, Collection } from 'js-abstract-model'
import ContentSection from 'src/models/ContentSection.js'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import { ContentTimePointList } from 'src/models/ContentTimePoint.js'

class Content extends Model {
  constructor(data) {
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
      { key: 'author_id' },
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
      { key: 'can_user_use_timepoint' },
      { key: 'color' },
      { key: 'start' },
      { key: 'end' },
      { key: 'display' },
      { key: 'duration' },
      { key: 'hls' },
      {
        key: 'file',
        default: {
          pamphlet: [],
          video: []
        }
      },
      {
        key: 'stream',
        default: {
          video: []
        }
      },
      { key: 'is_free' },
      { key: 'is_favored' },
      { key: 'title' },
      { key: 'body' },
      { key: 'short_title' },
      { key: 'type' }, // 1=> pamphlet, 8=> video
      { key: 'photo' },
      { key: 'forrest_tags' },
      { key: 'forrest_trees' },
      { key: 'forrest_tree_tags' },
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

    if (!this.section.id) {
      this.section = new ContentSection()
    }

    // // ToDo: must remove
    // if (!this.hls) {
    //   this.hls = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
    // }
  }

  getHlsSource() {
    return this.hls
  }

  getOrginalMp4Source() {
    if (!this.stream?.video || this.stream.video.length === 0) {
      return null
    }

    const target = this.stream.video.find(video => video.ext === 'mp4')

    if (!target) {
      return null
    }

    return target
  }

  getWebmSource() {
    if (!this.stream?.video || this.stream.video.length === 0) {
      return null
    }

    const target = this.stream.video.find(video => video.ext === 'webm')

    if (!target) {
      return null
    }

    return target
  }

  getOldVideoSource() {
    if (!this.file?.video || this.file.video.length === 0) {
      return null
    }
    return new PlayerSourceList(this.file.video.map(item => {
      item.src = item.link
      item.type = 'video/mp4' // item.ext
      item.label = item.caption
      item.res = (item.label === 'کیفیت عالی') ? 720 : (item.label === 'کیفیت بالا') ? 480 : 240
      return item
    }))

    // return new PlayerSourceList([{
    //   default: true,
    //   res: 1024,
    //   type: 'video/mp4',
    //   src: 'https://nodes.alaatv.com/media/1374/HD_720p/1374002okij.mp4',
    //   label: 'کیفیت عالی'
    // },
    // {
    //   src: 'https://nodes.alaatv.com/media/1374/hq/1374002okij.mp4',
    //   type: 'video/mp4',
    //   res: 720,
    //   label: 'کیفیت بالا'
    // },
    // {
    //   src: 'https://nodes.alaatv.com/media/1374/240p/1374002okij.mp4',
    //   type: 'video/mp4',
    //   res: 360,
    //   label: 'کیفیت متوسط'
    // }])
  }

  hasVideoSource () {
    return !!(this.getVideoSource())
  }

  getVideoSource() {
    const hlsSource = this.getHlsSource()
    const oldVideoSource = this.getOldVideoSource()
    const webmSource = this.getWebmSource()
    const orginalMp4Source = this.getOrginalMp4Source()
    if (hlsSource) {
      return hlsSource
    }
    if (oldVideoSource) {
      return oldVideoSource
    }
    if (webmSource) {
      return webmSource
    }
    if (orginalMp4Source) {
      return orginalMp4Source
    }
  }

  set() {
    return new SetList(this.inputData.set)
  }

  createFavorUrl(baseUrl, favored) {
    return baseUrl + '/c/' + this.id + '/' + ((favored) ? 'favored' : 'unfavored')
  }

  setFavor(url) {
    if (typeof url === 'undefined') {
      url = this.favor_url
    }
    if (url === null) {
      console.error('url is null.')
    }
    return this.crud.create(url)
  }

  setUnfavor(url) {
    if (typeof url === 'undefined') {
      url = this.unfavor_url
    }
    if (url === null) {
      console.error('url is null.')
    }
    return this.crud.create(url)
  }

  isPamphlet() {
    return this.type === 1
  }

  isVideo() {
    return this.type === 8
  }
}

class ContentList extends Collection {
  model() {
    return Content
  }

  getType(type) {
    return this.list.filter(item => parseInt(item.type) === parseInt(type))
  }

  sortByOrder(sort) {
    this.list.sort(function (a, b) {
      if (isNaN(a.order) || a.order === null || isNaN(b.order) || b.order === null) {
        return 1
      }
      if (sort === 'asc') {
        return a.order - b.order
      } else if (sort === 'des') {
        return b.order - a.order
      }

      return false
    })
  }

  videos(sort) {
    if (typeof sort !== 'undefined') {
      this.sortByOrder(sort)
    }
    return this.getType(8)
  }

  pamphlets(sort) {
    if (typeof sort !== 'undefined') {
      // this.sortByOrder(sort);
    }
    return this.getType(1)
  }

  getSections() {
    return this.list.filter((value, index, self) => self.findIndex((element) => element.section.id === value.section.id) === index).map((item) => item.section)
  }
}

export { Content, ContentList }
