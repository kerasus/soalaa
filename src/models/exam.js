import {Model, Collection} from 'js-abstract-model'


class Exam extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'baseRoute',
                default: '/exam'
            },
            { key: 'id' },
            { key: 'title' },
            { key: 'holding_status' },
            { key: 'photo' },
            { key: 'start_at' },
            { key: 'finish_at' },
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
