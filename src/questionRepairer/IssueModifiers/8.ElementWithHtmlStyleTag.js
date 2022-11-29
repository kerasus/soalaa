import ModifiersSupplement from '../ModifiersSupplement.js'

class ElementWithHtmlStyleTag extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: /\\htmlStyle/gms,
      updateNeeded: false,
      flagName: 'ElementWithHtmlStyleTag'
    })
  }
}
export default ElementWithHtmlStyleTag
