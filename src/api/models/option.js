import APIRepository from '../classes/APIRepository.js'
import { appApiInstance } from 'src/boot/axios.js'
import { Option, OptionList } from 'src/models/Option.js'
const APIAdresses = {
  base: '/option',
  show: '/option',
  userIndex: '/option/user',
  user(type) { return '/option/user?type=' + type },
  levels: '/question/levels',
  statuses: '/question/statuses',
  reportStatuses: '/question/report/statuses'
}

export default class OptionAPI extends APIRepository {
  constructor() {
    super('Option', appApiInstance, '/option', new Option(), APIAdresses)
    this.CacheList = {
      userIndex: this.name + this.APIAdresses.userIndex
    }
  }

  userIndex(data = {}, cache = { TTL: 100 }) {
    const params = {}
    if (data.type) {
      params.type = data.type
    }
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.userIndex,
      cacheKey: this.CacheList.userIndex,
      data: params,

      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new OptionList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  create(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      resolveCallback: (response) => {
        return new Option(response.data.data)
      },
      rejectCallback: () => {
        return new Option()
      },
      data
    })
  }

  update(data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.update(data.id),
      resolveCallback: (response) => {
        return new Option(response.data.data)
      },
      rejectCallback: () => {
        return new Option()
      },
      data
    })
  }

  getFilterOptions() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      resolveCallback: (response) => {
        return response.data.data // Array of Strings
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getLevels() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.levels,
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getQuestionStatuses() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.statuses,
      resolveCallback: (response) => {
        return response.data.data // Array of Strings
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getQuestionReportStatuses() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.reportStatuses,
      resolveCallback: (response) => {
        return response.data.data // Array of Strings
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getUserOptions(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.user(data),
      resolveCallback: (response) => {
        return response.data.data // Array of Strings
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getOptions(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        type: null // String
      }, data),
      resolveCallback: (response) => {
        return new OptionList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
