import ModifiersSupplement from '../ModifiersSupplement.js'

class ElementsWithWrongSinus extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: /(\\sin\w*)/gms,
      updateNeeded: false,
      flagName: 'ElementsWithWrongSinus'
    })
  }

  // convertorBaseMethod (input) {
  //   const regex = this.regex
  //   return input.replaceAll(regex, (result) => {
  //     console.log('result', result)
  //     const char = result.replace('\\sin', '')
  //     return '\\sin ' + char
  //   })
  // }
}
export default ElementsWithWrongSinus
