import { Model, Collection } from 'js-abstract-model'
import { AnswerList } from './Answer'
import { ChoiceList } from './Choice'

class Question extends Model {
    constructor (data) {
        super(data, [
            { key: 'id' },
            { key: 'title' },
            { key: 'body' },
            { key: 'photo' },
            { key: 'order' },
            {
                key: 'answers',
                relatedModel: AnswerList
            },
            {
                key: 'choices',
                relatedModel: ChoiceList
            },
            { key: 'state' },
            {
                key: 'bookmarked',
                default: false
            },
            { key: 'lesson' },
            {
                key: 'seen',
                default: false
            }
        ])
    }

    isAnswered (choicesList = this.choices.list) {
        for (let i = 0; i < choicesList.length; i++) {
            if (choicesList[i].active) {
                return true
            }
        }
        return false
    }
}

class QuestionList extends Collection {
    model () {
        return Question
    }

}

export { Question, QuestionList }
