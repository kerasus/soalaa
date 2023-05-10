import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { Set } from 'src/models/Set'
import { ContentList } from 'src/models/Content'

const urlAddress = {
  base: '/set',
  adminBase: '/admin/set',
  adminShow: (id) => '/admin/set/' + id,
  attachContents: (setId) => '/admin/set/' + setId + '/c/attach',
  favored: (id) => '/set/' + id + '/favored',
  unfavored: (id) => '/set/' + id + '/unfavored',
  create: '/admin/set/',
  show: (id) => '/set/' + id,
  getContents: (id) => '/set/' + id + '/contents'
}
export default class SetAPI extends APIRepository {
  constructor() {
    super('set', apiV2, '/set', new Set(), urlAddress)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      show: (id) => this.name + this.APIAdresses.show(id),
      getContents: (id) => this.name + this.APIAdresses.getContents(id),
      attachContents: (setId) => this.name + this.APIAdresses.attachContents(setId)
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => {
        return new Set(response.data.data)
      }
    })
  }

  show(setId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.show(setId),
      cacheKey: this.CacheList.show(setId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Set(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getContents(setId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getContents(setId),
      cacheKey: this.CacheList.getContents(setId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ContentList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  attachContents(setId, data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.attachContents(setId),
      cacheKey: this.CacheList.attachContents(setId),
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  favored(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.favored(data),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  unfavored(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.unfavored(data),
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
