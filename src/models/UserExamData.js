/* eslint-disable array-callback-return,camelcase */
import { Model } from 'js-abstract-model'

class UserExamData extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'exam_title' },
      { key: 'exam_id' },
      { key: 'categories' },
      { key: 'accept_at' },
      { key: 'created_at' },
      { key: 'finished_at' },
      { key: 'holding_config' },
      { key: 'questions_file_url' },
      { key: 'user_id' },
      { key: 'sub_categories' }
    ])
  }
}

export { UserExamData }
