import { Model, Collection } from 'js-abstract-model'
import {QuestionList} from "./Question";

class Quiz extends Model {
    constructor (data) {
        super(data, [
            { key: 'id' },
            { key: 'title' },
            { key: 'order' },
            { key: 'begin_datetime' },
            { key: 'finish_datetime' },
            { key: 'total_question_number' },
            {
                key: 'questions',
                relatedModel: QuestionList
            },
        ])
    }
}

class QuizList extends Collection {
    model () {
        return Quiz
    }
}

export { Quiz, QuizList }
