import { alaaApiInstance } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class ProfileAPI extends APIRepository {
  constructor() {
    super('profile', alaaApiInstance)
    this.APIAdresses = {
      formData: '/megaroute/getUserFormData'
    }
    this.CacheList = {
      formData: this.APIAdresses.formData
    }
  }

  getFormData() {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.formData,
      cacheKey: this.CacheList.formData,
      resolveCallback: (response) => {
        return {
          genders: response.data.data.genders,
          provinces: response.data.data.provinces,
          cities: response.data.data.cities,
          majors: response.data.data.majors,
          grades: response.data.data.grades
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
