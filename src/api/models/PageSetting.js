import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { PageSetting, PageSettingList } from 'src/models/PageSetting.js'

export default class PageSettingAPI extends APIRepository {
  constructor() {
    super('page-setting', appApiInstance)
    this.APIAdresses = {
      base: '/setting',
      show: (key) => '/setting/show?key=' + key
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      show: (key) => this.name + this.APIAdresses.show(encodeURI(key))
    }
  }

  index (data, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        return {
          referralCodeList: new PageSettingList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: '...',
          //   per_page: 15,
          //   to: 10,
          //   total: 10
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  create (data) {
    data.value = JSON.stringify(data.value)
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        key: '', // String
        value: '' // String
      }, data.data),
      resolveCallback: (response) => {
        const parsedData = JSON.parse(response.data.data.value)
        return {
          key: parsedData.key,
          value: parsedData.value
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  update (data) {
    data.value = JSON.stringify(data.value)
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        key: '', // String
        value: '' // String
      }, data.data),
      resolveCallback: (response) => {
        const parsedData = JSON.parse(response.data.data.value)
        return {
          key: parsedData.key,
          value: parsedData.value
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  get (key, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.show(key),
      cacheKey: this.CacheList.show(key),
      ...(cache !== undefined && { cache }),
      resolveCallback: (response) => {
        // console.log('response.data', response.data)
        // const parsedData = JSON.parse(response.data.data.value)
        // return {
        //   key: parsedData.key,
        //   value: parsedData.value
        // }
        return new PageSetting(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
