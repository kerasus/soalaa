import ModifiersSupplement from '../ModifiersSupplement.js'

class ElementWithTheOverlineTag extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: /{\\char/gms,
      updateNeeded: false,
      flagName: 'ElementWithTheOverlineTag'
    })
  }
}
export default ElementWithTheOverlineTag
