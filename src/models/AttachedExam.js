import { Model, Collection } from 'js-abstract-model'

class AttachedExam extends Model {
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

class AttachedExamList extends Collection {
  model () {
    return AttachedExam
  }
}

export { AttachedExam, AttachedExamList }
