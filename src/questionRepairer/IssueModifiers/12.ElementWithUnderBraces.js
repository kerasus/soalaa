import ModifiersSupplement from '../ModifiersSupplement.js'

class ElementWithUnderBraces extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: /\\underbrace/gms,
      updateNeeded: false,
      flagName: 'ElementWithUnderBraces'
    })
  }
}
export default ElementWithUnderBraces
