import { Model, Collection } from 'js-abstract-model'

class AttachedExam extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'created_at' },
      { key: 'updated_at' },
      { key: 'exam' },
      { key: 'exam_id' },
      { key: 'order' },
      { key: 'sub_category' },
      { key: 'sub_category_id' }
    ])

    if (this.exam) {
      this.exam_id = this.exam.id
    }
    if (this.sub_category) {
      this.sub_category_id = this.sub_category.id
    }
  }
}

class AttachedExamList extends Collection {
  model () {
    return AttachedExam
  }
}

export { AttachedExam, AttachedExamList }
