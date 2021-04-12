import { Model, Collection } from 'js-abstract-model'

var md = require('markdown-it')()
md.use(require('markdown-it-new-katex'))
md.use(require('markdown-it-container'), 'mesra')
md.use(require('markdown-it-container'), 'beit', {

    validate: function(params) {
        return params.trim().match(/^beit\s+(.*)--\*mesra\*--(.*)$/)
    },

    render: function (tokens, idx) {
        let m = tokens[idx].info.trim().match(/^beit\s+(.*)--\*mesra\*--(.*)$/)
        if (m && m[1] && m[2] && tokens[idx].nesting === 1) {
            let mesra1 = md.utils.escapeHtml(m[1])
            let mesra2 = md.utils.escapeHtml(m[2])
            // opening tag
            return '<div class="beit"><div class="mesra">' + mesra1 + '</div><div class="mesra">'+ mesra2 +'</div>\n';
        } else {
            // closing tag
            return '</div>\n';
        }
    }
});

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
