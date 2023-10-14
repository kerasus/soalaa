import { Model, Collection } from 'js-abstract-model'

class UserAnswersOfExamBookmark extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      {
        key: 'bookmark',
        default: false
      },
      { key: 'question_id' },
      { key: 'selected_at' },
      { key: 'exam_user_id' }
    ])
  }
}

class UserAnswersOfExamBookmarksList extends Collection {
  model () {
    return UserAnswersOfExamBookmark
  }
}

export { UserAnswersOfExamBookmark, UserAnswersOfExamBookmarksList }
