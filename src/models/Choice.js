import { Model, Collection } from 'js-abstract-model'

class Choice extends Model {
    constructor (data) {
        super(data, [
            { key: 'id' },
            { key: 'body' },
            {
                key: 'active',
                default: false
            },
            { key: 'order' }
        ])
    }
}

class ChoiceList extends Collection {
    model () {
        return Choice
    }

    getSelected () {
        return this.list.find((item) => item.active)
    }
}

export { Choice, ChoiceList }
