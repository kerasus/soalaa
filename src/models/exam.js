import {Model, Collection} from 'js-abstract-model'


class Exam extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'title',
                default: 'آزمون جامع'
            },
            {key: 'holding_status',
                default: ''},
            {key: 'start_at',
                default: '9 صبح'},
            {key: 'finish_at',
                default: '12 ظهر'},
            {key: 'price',
                default: ''},
            {key: 'delay_time',
                default: '10 دقیقه'},
            {key: 'id'},

        ])

    }
}

class ExamList extends Collection {
    model() {
        return Exam
    }

}

export {Exam, ExamList}
