import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class EntityCrudAPI extends APIRepository {
  constructor() {
    super('question-authors', appApiInstance)
    this.APIAdresses = {
      base: '/option/',
      levels: '/question/levels',
      statuses: '/question/statuses',
      reportStatuses: '/question/report/statuses'
    }
  }

  getFilterOptions() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      resolveCallback: (response) => {
        return response.data.data
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
        return response.data.data
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
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
