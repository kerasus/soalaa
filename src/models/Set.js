import { Model, Collection } from 'js-abstract-model'
import Url from './Url'
import { ContentList } from './Content'
import { SetSectionList } from './SetSection'

class Set extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'url_key',
        value: function () {
          return 'set'
        }
      },
      { key: 'id' },
      { key: 'active_contents_count' },
      { key: 'author' },
      { key: 'apiUrl' },
      { key: 'contentUrl' },
      {
        key: 'contents',
        relatedModel: ContentList
      },
      { key: 'pamphlets_count' },
      { key: 'videos_count' },
      { key: 'contents_count' },
      { key: 'description' },
      { key: 'photo' },
      { key: 'redirect_url' },
      { key: 'setUrl' },
      { key: 'title' },
      { key: 'short_title' },
      {
        key: 'url',
        relatedModel: Url
      },
      { key: 'tags' },
      {
        key: 'is_favored',
        default: false
      },
      { key: 'created_at' },
      { key: 'updated_at' },
      {
        key: 'sections',
        relatedModel: SetSectionList
      },
      { key: 'major' },
      { key: 'product_id' }
    ])
  }

  loadContents () {
    const that = this
    return new Promise((resolve, reject) => {
      that.crud.read(that.url.web, { withContents: true })
        .then(function (response) {
          that.contents = new ContentList(response.data.set.contents)

          for (let i = 0; typeof response.data.files.pamphlets[i] !== 'undefined'; i++) {
            const content = that.contents.getItem('id', response.data.files.pamphlets[i].id)
            content.file = response.data.files.pamphlets[i].file
          }
          for (let i = 0; typeof response.data.files.videos[i] !== 'undefined'; i++) {
            const content = that.contents.getItem('id', response.data.files.videos[i].id)
            content.file = response.data.files.videos[i].file
          }

          resolve(response)
          // that.contents.list.splice(that.contents.list.length);

          // let contentList = new ContentList(response.data.data.contents);
          // getItem(key, val)
          // that.selectedSet.loading = false;
          // that.$set(that.selectedSet, 'contents', new ContentList(response.data.data.contents));
          // that.$set(that.selectedSet.contents, 'list', contentList.list);
          // console.log('selectedSet.contents.list2', that.selectedSet.contents.list);
          //
        })
        .catch(function (error) {
          reject(error)
          // Assist.handleErrorMessage(error);
          // that.selectedSet.loading = false;
        })
    })
  }

  // contents() {
  //     return new ContentList(this.inputData.contents);
  // }

  createFavorUrl (baseUrl, favored) {
    return baseUrl + '/set/' + this.id + '/' + ((favored) ? 'favored' : 'unfavored')
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

class SetList extends Collection {
  model () {
    return Set
  }
}

export { Set, SetList }
