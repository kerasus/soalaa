var md = require('markdown-it')({
    // enable html
    html: true
})
// https://www.npmjs.com/package/markdown-it-new-katex
// https://katex.org/docs/options.html
md.use(require('markdown-it-new-katex'), {trust: true, strict: 'ignore', throwOnError: false})
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

function convertUnderline (markdownString) {
    let re = /(\*\*__~~((?!~~__\*\*).)*~~__\*\*)/gi;

    let newMarkdownString = markdownString.replace(re, (match) => {
        return match.replace('**__~~', '<u>').replace('~~__**', '</u>')
    })

    return newMarkdownString
}
function addImagesWidthAndHeight (htmlString) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = htmlString;
    wrapper.querySelectorAll('img').forEach(item => {
        let width = 100
        let height = 100
        item.src.match(/(w=\d*&h=\d*)|(h=\d*&w=\d*)$/g).forEach((target) => {
            target.match(/w=\d*/g).forEach((widthTarget) => {
                width = widthTarget.replace('w=', '')
            });
            target.match(/h=\d*/g).forEach((heightTarget) => {
                height = heightTarget.replace('h=', '')
            });
        });

        item.setAttribute('width', width)
        item.setAttribute('height', height)
        console.log('item', item)
    })

    return wrapper.innerHTML
}
function convert (string) {
    if (!string) {
        return string
    }
    const markdown = string

    string = convertUnderline(string)
    string = md.render(markdown, {strict: false})
    string = addImagesWidthAndHeight(string)

    return string
}

export default convert
