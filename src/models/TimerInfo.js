import {Model} from 'js-abstract-model'

class TimerInfo extends Model {
    constructor(data) {
        super(data, [
            {
                key: 'info',
                default: {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                }
            },
        ])


    }
}

export {TimerInfo}
