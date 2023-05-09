/* eslint-disable */
import { Model, Collection } from 'js-abstract-model'
import { QuestionList } from 'src/models/Question'
import API_ADDRESS from 'src/api/Addresses'

class QuestSubcategory extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'baseRoute',
        default: API_ADDRESS.questionSubcategory.base
      },
      { key: 'id' },
      { key: 'title' },
      {
        key: 'permissions',
        default: {
          insert: false,
          view: false
        }
      },
      { key: 'order' },
      { key: 'time' },
      { key: 'category_id' },
      {
        key: 'questions',
        relatedModel: QuestionList
      },
      {
        key: 'editable',
        default: false
      }
    ])

    if (this.title === null) {
      this.title = ''
    }

    this.apiResource = {
      fields: [
        {key: 'id'},
        {key: 'title'},
        {key: 'permissions'},
        {key: 'order'},
        {key: 'time'},
        {key: 'category_id'},
        {key: 'editable'}
      ]
    }
  }
}

class QuestSubcategoryList extends Collection {
  model () {
    return QuestSubcategory
  }
}

export { QuestSubcategory, QuestSubcategoryList }

