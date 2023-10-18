import { Model, Collection } from 'js-abstract-model'

class UserAnswersOfExamStatus extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'status' }, // 'x' - 'o'
      { key: 'question_id' },
      { key: 'selected_at' },
      { key: 'exam_user_id' }
    ])
  }
}

class UserAnswersOfExamStatussList extends Collection {
  model () {
    return UserAnswersOfExamStatus
  }
}

export { UserAnswersOfExamStatus, UserAnswersOfExamStatussList }
