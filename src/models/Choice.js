import { Model, Collection } from 'js-abstract-model'
import md from '@/plugins/Markdown'
import TurndownService from "turndown/lib/turndown.browser.umd";
import convertToMarkdownKatex from "@/plugins/ConvertToMarkdownKatex"

class Choice extends Model {
    constructor (data) {
        super(data, [
            { key: 'id' },
            { key: 'title' },
            { key: 'rendered_title' },
            { key: 'value' },
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
            this.rendered_title = convertToMarkdownKatex(this.title)
            // this.rendered_title = md.render(this.title)
        }
    }

    convertToMarkdownKatex1 (string) {
        if (!string) {
            return string
        }
        string = string.replace(/\n/g,'<br>')

        TurndownService.prototype.escape = function (string) {
            let escapes = [
                [/\s\$/g, '$'],
                [/\$\s/g, '$'],
                [/\{align\*\}/g, '{cases}'],
                // [/\\/g, '\\\\'],
                // [/\*/g, '\\*'],
                // [/^-/g, '\\-'],
                // [/^\+ /g, '\\+ '],
                // [/^(=+)/g, '\\$1'],
                // [/^(#{1,6}) /g, '\\$1 '],
                // [/`/g, '\\`'],
                // [/^~~~/g, '\\~~~'],
                // [/\[/g, '\\['],
                // [/\]/g, '\\]'],
                // [/^>/g, '\\>'],
                // [/_/g, '\\_'],
                // [/^(\d+)\. /g, '$1\\. ']
            ];
            return escapes.reduce(function (accumulator, escape) {
                return accumulator.replace(escape[0], escape[1])
            }, string)
        }
        // create an instance of Turndown service
        const turndownService = new TurndownService({
            // rules: COMMONMARK_RULES,
            headingStyle: 'setext',
            hr: '* * *',
            bulletListMarker: '*',
            codeBlockStyle: 'indented',
            fence: '```',
            emDelimiter: '_',
            strongDelimiter: '**',
            linkStyle: 'inlined',
            linkReferenceStyle: 'full',
            br: '  ',
            blankReplacement: function (content, node) {
                return node.isBlock ? '\n\n' : ''
            },
            keepReplacement: function (content, node) {
                return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML
            },
            defaultReplacement: function (content, node) {
                return node.isBlock ? '\n\n' + content + '\n\n' : content
            }
        })
        // turndownService.keep(['$'])

        // convert HTML to Markdown
        return turndownService.turndown(string)
        // return string
        // return markdown

        // return this.markdown.render(string.replace('<div class="question" dir="rtl">', ''))
        // return md.render(markdown)
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
