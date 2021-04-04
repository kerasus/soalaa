import {Collection, Model} from 'js-abstract-model'
import Vue from 'vue'
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

    getLastItem () {
        let listLength = this.list.length
        if (listLength === 0) {
            return false
        }
        return this.list[(listLength-1)]
    }

    addStart() {
        this.addItem({
            start: Time.now()
        })
    }

    addEnd() {
        let lastItem = this.getLastItem()
        if (!lastItem) {
            return
        }
        Vue.set(lastItem, 'end', Time.now())
    }
}

export { CheckingTime, CheckingTimeList }
