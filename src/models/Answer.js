import { Model, Collection } from 'js-abstract-model'

class Answer extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'body' },
      { key: 'photo' }
    ])
  }
}

class AnswerList extends Collection {
  model () {
    return Answer
  }
}

export { Answer, AnswerList }
