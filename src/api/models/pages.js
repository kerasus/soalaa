import APIRepository from '../classes/APIRepository'
import { appApiInstance } from 'src/boot/axios'
import { BlockList } from 'src/models/Block'

export default class PagesAPI extends APIRepository {
  constructor() {
    super('pages', appApiInstance)
    this.APIAdresses = {
      home: '/home',
      homepage: '/homepage',
      shop: '/shop'
    }
    this.CacheList = {
      home: this.name + this.APIAdresses.home,
      homepage: this.name + this.APIAdresses.homepage,
      shop: this.name + this.APIAdresses.shop
    }
  }

  home(cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.home,
      cacheKey: this.CacheList.home,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new BlockList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getHomepageData(cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.homepage,
      cacheKey: this.CacheList.homepage,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data // Homepage Data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  shop(cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.shop,
      cacheKey: this.CacheList.shop,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new BlockList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
