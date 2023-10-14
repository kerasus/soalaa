import { Model, Collection } from 'js-abstract-model'

class QuestionStatus extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'display_title' },
      { key: 'created_at' },
      { key: 'updated_at' }
    ])
  }
}

class QuestionStatusList extends Collection {
  model () {
    return QuestionStatus
  }
}

export { QuestionStatus, QuestionStatusList }
