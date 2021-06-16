<template>
  <v-row>
    <v-col v-if="editStatus">
      <vue-tiptap-katex
        v-model="html"
        :loading="loading"
        @input="updateValue"
      />
    </v-col>
    <!-- eslint-disable vue/no-v-html -->
    <v-col
      v-else
      v-html="html"
    />
    <!--eslint-enable-->

    <!--      <v-col-->
    <!--        v-if="label.length > 0 && !titleTopPosition"-->
    <!--        cols="1"-->
    <!--        class="text-left"-->
    <!--      >-->
    <!--        <span-->
    <!--          flat-->
    <!--          class="font-weight-medium mb-4 transparent"-->
    <!--          v-text="label"-->
    <!--        />-->
    <!--      </v-col>-->
    <!--      <v-col>-->
    <!--        <v-card-->
    <!--          v-if="label.length > 0 && titleTopPosition"-->
    <!--          flat-->
    <!--          class="font-weight-medium mb-4 transparent"-->
    <!--          v-text="label"-->
    <!--        />-->
    <!--                &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; data &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <!--                <v-textarea-->
    <!--                  v-if="editStatus"-->
    <!--                  flat-->
    <!--                  solo-->
    <!--                  :label="data.label"-->
    <!--                  :rows="data.line"-->
    <!--                />-->
    <!--        <v-card-->
    <!--          flat-->
    <!--          class="transparent"-->
    <!--          :color="color"-->
    <!--          v-html="data.value"-->
    <!--        />-->
    <!--      </v-col>-->
  </v-row>
</template>
<script>
  import VueTiptapKatex from 'vue-tiptap-katex'
  import {mixinMarkdownAndKatex} from '@/mixin/Mixins'
  import TurndownService from 'turndown/lib/turndown.browser.umd'

