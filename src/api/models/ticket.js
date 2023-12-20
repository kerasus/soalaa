import APIRepository from '../classes/APIRepository'
import { alaaApiInstance } from 'src/boot/axios'
import { User } from 'src/models/User'

export default class TicketAPI extends APIRepository {
  constructor() {
    super('ticket', alaaApiInstance, '/ticket')
    this.APIAdresses = {
      index: '/ticket',
      show: '/ticket',
      create: '/ticket',
      updateTicketApi: (ticketId) => '/ticket/' + ticketId,
      getInfo: '/user/getInfo',
      ticketMessage: '/ticketMessage',
      reportMessage: (ticketId) => '/ticketMessage/' + ticketId + '/report',
      ticketRate: (ticketId) => '/ticket/' + ticketId + '/rate',
      statusNotice: (ticketId) => '/ticket/' + ticketId + '/sendTicketStatusNotice',
      editAssign: (ticketId) => '/ticket/' + ticketId + '/assign',
      batchExtend: '/orderproduct/batchExtend'
    }
    this.restUrl = (id) => this.url + '/' + id
  }

  creatTicket(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.index,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  getTicketData() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.index,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  updateTicket(data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.updateTicketApi(data.ticketId),
      data: data.data,
      resolveCallback: (response) => {
        return {
          code: response // String
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getUserData(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.getInfo,
      resolveCallback: (response) => {
        return new User(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  sendTicketMessage(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.ticketMessage,
      resolveCallback: (response) => {
        return response.data.data.ticketMessage // String
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  ticketMessageReport(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.reportMessage(data.ticketId),
      resolveCallback: (response) => {
        return response.data.message
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  ticketRate(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.ticketRate(data.ticketId),
      resolveCallback: (response) => {
        return response.data.message
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  batchExtend(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.batchExtend,
      resolveCallback: (response) => {
        return response.data // String
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  sendTicketStatusNotice(ticketId, data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.statusNotice(ticketId),
      resolveCallback: (response) => {
        return response.data.message // String
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  editTicketAssignedSupporters(id, data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.editAssign(id),
      resolveCallback: (response) => {
        return new User(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }
}
