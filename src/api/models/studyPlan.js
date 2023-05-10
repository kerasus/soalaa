import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { StudyPlan, StudyPlanList } from 'src/models/StudyPlan'

export default class StudyPlanAPI extends APIRepository {
  constructor() {
    super('studyPlan', apiV2, '/plan', new StudyPlan())
    this.APIAdresses = {
      plan: '/plan',
      studyEvent: (id) => '/studyEvent/' + id + '/studyPlans',
      getPlans: (id) => '/studyPlan/' + id + '/plans'

    }
    this.CacheList = {
      studyEvent: (id) => this.name + this.APIAdresses.studyEvent(id),
      getPlans: (id) => this.name + this.APIAdresses.getPlans(id)
    }
  }

  getStudyEvents(id, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.studyEvent(id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new StudyPlanList(response.data.data)
      },
      rejectCallback: () => {
        return new StudyPlanList()
      }
    })
  }

  getPlans(id, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getPlans(id),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new StudyPlanList(response.data.data)
      },
      rejectCallback: () => {
        return new StudyPlanList()
      }
    })
  }
}
