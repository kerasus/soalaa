import ModifiersSupplement from '../ModifiersSupplement.js'

class ElementsWithPrimeAndPower extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: /(\{\\prime}\^.)/gms,
      updateNeeded: true,
      flagName: 'ElementsWithPrimeAndPower'
    })
  }

  convertorBaseMethod (input) {
    const regex = this.regex
    return input.replaceAll(regex, (result) => {
      const char = result.replace('{\\prime}^', '')
      return '{\\prime' + char + '}'
    })
  }
}
export default ElementsWithPrimeAndPower
