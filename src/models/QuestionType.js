import { Collection, Model } from 'js-abstract-model'
// import API_ADDRESS from '../api/Addresses'

class QuestionType extends Model {
  constructor (data) {
    super(data, [
      // {
      //   key: 'baseRoute',
      //   default: API_ADDRESS.question.base + '?type=question_type'
      // },
      {
        key: 'id',
        default: null
      },
      {
        key: 'type',
        default: 'question_type'
      },
      {
        key: 'value',
        default: null
      },
      {
        key: 'componentName',
        default: null
      },
      {
        key: 'tabName',
        default: null
      }
    ])

    if (this.value === 'konkur') {
      this.tabName = 'تستی'
      this.componentName = 'MultipleChoiceQ'
    } else if (this.value === 'psychometric') {
      this.tabName = 'ام بی تی آی'
      this.componentName = 'MBTIQ'
    } else if (this.value === 'descriptive') {
      this.tabName = 'تشریحی'
      this.componentName = 'DescriptiveQ'
    }
  }
}

class TypeList extends Collection {
  model () {
    return QuestionType
  }
}

export { QuestionType, TypeList }
