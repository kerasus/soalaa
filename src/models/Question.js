import Vue from 'vue'
import { Model, Collection } from 'js-abstract-model'
import { ChoiceList } from './Choice'
import { CheckingTimeList } from "@/models/CheckingTime";
import Time from "@/plugins/time";
import axios from "axios";
import API_ADDRESS from "@/api/Addresses";
var md = require('markdown-it')(),
    mk = require('markdown-it-katex')
md.use(mk);

class Question extends Model {
    constructor (data) {
        super(data, [
            {
                key: 'baseRoute',
                default: '/3a/api/exam-question/attach'
            },
            { key: 'id' },
            { key: '_id' },
            { key: 'title' },
            { key: 'index' },
            { key: 'statement' },
            { key: 'rendered_statement' },
            { key: 'in_active_category' },
            { key: 'photo' },
            { key: 'order' },
            { key: 'exams' },
            {
                key: 'isInView',
                default: false
            },
            { key: 'sub_category' },
            { key: 'sub_category_id' },
            {
                key: 'checking_times',
                relatedModel: CheckingTimeList
            },
            {key: 'answer'},
            {key: 'selected_at'},
            {
                key: 'choices',
                relatedModel: ChoiceList
            },
            {
                key: 'state',
                default: ''
            },
            {
                key: 'ltr',
                default: false
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

        if (this.id) {
            this._id = this.id
        }

        if (this._id) {
            this.id = this._id
        }

        let that = this;
        this.apiResource = {
            fields: [
                {key: 'statement'},
                {key: 'sub_category_id'},
                {key: 'exams'},
                {
                    key: 'choices',
                    value: function () {
                        return that.choices.list
                    }
                }
            ]
        }

        if (typeof this.statement === 'string') {
            this.rendered_statement = md.render(this.statement)
        }
    }

    getAnsweredChoice () {
        return this.choices.list.find((item) => {
            return (item.active === true)
        })
    }

    isAnswered () {
        let answeredChoice = this.getAnsweredChoice()

        if (answeredChoice) {
            return true
        } else {
            return false
        }
    }

    changeState (newState) {
        if (newState === 'x') {
            this.uncheckChoices()
        }
        if (newState === this.state) {
            Vue.set(this, 'state', '')
            return
        }
        Vue.set(this, 'state', newState)
    }

    bookmark () {
        this.bookmarked = !this.bookmarked
    }

    enterQuestion () {
        this.checking_times.addStart()
    }

    leaveQuestion () {
        this.checking_times.addEnd()
    }

    setTrueChoice (choiceId) {
        this.choices.list.map((item)=> {
            if (item.id === choiceId) {
                item.answer = true
                Vue.set(item, 'answer', true)
            } else {
                item.answer = false
                Vue.set(item, 'answer', false)
            }

            return item
        })
    }

    selectChoice (choiceId, selected_at) {
        let answeredAt = Time.now()
        if (selected_at) {
            answeredAt = selected_at
        }
        let that = this
        this.choices.list.map((item)=> {
            Vue.set(item, 'answered_at', answeredAt)
            if (that.state === 'x') {
                that.state = ''
                Vue.set(that, 'state', '')
            }
            if (item.id !== choiceId) {
                item.active = false
                Vue.set(item, 'active', false)
            } else if (choiceId === null || typeof choiceId === 'undefined' || item.active) {
                Vue.set(item, 'active', false)
                // item.active = false
            } else {
                Vue.set(item, 'active', true)
                // item.active = true
            }
        })
    }

    uncheckChoices () {
        this.choices.list.map((item)=> {
            item.active = false
            Vue.set(item, 'active', false)
        })
    }

    sendAnswer (exam_user_id, {question_id, choice_id, selected_at }) {
        axios.post(API_ADDRESS.exam.sendAnswers, {exam_user_id, questions: [{question_id, choice_id, selected_at}] })
    }

    sendStatus (exam_user_id, {question_id, status }) {
        axios.post(API_ADDRESS.exam.sendStatus, {exam_user_id, question_id, status})
    }

    sendBookmark (exam_user_id, question_id) {
        axios.post(API_ADDRESS.exam.sendBookmark, {exam_user_id, question_id})
    }

    sendUnBookmark (exam_user_id, question_id) {
        axios.post(API_ADDRESS.exam.sendUnBookmark, {exam_user_id, question_id})
    }
}

class QuestionList extends Collection {
    model () {
        return Question
    }

    changeOrderToInt () {
        this.list.forEach( (item, index, questions) => {
            questions[index].order = parseInt(questions[index].order)
        } )
    }

    sortByOrder() {
        this.changeOrderToInt()
        return this.sortByKey('order');
    }


    getQuestionById (questionId) {
        return this.list.find(
            (item)=>
                questionId !== null && (item.id).toString() === (questionId).toString()
        )
    }

    getFirstActiveQuestion () {
        return this.list.find( (item) => !!(item.in_active_category))
    }
}

export { Question, QuestionList }
