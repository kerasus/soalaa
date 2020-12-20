import { Model, Collection } from 'js-abstract-model'
import { AnswerList } from './Answer'
import { ChoiceList } from './Choice'
import {QuestCategory} from "./QuestCategory";

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
                key: 'sub_category',
                relatedModel: QuestCategory
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

    getQuestionIndexById (questionId) {
        return this.list.findIndex((item)=> parseInt(item.id) === parseInt(questionId))
    }

    getQuestionById (questionId) {
        return this.list.find((item)=> parseInt(item.id) === parseInt(questionId))
    }

    getQuestionByIndex (questionIndex) {
        let question = this.list[questionIndex]
        if (question) {
            return question
        } else {
            return false
        }
    }

    getNextQuestion (questionId) {
        let currentIndex = this.getQuestionIndexById(questionId),
            nextIndex = ++currentIndex
        return this.getQuestionByIndex(nextIndex)
    }

    getPrevQuestion (questionId) {
        let currentIndex = this.getQuestionIndexById(questionId),
            prevIndex = --currentIndex
        return this.getQuestionByIndex(prevIndex)
    }

}

export { Question, QuestionList }
