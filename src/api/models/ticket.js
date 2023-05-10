import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { User } from 'src/models/User'

export default class TicketAPI extends APIRepository {
  constructor() {
    super('ticket', apiV2, '/ticket')
    this.APIAdresses = {
      base: '/ticket',
      updateTicketApi: (ticketId) => '/ticket/' + ticketId,
      getInfo: '/user/getInfo',
      ticketMessage: '/ticketMessage',
      statusNotice: (ticketId) => '/ticket/' + ticketId + '/sendTicketStatusNotice',
      editAssign: (ticketId) => '/ticket/' + ticketId + '/assign'
    }
    this.restUrl = (id) => this.url + '/' + id
  }

  creatTicket(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  updateTicket(ticketId, data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.updateTicketApi(ticketId),
      data,
      resolveCallback: (response) => {
        return {
          code: response
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
        return response
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
        return response
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
