import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { ContentTimePoint } from 'src/models/ContentTimePoint.js'

const APIAdresses = {
  favored: (id) => '/c/timepoint/' + id + '/favored',
  unfavored: (id) => '/c/timepoint/' + id + '/unfavored'
}
export default class ContentTimepointAPI extends APIRepository {
  constructor() {
    super('ContentTimepoint', apiV2, '/c/', new ContentTimePoint(), APIAdresses)
    this.CacheList = {
      favored: id => this.name + this.APIAdresses.favored(id),
      unfavored: id => this.name + this.APIAdresses.unfavored(id)
    }
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