export default {
  name: 'QuestionField',
  components: {
    VueTiptapKatex,
  },
  mixins: [mixinMarkdownAndKatex],
  props: {
    value: {
      default: '',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    editStatus: {
      default: false,
      type: Boolean
    },
  },
  data() {
    return {
      html: '',
      loading: false
    }
  },
  watch: {
    value: function () {
      this.getHtmlValueFromValueProp()
    }
  },
  created () {
    this.getHtmlValueFromValueProp()
    this.loading = true
  },
  methods: {
    getHtmlValueFromValueProp () {
      this.html = this.value
      if (this.html === null || typeof this.html === 'undefined') {
        this.html = ''
      }
      this.html = this.convertToTiptap(this.html)
      this.loading = false
    },
    updateValue() {
      this.$emit('input', this.convertToMarkdownKatex(this.html))
    },
    convertTables(htmlString) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = htmlString;
      // var doc = new DOMParser().parseFromString(htmlString, "text/xml");
      // this.innerHTML = doc.innerHTML
      // let tables = doc.querySelectorAll('table')
      let tables = wrapper.querySelectorAll('table')
      // let tables = this.$refs.table.querySelectorAll('table')
      tables.forEach(item => {
        let markdownTable = ''
        let headRows = []
        if (item.tHead)
        {
          headRows = item.tHead.rows
          // headRows = item.querySelectorAll('thead tr')
        } else if (item.querySelectorAll('tr th').length > 0)
        {
          let rows = item.querySelectorAll('tr')
          rows.forEach(row => {
            if (row.querySelectorAll('th').length > 0)
            {
              headRows.push(row)
            }
          })
          // headRows = item.querySelectorAll('tr th')[0].parentNode.cells
        }
        let bodyRows = []
        // if (item.tBodies && item.tBodies[0]) {
        //   bodyRows = item.tBodies[0].rows
        //   // bodyRows = item.querySelectorAll('tbody tr')
        // } else
        if (item.querySelectorAll('tr td').length > 0)
        {
          let rows = item.querySelectorAll('tr')
          rows.forEach(row => {
            if (row.querySelectorAll('td').length > 0)
            {
              bodyRows.push(row)
            }
          })
          // headRows = item.querySelectorAll('tr th')[0].parentNode.cells
        }

        // table head
        let maxTheadCellCount = 0
        headRows.forEach(row => {
          let theadCellCount = 0
          let cells = row.querySelectorAll('th')
          cells.forEach(cell => {
            markdownTable += '|' + this.htmlToMarkdown(cell.innerHTML)
            theadCellCount++
          })
          if (theadCellCount > maxTheadCellCount)
          {
            maxTheadCellCount = theadCellCount
          }
          markdownTable += '|' + '<br>'
        })
        for (let i = 0; i < maxTheadCellCount; i++)
        {
          markdownTable += '|:-------------:'
        }
        markdownTable += '|' + '<br>'
        // table body
        bodyRows.forEach(row => {
          let cells = row.cells
          cells.forEach(cell => {
            markdownTable += '|' + this.htmlToMarkdown(cell.innerHTML)
          })
          markdownTable += '|' + '<br>'
        })

        var tableWrapper = document.createElement('div');
        tableWrapper.innerHTML = markdownTable;

        item.replaceChild(tableWrapper, item.childNodes[0]);

      })

      return wrapper.innerHTML
    },
    convertImage(htmlString) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = htmlString;
      let images = wrapper.querySelectorAll('tiptap-interactive-image-upload')
      images.forEach(item => {
        let markdownImage = item.attributes[0].nodeValue
        if (markdownImage) {
          markdownImage = '![](' + item.attributes[0].nodeValue + '?w=' + item.attributes[1].nodeValue + '&h=' + item.attributes[2].nodeValue + ')'

          var imageWrapper = document.createElement('div');
          imageWrapper.innerHTML = markdownImage;
          item.replaceWith(imageWrapper);
        }
      })

      return wrapper.innerHTML
    },
    convertKatex(htmlString) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = htmlString;
      let katexes = wrapper.querySelectorAll('tiptap-interactive-katex')
      katexes.forEach(item => {
        let markdownKatex = item.attributes[0].nodeValue
        if (markdownKatex) {
          markdownKatex = '$' + markdownKatex + '$'

          var katexWrapper = document.createElement('div');
          katexWrapper.innerHTML = markdownKatex;
          item.replaceWith(markdownKatex);
        }
      })
      katexes = wrapper.querySelectorAll('tiptap-interactive-katex-inline')
      katexes.forEach(item => {
        let markdownKatex = item.attributes[0].nodeValue
        if (markdownKatex) {
          markdownKatex = '$' + markdownKatex + '$'

          var katexWrapper = document.createElement('div');
          katexWrapper.innerHTML = markdownKatex;
          item.replaceWith(markdownKatex);
        }
      })

      return wrapper.innerHTML
    },
    convertMarkdownKatexToHtml (markdownString, index = 0) {
      const startIndex = markdownString.indexOf('$', index)
      if (startIndex === -1) {
        return markdownString
      }
      if (markdownString[startIndex -1] === '\\') {
        return this.convertMarkdownKatexToHtml(markdownString, startIndex + 1)
      }
      const endIndex = markdownString.indexOf('$', startIndex + 1)
      if (endIndex === -1) {
        return markdownString
      }
      if (markdownString[endIndex -1] === '\\') {
        return this.convertMarkdownKatexToHtml(markdownString, endIndex + 1)
      }
      const firstThird = markdownString.slice(0, startIndex)
      const secondThird = markdownString.slice(startIndex + 1, endIndex)
      const remaining = markdownString.slice(endIndex + 1)
      console.log('second third', startIndex, endIndex, secondThird)
      markdownString = firstThird + '<tiptap-interactive-katex-inline katex="' +
              secondThird + '"></tiptap-interactive-katex-inline>' + remaining
      return this.convertMarkdownKatexToHtml(markdownString, endIndex)
    },
    convertMarkdownImageToHtml (markdownString, index = 0) {
      const startIndex = markdownString.indexOf('![](', index)
      if (startIndex === -1) {
        return markdownString
      }
      const endIndex = markdownString.indexOf(')', startIndex)
      const firstThird = markdownString.slice(0, startIndex)
      const secondThird = markdownString.slice(startIndex + 4, endIndex)
      const remaining = markdownString.slice(endIndex + 1)
      const widthIndex = markdownString.indexOf('?w=', startIndex)
      if (widthIndex !== -1 && widthIndex < endIndex) {
        let width, height
        width = parseInt(markdownString.slice(widthIndex + 3, markdownString.indexOf('&h', widthIndex)))
        height = parseInt(markdownString.slice(markdownString.indexOf('&h=', widthIndex) + 3, markdownString.indexOf(')', widthIndex)))
        markdownString = firstThird + '<tiptap-interactive-image-upload url="'
                + secondThird.slice(0, secondThird.indexOf('?w=')) + '" width="' + width + '" height="' + height + '"></tiptap-interactive-image-upload>'+ remaining
      } else {
        // this need to be completed, what if width and height of the image is not equal
        markdownString = firstThird + '<tiptap-interactive-image-upload url="'
                + secondThird + '" width="100" height="100"></tiptap-interactive-image-upload>' + remaining
      }
      return this.convertMarkdownImageToHtml(markdownString, endIndex)
    },
    convertToTiptap (string = '') {

      string = this.convertMarkdownImageToHtml(string)
      string = this.convertMarkdownKatexToHtml(string)
      return string
    },
    convertToMarkdownKatex(string) {
      string = this.convertTables(string)
      string = this.convertKatex(string)
      string = this.convertImage(string)
      const markdown = this.htmlToMarkdown(string)
      console.log('markdown', markdown)
      // return this.markdown.render(string.replace('<div class="question" dir="rtl">', ''))
      return markdown
    },
    htmlToMarkdown(htmlString) {
      TurndownService.prototype.escape = function (string) {
        let escapes = [
          [
            /\s\$/g,
            '$'
          ],
          [
            /\$\s/g,
            '$'
          ],
          [
            /\{align\*\}/g,
            '{cases}'
          ],
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

      function repeat (character, count) {
        return Array(count + 1).join(character)
      }

      function cleanAttribute (attribute) {
        return attribute ? attribute.replace(/(\n+\s*)+/g, '\n') : ''
      }

      var rules = {};

      rules.paragraph = {
        filter: 'p',

        replacement: function (content) {
          return '\n\n' + content + '\n\n'
        }
      };

      rules.lineBreak = {
        filter: 'br',

        replacement: function (content, node, options) {
          return options.br + '\n'
        }
      };

      rules.heading = {
        filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

        replacement: function (content, node, options) {
          var hLevel = Number(node.nodeName.charAt(1));

          if (options.headingStyle === 'setext' && hLevel < 3) {
            var underline = repeat((hLevel === 1 ? '=' : '-'), content.length);
            return (
                    '\n\n' + content + '\n' + underline + '\n\n'
            )
          } else {
            return '\n\n' + repeat('#', hLevel) + ' ' + content + '\n\n'
          }
        }
      };

      rules.blockquote = {
        filter: 'blockquote',

        replacement: function (content) {
          content = content.replace(/^\n+|\n+$/g, '');
          content = content.replace(/^/gm, '> ');
          return '\n\n' + content + '\n\n'
        }
      };

      rules.list = {
        filter: ['ul', 'ol'],

        replacement: function (content, node) {
          var parent = node.parentNode;
          if (parent.nodeName === 'LI' && parent.lastElementChild === node) {
            return '\n' + content
          } else {
            return '\n\n' + content + '\n\n'
          }
        }
      };

      rules.listItem = {
        filter: 'li',

        replacement: function (content, node, options) {
          content = content
                  .replace(/^\n+/, '') // remove leading newlines
                  .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
                  .replace(/\n/gm, '\n    '); // indent
          var prefix = options.bulletListMarker + '   ';
          var parent = node.parentNode;
          if (parent.nodeName === 'OL') {
            var start = parent.getAttribute('start');
            var index = Array.prototype.indexOf.call(parent.children, node);
            prefix = (start ? Number(start) + index : index + 1) + '.  ';
          }
          return (
                  prefix + content + (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
          )
        }
      };

      rules.indentedCodeBlock = {
        filter: function (node, options) {
          return (
                  options.codeBlockStyle === 'indented' &&
                  node.nodeName === 'PRE' &&
                  node.firstChild &&
                  node.firstChild.nodeName === 'CODE'
          )
        },

        replacement: function (content, node) {
          return (
                  '\n\n    ' +
                  node.firstChild.textContent.replace(/\n/g, '\n    ') +
                  '\n\n'
          )
        }
      };

      rules.fencedCodeBlock = {
        filter: function (node, options) {
          return (
                  options.codeBlockStyle === 'fenced' &&
                  node.nodeName === 'PRE' &&
                  node.firstChild &&
                  node.firstChild.nodeName === 'CODE'
          )
        },

        replacement: function (content, node, options) {
          var className = node.firstChild.getAttribute('class') || '';
          var language = (className.match(/language-(\S+)/) || [null, ''])[1];
          var code = node.firstChild.textContent;

          var fenceChar = options.fence.charAt(0);
          var fenceSize = 3;
          var fenceInCodeRegex = new RegExp('^' + fenceChar + '{3,}', 'gm');

          var match;
          while ((match = fenceInCodeRegex.exec(code))) {
            if (match[0].length >= fenceSize) {
              fenceSize = match[0].length + 1;
            }
          }

          var fence = repeat(fenceChar, fenceSize);

          return (
                  '\n\n' + fence + language + '\n' +
                  code.replace(/\n$/, '') +
                  '\n' + fence + '\n\n'
          )
        }
      };

      rules.horizontalRule = {
        filter: 'hr',

        replacement: function (content, node, options) {
          return '\n\n' + options.hr + '\n\n'
        }
      };

      rules.inlineLink = {
        filter: function (node, options) {
          return (
                  options.linkStyle === 'inlined' &&
                  node.nodeName === 'A' &&
                  node.getAttribute('href')
          )
        },

        replacement: function (content, node) {
          var href = node.getAttribute('href');
          var title = cleanAttribute(node.getAttribute('title'));
          if (title) title = ' "' + title + '"';
          return '[' + content + '](' + href + title + ')'
        }
      };

      rules.referenceLink = {
        filter: function (node, options) {
          return (
                  options.linkStyle === 'referenced' &&
                  node.nodeName === 'A' &&
                  node.getAttribute('href')
          )
        },

        replacement: function (content, node, options) {
          var href = node.getAttribute('href');
          var title = cleanAttribute(node.getAttribute('title'));
          if (title) title = ' "' + title + '"';
          var replacement;
          var reference;

          switch (options.linkReferenceStyle) {
            case 'collapsed':
              replacement = '[' + content + '][]';
              reference = '[' + content + ']: ' + href + title;
              break
            case 'shortcut':
              replacement = '[' + content + ']';
              reference = '[' + content + ']: ' + href + title;
              break
            default:
              var id = this.references.length + 1;
              replacement = '[' + content + '][' + id + ']';
              reference = '[' + id + ']: ' + href + title;
          }

          this.references.push(reference);
          return replacement
        },

        references: [],

        append: function () {
          var references = '';
          if (this.references.length) {
            references = '\n\n' + this.references.join('\n') + '\n\n';
            this.references = []; // Reset references
          }
          return references
        }
      };

      rules.emphasis = {
        filter: ['em', 'i'],

        replacement: function (content, node, options) {
          if (!content.trim()) return ''
          return options.emDelimiter + content + options.emDelimiter
        }
      };

      rules.strong = {
        filter: ['strong', 'b'],

        replacement: function (content, node, options) {
          if (!content.trim()) return ''
          return options.strongDelimiter + content + options.strongDelimiter
        }
      };

      rules.code = {
        filter: function (node) {
          var hasSiblings = node.previousSibling || node.nextSibling;
          var isCodeBlock = node.parentNode.nodeName === 'PRE' && !hasSiblings;

          return node.nodeName === 'CODE' && !isCodeBlock
        },

        replacement: function (content) {
          if (!content.trim()) return ''

          var delimiter = '`';
          var leadingSpace = '';
          var trailingSpace = '';
          var matches = content.match(/`+/gm);
          if (matches) {
            if (/^`/.test(content)) leadingSpace = ' ';
            if (/`$/.test(content)) trailingSpace = ' ';
            while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + '`';
          }

          return delimiter + leadingSpace + content + trailingSpace + delimiter
        }
      };

      rules.image = {
        filter: 'img',

        replacement: function (content, node) {
          var alt = cleanAttribute(node.getAttribute('alt'));
          var src = node.getAttribute('src') || '';
          var title = cleanAttribute(node.getAttribute('title'));
          var titlePart = title ? ' "' + title + '"' : '';
          return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : ''
        }
      };

      // create an instance of Turndown service
      const turndownService = new TurndownService({
        rules: rules,
        headingStyle: 'setext',
        hr: '* * *',
        bulletListMarker: '*',
        codeBlockStyle: 'indented',
        fence: '```',
        emDelimiter: '_',
        strongDelimiter: '**',
        linkStyle: 'inlined',
        linkReferenceStyle: 'full',
        br: '',
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
      return turndownService.turndown(htmlString)
    }
  }
}
</script>

<style scoped>

</style>

<style>
.inline .v-btn.blue--text {
  display: none;
}
</style>
