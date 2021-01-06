import {Model} from 'js-abstract-model'

class TimerInfo extends Model {
    constructor(data) {
        super(data, [
            {key: 'days', default: 0},
            {key: 'hours', default: 0},
            {key: 'minutes', default: 0},
            {key: 'seconds', default: 0},
        ])
    }
}

export {TimerInfo}
