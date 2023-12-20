import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'

export default class AttributeAPI extends APIRepository {
  constructor() {
    super('attribute', apiV2, '/admin/user')
    this.APIAddresses = {
      management: '/admin/user',
      value: '/admin/user'
    }
  }
}
