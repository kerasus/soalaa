import { Model, Collection } from 'js-abstract-model'

class Banner extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'body' },
      { key: 'photo' },
      {
        key: 'features',
        default: {
          xl: {
            src: '',
            width: '',
            height: ''
          },
          lg: {
            src: '',
            width: '',
            height: ''
          },
          md: {
            src: '',
            width: '',
            height: ''
          },
          sm: {
            src: '',
            width: '',
            height: ''
          },
          xs: {
            src: '',
            width: '',
            height: ''
          }
        }
      },
      { key: 'link' },
      { key: 'order' },
      { key: 'ratio' }
    ])
  }
}
class BannerList extends Collection {
  model () {
    return Banner
  }
}
export { Banner, BannerList }
