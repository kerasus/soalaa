import { Model, Collection } from 'js-abstract-model'
var md = require('markdown-it')(),
    mk = require('markdown-it-katex')
md.use(mk);

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
            { key: 'order' },
            { key: 'answered_at' },
            { key: 'answer' }
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
