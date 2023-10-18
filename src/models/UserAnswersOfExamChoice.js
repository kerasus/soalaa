import { Model, Collection } from 'js-abstract-model'

class UserAnswersOfExamChoice extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'choice_id' },
      { key: 'question_id' },
      { key: 'selected_at' },
      { key: 'exam_user_id' }
    ])
  }
}

class UserAnswersOfExamChoicesList extends Collection {
  model () {
    return UserAnswersOfExamChoice
  }
}

export { UserAnswersOfExamChoice, UserAnswersOfExamChoicesList }
