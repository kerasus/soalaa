import ModifiersSupplement from '../ModifiersSupplement.js'

class ElementWithPossibleLossOfPersianWordsBackslashSymbol extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: /((\\,|\\, |\\\\,|\\\\, ){1,2}){2,}/gms,
      updateNeeded: false,
      flagName: 'ElementWithPossibleLossOfPersianWordsBackslashSymbol'
    })
  }
}
export default ElementWithPossibleLossOfPersianWordsBackslashSymbol
