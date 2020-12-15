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
            {
                key: 'state',
                default: ''
            },
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

    isAnswered () {
        for (let i = 0; i < this.choices.list.length; i++) {
            if (this.choices.list[i].active) {
                this.state = ''
                return true
            }
        }
        return false
    }

    changeState (newState) {
        this.uncheckChoices()
        if (newState === this.state) {
            this.state = ''
            return
        }
        this.state = newState
    }

    bookmark () {
        this.bookmarked = !this.bookmarked
    }

    choiceClicked (choiceId) {
        this.state = ''
        for (let i = 0; i < this.choices.list.length; i++) {
            if (this.choices.list[i].id !== choiceId) {
                this.choices.list[i].active = false
            } else if (this.choices.list[i].active) {
                this.choices.list[i].active = false
            } else {
                this.choices.list[i].active = true
            }
        }
    }

    uncheckChoices () {
        for (let i = 0; i < this.choices.list.length; i++) {
            this.choices.list[i].active = false
        }
    }
}

class QuestionList extends Collection {
    model () {
        return Question
    }

}

export { Question, QuestionList }
