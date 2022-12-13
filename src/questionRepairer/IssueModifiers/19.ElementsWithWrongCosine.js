import ModifiersSupplement from '../ModifiersSupplement.js'

class ElementsWithWrongCosine extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: /(\\cos\w*)/gms,
      updateNeeded: false,
      flagName: 'ElementsWithWrongCosine'
    })
  }

  // convertorBaseMethod (input) {
  //   const regex = this.regex
  //   return input.replaceAll(regex, (result) => {
  //     const char = result.replace('\\cos', '')
  //     return '\\cos ' + char
  //   })
  // }
}
export default ElementsWithWrongCosine
