import {Collection, Model} from 'js-abstract-model'

class UserExamQuestionData extends Model {
    constructor(data) {
        super(data, [
            {key: 'exam_id'},
            {key: 'question_id'},
            {key: 'answered_at'},
            {key: 'answered_choice_id'},
            {
                key: 'checking_times',
                default: []
            },
            {
                key: 'bookmarked',
                default: false
            },
            {
                key: 'state',
                default: ''
            },
        ])
    }
}

class UserExamQuestionDataList extends Collection {
    model() {
        return UserExamQuestionData
    }
}

export {UserExamQuestionData, UserExamQuestionDataList}
