import { Model, Collection } from 'js-abstract-model'
var md = require('markdown-it')(),
    mk = require('markdown-it-katex')
md.use(mk);

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
        if (typeof this.body === 'string') {
            this.rendered_body = md.render(this.body)
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
