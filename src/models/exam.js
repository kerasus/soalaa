import {Model, Collection} from 'js-abstract-model'


class Exam extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'baseRoute',
                default: '/3a/api/exam'
            },
            { key: 'id' },
            { key: 'title' },
            { key: 'holding_status' },
            { key: 'photo' },
            { key: 'start_at' },
            { key: 'finish_at' },
            { key: 'finished_at' },
            { key: 'accept_at' },
            { key: 'is_registered' },
            { key: 'user_exam_status' },
            { key: 'price' },
            { key: 'delay_time' }
        ])
    }
}

class ExamList extends Collection {
    model() {
        return Exam
    }
}

export {Exam, ExamList}
