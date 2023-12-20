import { Model, Collection } from 'js-abstract-model'
import { UserAnswersOfExamStatus } from 'src/models/UserAnswersOfExamStatus.js'
import { UserAnswersOfExamChoice } from 'src/models/UserAnswersOfExamChoice.js'
import { UserAnswersOfExamBookmark } from 'src/models/UserAnswersOfExamBookmark.js'

class UserAnswersOfExam extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'bookmarks',
        default: []
      },
      {
        key: 'choices',
        default: []
      },
      {
        key: 'statuses',
        default: []
      }
    ])

    this.choices = this.choices.map(item => new UserAnswersOfExamChoice(item))
    this.statuses = this.statuses.map(item => new UserAnswersOfExamStatus(item))
    this.bookmarks = this.bookmarks.map(item => new UserAnswersOfExamBookmark(item))
  }
}

class UserAnswersOfExamList extends Collection {
  model () {
    return UserAnswersOfExam
  }
}

export { UserAnswersOfExam, UserAnswersOfExamList }
