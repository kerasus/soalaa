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
            let mesra1 = md.render(md.utils.escapeHtml(m[1].toString()))
            let mesra2 = md.render(md.utils.escapeHtml(m[2].toString()))
            // opening tag
            return '<div class="beit"><div class="mesra">' + mesra1 + '</div><div class="mesra">'+ mesra2 +'</div>\n';
        } else {
            // closing tag
            return '</div>\n';
        }
    }
});

export default md
