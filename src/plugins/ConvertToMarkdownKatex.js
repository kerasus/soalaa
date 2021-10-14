import TurndownService from 'turndown/lib/turndown.browser.umd'
import md from '../plugins/Markdown'

function convertPoem (htmlString) {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = htmlString
  // var doc = new DOMParser().parseFromString(htmlString, "text/xml");
  // this.innerHTML = doc.innerHTML
  // let tables = doc.querySelectorAll('table')
  const tables = wrapper.querySelectorAll('table.layoutPoem')
  // let tables = this.$refs.table.querySelectorAll('table')
  tables.forEach((item) => {
    let markdownTable = ''
    const rows = item.querySelectorAll('tr')

    // table head
    rows.forEach(row => {
	  const poemCellLeft = row.querySelectorAll('td.poemCellLeft')[0]
	  const poemCellRight = row.querySelectorAll('td.poemCellRight')[0]
	  markdownTable += '::: beit ' + poemCellLeft.innerHTML.replace(/<br>/g, '') + '--*mesra*--' + poemCellRight.innerHTML.replace(/<br>/g, '') + ' \n' +
			  '::: \n'
    })

    const tableWrapper = document.createElement('div')
    tableWrapper.innerHTML = markdownTable

    item.outerHTML = tableWrapper.innerHTML
  })

  return wrapper.innerHTML
}
function convertTables (htmlString) {
  htmlString = convertPoem(htmlString)
  const wrapper = document.createElement('div')
  wrapper.innerHTML = htmlString
  // var doc = new DOMParser().parseFromString(htmlString, "text/xml");
  // this.innerHTML = doc.innerHTML
  // let tables = doc.querySelectorAll('table')
  const tables = wrapper.querySelectorAll('table')
  // let tables = this.$refs.table.querySelectorAll('table')
  tables.forEach(item => {
    let markdownTable = ''
    let headRows = []
    if (item.tHead) {
	  headRows = item.tHead.rows
	  // headRows = item.querySelectorAll('thead tr')
    } else if (item.querySelectorAll('tr th').length > 0) {
	  const rows = item.querySelectorAll('tr')
	  rows.forEach(row => {
        if (row.querySelectorAll('th').length > 0) {
		  headRows.push(row)
        }
	  })
	  // headRows = item.querySelectorAll('tr th')[0].parentNode.cells
    }
    const bodyRows = []
    // if (item.tBodies && item.tBodies[0]) {
    //   bodyRows = item.tBodies[0].rows
    //   // bodyRows = item.querySelectorAll('tbody tr')
    // } else
    if (item.querySelectorAll('tr td').length > 0) {
	  const rows = item.querySelectorAll('tr')
	  rows.forEach(row => {
        if (row.querySelectorAll('td').length > 0) {
		  bodyRows.push(row)
        }
	  })
	  // headRows = item.querySelectorAll('tr th')[0].parentNode.cells
    }

    // table head
    let maxTheadCellCount = 0
    headRows.forEach(row => {
	  let theadCellCount = 0
	  const cells = row.querySelectorAll('th')
	  cells.forEach(cell => {
        markdownTable += '|' + htmlToMarkdown(cell.innerHTML)
        theadCellCount++
	  })
	  if (theadCellCount > maxTheadCellCount) {
        maxTheadCellCount = theadCellCount
	  }
	  markdownTable += '|' + '<br>'
    })
    for (let i = 0; i < maxTheadCellCount; i++) {
	  markdownTable += '|:-------------:'
    }
    markdownTable += '|' + '<br>'
    // table body
    bodyRows.forEach(row => {
	  const cells = row.cells
	  cells.forEach(cell => {
        markdownTable += '|' + htmlToMarkdown(cell.innerHTML)
	  })
	  markdownTable += '|' + '<br>'
    })

    const tableWrapper = document.createElement('div')
    tableWrapper.innerHTML = markdownTable

    item.outerHTML = tableWrapper.innerHTML
  })

  return wrapper.innerHTML
}
function htmlToMarkdown (htmlString) {
  TurndownService.prototype.escape = function (string) {
    const escapes = [
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
	  ]
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
    ]
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

  const rules = {}

  rules.paragraph = {
    filter: 'p',

    replacement: function (content) {
	  return '\n\n' + content + '\n\n'
    }
  }

  rules.lineBreak = {
    filter: 'br',

    replacement: function (content, node, options) {
	  return options.br + '\n'
    }
  }

  rules.heading = {
    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

    replacement: function (content, node, options) {
	  const hLevel = Number(node.nodeName.charAt(1))

	  if (options.headingStyle === 'setext' && hLevel < 3) {
        const underline = repeat((hLevel === 1 ? '=' : '-'), content.length)
        return (
          '\n\n' + content + '\n' + underline + '\n\n'
        )
	  } else {
        return '\n\n' + repeat('#', hLevel) + ' ' + content + '\n\n'
	  }
    }
  }

  rules.blockquote = {
    filter: 'blockquote',

    replacement: function (content) {
	  content = content.replace(/^\n+|\n+$/g, '')
	  content = content.replace(/^/gm, '> ')
	  return '\n\n' + content + '\n\n'
    }
  }

  rules.list = {
    filter: ['ul', 'ol'],

    replacement: function (content, node) {
	  const parent = node.parentNode
	  if (parent.nodeName === 'LI' && parent.lastElementChild === node) {
        return '\n' + content
	  } else {
        return '\n\n' + content + '\n\n'
	  }
    }
  }

  rules.listItem = {
    filter: 'li',

    replacement: function (content, node, options) {
	  content = content
			  .replace(/^\n+/, '') // remove leading newlines
			  .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
			  .replace(/\n/gm, '\n    ') // indent
	  let prefix = options.bulletListMarker + '   '
	  const parent = node.parentNode
	  if (parent.nodeName === 'OL') {
        const start = parent.getAttribute('start')
        const index = Array.prototype.indexOf.call(parent.children, node)
        prefix = (start ? Number(start) + index : index + 1) + '.  '
	  }
	  return (
			  prefix + content + (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
	  )
    }
  }

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
  }

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
	  const className = node.firstChild.getAttribute('class') || ''
	  const language = (className.match(/language-(\S+)/) || [null, ''])[1]
	  const code = node.firstChild.textContent

	  const fenceChar = options.fence.charAt(0)
	  let fenceSize = 3
	  const fenceInCodeRegex = new RegExp('^' + fenceChar + '{3,}', 'gm')

	  let match
	  while ((match = fenceInCodeRegex.exec(code))) {
        if (match[0].length >= fenceSize) {
		  fenceSize = match[0].length + 1
        }
	  }

	  const fence = repeat(fenceChar, fenceSize)

	  return (
			  '\n\n' + fence + language + '\n' +
			  code.replace(/\n$/, '') +
			  '\n' + fence + '\n\n'
	  )
    }
  }

  rules.horizontalRule = {
    filter: 'hr',

    replacement: function (content, node, options) {
	  return '\n\n' + options.hr + '\n\n'
    }
  }

  rules.inlineLink = {
    filter: function (node, options) {
	  return (
			  options.linkStyle === 'inlined' &&
			  node.nodeName === 'A' &&
			  node.getAttribute('href')
	  )
    },

    replacement: function (content, node) {
	  const href = node.getAttribute('href')
	  let title = cleanAttribute(node.getAttribute('title'))
	  if (title) title = ' "' + title + '"'
	  return '[' + content + '](' + href + title + ')'
    }
  }

  rules.referenceLink = {
    filter: function (node, options) {
	  return (
			  options.linkStyle === 'referenced' &&
			  node.nodeName === 'A' &&
			  node.getAttribute('href')
	  )
    },

    replacement: function (content, node, options) {
	  const href = node.getAttribute('href')
	  let title = cleanAttribute(node.getAttribute('title'))
	  if (title) title = ' "' + title + '"'
	  let replacement
	  let reference

	  switch (options.linkReferenceStyle) {
        case 'collapsed':
		  replacement = '[' + content + '][]'
		  reference = '[' + content + ']: ' + href + title
		  break
        case 'shortcut':
		  replacement = '[' + content + ']'
		  reference = '[' + content + ']: ' + href + title
		  break
        default:
		  var id = this.references.length + 1
		  replacement = '[' + content + '][' + id + ']'
		  reference = '[' + id + ']: ' + href + title
	  }

	  this.references.push(reference)
	  return replacement
    },

    references: [],

    append: function () {
	  let references = ''
	  if (this.references.length) {
        references = '\n\n' + this.references.join('\n') + '\n\n'
        this.references = [] // Reset references
	  }
	  return references
    }
  }

  rules.emphasis = {
    filter: ['em', 'i'],

    replacement: function (content, node, options) {
	  if (!content.trim()) return ''
	  return options.emDelimiter + content + options.emDelimiter
    }
  }

  rules.strong = {
    filter: ['strong', 'b'],

    replacement: function (content, node, options) {
	  if (!content.trim()) return ''
	  return options.strongDelimiter + content + options.strongDelimiter
    }
  }

  rules.code = {
    filter: function (node) {
	  const hasSiblings = node.previousSibling || node.nextSibling
	  const isCodeBlock = node.parentNode.nodeName === 'PRE' && !hasSiblings

	  return node.nodeName === 'CODE' && !isCodeBlock
    },

    replacement: function (content) {
	  if (!content.trim()) return ''

	  let delimiter = '`'
	  let leadingSpace = ''
	  let trailingSpace = ''
	  const matches = content.match(/`+/gm)
	  if (matches) {
        if (/^`/.test(content)) leadingSpace = ' '
        if (/`$/.test(content)) trailingSpace = ' '
        while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + '`'
	  }

	  return delimiter + leadingSpace + content + trailingSpace + delimiter
    }
  }

  rules.image = {
    filter: 'img',

    replacement: function (content, node) {
	  const alt = cleanAttribute(node.getAttribute('alt'))
	  const src = node.getAttribute('src') || ''
	  const title = cleanAttribute(node.getAttribute('title'))
	  const titlePart = title ? ' "' + title + '"' : ''
	  return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : ''
    }
  }

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
function convertToMarkdownKatex (string) {
  if (!string) {
    return string
  }
  // string = convertTables(string)
  // string = string.replace(/\n/g,'<br>')
  // const markdown = htmlToMarkdown(string)
  const markdown = string

  return md.render(markdown, { strict: false })
}

export default convertToMarkdownKatex
