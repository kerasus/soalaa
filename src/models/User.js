/* eslint-disable camelcase,prefer-const */
import { Model } from 'js-abstract-model'
import { ExamList } from '../models/Exam'
import API_ADDRESS from '../api/Addresses'

class User extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'baseRoute',
        default: API_ADDRESS.user.base
      },
      { key: 'id' },
      { key: 'first_name' },
      { key: 'last_name' },
      { key: 'full_name' },
      { key: 'mobile' },
      { key: 'city' },
      { key: 'province' },
      { key: 'ostan_id' },
      { key: 'shahr_id' },
      { key: 'address' },
      { key: 'postal_code' },
      { key: 'email' },
      { key: 'school' },
      { key: 'user_exam_status' },
      {
        key: 'photo',
        default: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg'
      },
      { key: 'token' },
      { key: 'has_admin_permission' },
      { key: 'has_educational_permission' },

      { key: 'mobile_verified_at' },
      { key: 'wallet_balance' },
      { key: 'profile_completion' },

      {
        key: 'gender',
        default: { id: null }
      },
      {
        key: 'major',
        default: { id: null }
      },
      {
        key: 'grade',
        default: { id: null }
      },
      {
        key: 'exams',
        relatedModel: ExamList
      },
      {
        key: 'updateType',
        default: 'profile'
      }

    ])

    if (!this.full_name) {
      this.full_name = this.first_name + ' ' + this.last_name
    }
  }

  getCompletionInfoKeys () {
    return [
      'first_name',
      'last_name',
      'major',
      'city',
      // 'school',
      'mobile_verified_at',
      'grade'
    ]
  }

  checkInformationCompletionKey (key) {
    return (
      (this[key] !== null && typeof this[key] === 'object' && typeof this[key].id !== 'undefined' && this[key].id !== null) ||
      (this[key] && typeof this[key].id === 'undefined')
    )
  }

  percentageOfInformationCompletion () {
    let percentage = 0
    let completionInfoKeys = this.getCompletionInfoKeys()
    let percentageStep = (100 / completionInfoKeys.length)

    completionInfoKeys.forEach(item => {
      if (this.checkInformationCompletionKey(item)) {
        percentage += percentageStep
      }
    })

    if (percentage > 100) {
      percentage = 100
    }

    return percentage
  }

  needToCompleteInfo () {
    const completionInfoKeys = this.getCompletionInfoKeys()
    let status = false
    try {
      completionInfoKeys.forEach(item => {
        if (!this.checkInformationCompletionKey(item)) {
          // eslint-disable-next-line no-throw-literal
          throw 'needToCompleteInfo: ' + item
        }
      })
    } catch (e) {
      status = true
    }

    return status
  }

  // registerExam (exam_id) {
  //   const that = this
  //   return new Promise(function (resolve, reject) {
  //     that.create({
  //       exam_id
  //     }, API_ADDRESS.exam.registerExam)
  //       .then((response) => {
  //         resolve(response)
  //       })
  //       .catch((error) => {
  //         Assistant.reportErrors({ location: 'models/User.js -> registerExam()' })
  //         reject(error)
  //       })
  //   })
  // }
}

export { User }
