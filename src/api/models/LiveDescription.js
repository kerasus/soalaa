import APIRepository from '../classes/APIRepository.js'
import { apiV2 } from 'src/boot/axios'
import { LiveDescription, LiveDescriptionList } from 'src/models/LiveDescription.js'

export default class LiveDescriptionAPI extends APIRepository {
  constructor() {
    super('liveDescription', apiV2, '/liveDescription', new LiveDescription())
    this.APIAdresses = {
      liveDescription: '/livedescription',
      pinedNews: '/livedescription/getPined',
      observedLiveDescription: (id) => '/livedescription/' + id + '/seen'
    }
    this.CacheList = {
      liveDescription: this.name + this.APIAdresses.liveDescription,
      pinedNews: this.name + this.APIAdresses.pinedNews,
      observedLiveDescription: (id) => this.name + this.APIAdresses.observedLiveDescription(id)
    }
  }

  getNewsList(data, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.liveDescription,
      ...(cache && { cache }),
      data,
      resolveCallback: (response) => {
        return {
          data: new LiveDescriptionList(response.data.data),
          meta: response.data.meta
        }
      },
      rejectCallback: (er) => {
        return er
      }
    })
  }

  getPinedNews(cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.pinedNews,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          data: new LiveDescriptionList(response.data.data),
          meta: response.data.meta
        }
      },
      rejectCallback: (er) => {
        return er
      }
    })
  }

  getNewsHasBeenSeen(id, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.observedLiveDescription(id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        // todo : response.data is unknown due to no available responses
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
