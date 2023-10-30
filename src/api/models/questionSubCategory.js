import { QuestSubcategory, QuestSubcategoryList } from 'src/models/QuestSubcategory.js'
import APIRepository from '../classes/APIRepository.js'
import { appApiInstance } from 'src/boot/axios.js'

const APIAdresses = {
  base: '/sub-category',
  update(id) {
    return '/sub-category/' + id
  },
  updateOrder: '/exam-question/update/order/sub-category'
}

export default class QuestionSubCategoryAPI extends APIRepository {
  constructor() {
    super('QuestionSubCategory', appApiInstance, '/sub-category', new QuestSubcategory(), APIAdresses)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      update: (id) => this.name + this.APIAdresses.update(id)
    }
  }

  get(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new QuestSubcategoryList(response.data.data)
      },
      rejectCallback: () => {
        return new QuestSubcategoryList()
      }
    })
  }

  create(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      resolveCallback: (response) => {
        return new QuestSubcategory(response.data.data)
      },
      rejectCallback: () => {
        return new QuestSubcategory()
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
        return new QuestSubcategory(response.data.data)
      },
      rejectCallback: () => {
        return new QuestSubcategory()
      },
      data
    })
  }

  updateOrder(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.updateOrder,
      resolveCallback: (response) => {
        return response.data // String
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }
}
