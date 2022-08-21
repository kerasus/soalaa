/* eslint-disable camelcase,array-callback-return */
import Time from 'src/plugins/time'
import { Model, Collection } from 'js-abstract-model'
import { ChoiceList } from './Choice'
import { CheckingTimeList } from '../models/CheckingTime'
import API_ADDRESS from '../api/Addresses'
import { QuestionStatus } from '../models/QuestionStatus'
import { LogList } from '../models/Log'
// eslint-disable-next-line import/named
import { createApp } from 'vue'
import { QuestionType } from '../models/QuestionType'
import { AttachedExamList } from '../models/AttachedExam'
import { TreeNodeList } from 'src/models/TreeNode'
if (!window.app) {
// window.app
  window.app = createApp({})
}
class Question extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'baseRoute',
        default: API_ADDRESS.question.base
      },
      { key: 'id' },
      { key: '_id' },
      { key: 'title' },
      { key: 'index' },
      {
        key: 'statement',
        default: ''
      },
      { key: 'statement_photo' },
      { key: 'rendered_statement' },
      { key: 'in_active_category' },
      { key: 'photo' },
      { key: 'order' },
      { key: 'major' }, // ToDo: must remove
      { key: 'majors' },
      {
        key: 'years',
        default: []
      },
      {
        key: 'reference',
        default: []
      },
      {
        key: 'designers',
        default: []
      },
      {
        key: 'source_data',
        default: {}
      },
      {
        key: 'exams',
        relatedModel: AttachedExamList
      },
      { key: 'type_id' },
      {
        key: 'author',
        default: []
      },
      {
        key: 'type',
        relatedModel: QuestionType
        // default: {
        //   id: null,
        //   type: null, // question_type
        //   value: null, // psychometric
        //   name: null
        // }
      },
      {
        key: 'isInView',
        default: false
      },
      { key: 'sub_category' },
      { key: 'sub_category_id' },
      {
        key: 'checking_times',
        relatedModel: CheckingTimeList
      },
      {
        key: 'logs',
        relatedModel: LogList
      },
      {
        key: 'answer',
        default: ''
      },
      {
        key: 'answer_photos',
        default: []
      },
      { key: 'descriptive_answer' },
      { key: 'rendered_descriptive_answer' },
      { key: 'selected_at' },
      {
        key: 'tags',
        relatedModel: TreeNodeList
      },
      {
        key: 'choices',
        relatedModel: ChoiceList
      },
      {
        key: 'status',
        relatedModel: QuestionStatus
      },
      {
        key: 'state',
        default: ''
      },
      {
        key: 'ltr',
        default: false
      },
      {
        key: 'bookmarked',
        default: false
      },
      { key: 'lesson' },
      {
        key: 'seen',
        default: false
      },
      {
        key: 'recommendedTime',
        default: 0
      },
      {
        key: 'level',
        default: 1
      },
      {
        key: 'creator',
        default: 1
      },
      {
        key: 'confirmed',
        default: false
      },
      {
        key: 'confirmers',
        default: []
      },
      { key: 'created_at' },
      { key: 'updated_at' },

      // ToDo: remove this
      { key: 'source_data' }
    ])

    if (this.id) {
      this._id = this.id
    }

    if (this._id) {
      this.id = this._id
    }

    const that = this
    this.apiResource = {
      fields: [
        { key: 'id' },
        { key: 'title' },
        { key: 'statement' },
        { key: 'statement_photo' },
        { key: 'answer_photos' },
        { key: 'order' },
        { key: 'selected_at' },
        { key: 'answer' },
        { key: 'descriptive_answer' },
        { key: 'sub_category_id' },
        { key: 'type_id' },
        { key: 'author' },
        { key: 'type' },
        { key: 'sub_category' },
        {
          key: 'choices',
          value: function () {
            return that.choices.list
          }
        },
        {
          key: 'exams',
          value: function () {
            return that.exams.list
          }
        },
        {
          key: 'checking_times',
          value: function () {
            return that.checking_times.list
          }
        },
        {
          key: 'logs',
          value: function () {
            return that.logs.list
          }
        }
      ]
    }

    // if (this.tags.list.length === 0) {
    //   this.generateFakeData()
    // }
  }

  // ToDo: remove this
  generateFakeData () {
    this.generateFakeTags()
    // this.generateFakeLevel()
  }

  // generateFakeLevel () {
  //   this.level = Math.floor(Math.random() * 3) + 1 // 1 - 3
  // }

  generateFakeTags () {
    this.tags = new TreeNodeList([
      {
        title: 'ریاضی',
        type: 'major',
        category_id: '235423523523523'
      },
      {
        title: this.getRandomMajor(),
        type: 'lesson',
        category_id: '235423523523523'
      },
      {
        title: 'دوازدهم',
        type: 'grade',
        category_id: '235423523523523afdad'
      },
      {
        title: 'فصل یک',
        type: 'sub-lesson',
        category_id: '235423523523523asdfasdfasd'
      }
    ])
  }

  getRandomMajor () {
    const lessons = ['شیمی', 'فیزیک', 'دینی', 'زبان', 'ادبیات', 'حسابان', 'منطق', 'گسسته', 'عربی', 'ریاضی']
    return lessons[Math.floor(Math.random() * lessons.length)]
  }

  getAnsweredChoice () {
    return this.choices.list.find((item) => {
      return (item.active === true)
    })
  }

  // ToDo: remove up stuff

  isAnswered () {
    const answeredChoice = this.getAnsweredChoice()

    if (answeredChoice) {
      return true
    } else {
      return false
    }
  }

  changeState (newState) {
    if (newState === 'x') {
      this.uncheckChoices()
    }
    if (newState === this.state) {
      window.app.set(this, 'state', '')
      return
    }
    window.app.set(this, 'state', newState)
  }

  bookmark () {
    this.bookmarked = !this.bookmarked
  }

  enterQuestion () {
    this.checking_times.addStart()
  }

  leaveQuestion () {
    this.checking_times.addEnd()
  }

  setTrueChoice (choiceId) {
    this.choices.list.map((item) => {
      if (item.id === choiceId) {
        item.answer = true
        window.app.set(item, 'answer', true)
      } else {
        item.answer = false
        window.app.set(item, 'answer', false)
      }

      return item
    })
  }

  selectChoice (choiceId, selected_at) {
    let answeredAt = Time.now()
    if (selected_at) {
      answeredAt = selected_at
    }
    const that = this
    this.choices.list.map((item) => {
      window.app.set(item, 'answered_at', answeredAt)
      if (that.state === 'x') {
        that.state = ''
        window.app.set(that, 'state', '')
      }
      if (item.id !== choiceId) {
        item.active = false
        window.app.set(item, 'active', false)
      } else if (choiceId === null || typeof choiceId === 'undefined' || item.active) {
        window.app.set(item, 'active', false)
        // item.active = false
      } else {
        window.app.set(item, 'active', true)
        // item.active = true
      }
    })
  }

  uncheckChoices () {
    this.choices.list.map((item) => {
      item.active = false
      window.app.set(item, 'active', false)
    })
  }

  actionsWhileSendingData () {
    console.log('run')
    Time.synchronizeTime()
      .then(res => {
        console.log('res', res)
      })
  }
}

class QuestionList extends Collection {
  model () {
    return Question
  }

  changeOrderToInt () {
    this.list.forEach((item, index, questions) => {
      questions[index].order = parseInt(questions[index].order)
    })
  }

  sortByOrder () {
    this.changeOrderToInt()
    return this.sortByKey('order')
  }

  getQuestionById (questionId) {
    return this.list.find(
      (item) =>
        questionId !== null && (item.id).toString() === (questionId).toString()
    )
  }

  getFirstActiveQuestion () {
    return this.list.find((item) => !!(item.in_active_category))
  }
}

export { Question, QuestionList }
