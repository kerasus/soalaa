import { Model, Collection } from 'js-abstract-model'
import md from '@/plugins/Markdown'

class Choice extends Model {
    constructor (data) {
        super(data, [
            { key: 'id' },
            { key: 'title' },
            { key: 'rendered_title' },
            {
                key: 'active',
                default: false
            },
            {
                key: 'answer',
                default: false
            },
            { key: 'order' },
            { key: 'answered_at' }
        ])
        if (typeof this.title === 'string') {
            this.rendered_title = md.render(this.title)
        }
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
