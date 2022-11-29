import ModifiersSupplement from '../ModifiersSupplement.js'

class ElementWithPossibleLossOfPersianWordsCaretSymbol extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: /\^\^\^/gms,
      updateNeeded: false,
      flagName: 'ElementWithPossibleLossOfPersianWordsCaretSymbol'
    })
  }
}
export default ElementWithPossibleLossOfPersianWordsCaretSymbol
