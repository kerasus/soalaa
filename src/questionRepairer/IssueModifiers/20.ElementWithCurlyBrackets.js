import ModifiersSupplement from '../ModifiersSupplement.js'

class ElementWithCurlyBrackets extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: /(\\begin{array)|(\\end{array)/gms,
      updateNeeded: false,
      flagName: 'ElementWithCurlyBrackets'
    })
  }
}
export default ElementWithCurlyBrackets
