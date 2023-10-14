import { QuestCategory, QuestCategoryList } from 'src/models/QuestCategory.js'
import APIRepository from '../classes/APIRepository.js'
import { appApiInstance } from 'src/boot/axios.js'

const APIAdresses = {
  base: '/category',
  update: (id) => '/category/' + id
}

export default class QuestionCategoryAPI extends APIRepository {
  constructor() {
    super('QuestionCategory', appApiInstance, '/category', new QuestCategory(), APIAdresses)
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
        return new QuestCategoryList(response.data.data)
      },
      rejectCallback: () => {
        return new QuestCategoryList()
      }
    })
  }

  create(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      resolveCallback: (response) => {
        return new QuestCategory(response.data.data)
      },
      rejectCallback: () => {
        return new QuestCategory()
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
        return new QuestCategory(response.data.data)
      },
      rejectCallback: () => {
        return new QuestCategory()
      },
      data
    })
  }
}
