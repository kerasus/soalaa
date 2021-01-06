import {Collection, Model} from 'js-abstract-model'
import Time from "@/plugins/time";

class CheckingTime extends Model {
    constructor(data) {
        super(data, [
            {key: 'start'},
            {key: 'end'}
        ])
    }
}

class CheckingTimeList extends Collection {
    model () {
        return CheckingTime
    }

    addStart() {
        this.addItem({
            start: Time.now()
        })
    }

    addEnd() {
        let listLength = this.list.length
        if (listLength === 0) {
            return
        }
        this.list[(listLength-1)].end = Time.now()
    }
}

export { CheckingTime, CheckingTimeList }
