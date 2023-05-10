import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'
import { Content } from 'src/models/Content'
import { AbrishamMajorList } from 'src/models/AbrishamMajor'

export default class AbrishamAPI extends APIRepository {
  constructor() {
    super('abrisham', apiV2)
    this.APIAdresses = {
      lesson: '/abrisham/lessons',
      majors: '/abrisham/majors',
      karvan: '/abrisham/whereIsKarvan'
    }
    this.restUrl = (id) => this.url + '/' + id
  }

  whereIsKarvan(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.karvan,
      resolveCallback: (response) => {
        return new Content(response.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  getLessons() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.lesson,
      resolveCallback: (response) => {
        return new AbrishamMajorList(response.data.data).list
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  requestToGetMajors() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.majors,
      resolveCallback: (response) => {
        return new AbrishamMajorList(response.data.data).list
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
