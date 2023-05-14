import { appApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class EntityCrudAPI extends APIRepository {
  constructor() {
    super('question-authors', appApiInstance)
    this.APIAdresses = {
      authorshipDates: {
        show: '/option/',
        edit: '/option',
        create: '/option',
        index: '/option'
      },
      questionAuthors: {
        show: '/option/',
        edit: '/option',
        create: '/option',
        index: '/option'
      },
      questionReport: {
        show: '/option/',
        edit: '/option',
        create: '/option',
        index: '/option'
      },
      questionTarget: {
        show: '/option/',
        edit: '/option',
        create: '/option',
        index: '/option'
      },
      majors: {
        show: '/option/',
        edit: '/option',
        create: '/option',
        index: '/option'
      }
    }
  }
}
