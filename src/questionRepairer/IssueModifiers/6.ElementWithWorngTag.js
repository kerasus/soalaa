import ModifiersSupplement from '../ModifiersSupplement.js'

class ElementWithWrongTag extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: /\\hfill|\\scriptstyle/gms,
      updateNeeded: false,
      flagName: 'ElementWithWrongTag'
    })
  }
}
export default ElementWithWrongTag
