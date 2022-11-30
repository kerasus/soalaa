import ModifiersSupplement from '../ModifiersSupplement.js'

class ElementsWithWrongCombination extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: /(\\left\( \\begin\{align})(.*?)(\\end{align} \\right\))/gms,
      updateNeeded: true,
      flagName: 'ElementsWithWrongCombination'
    })
  }

  convertorBaseMethod (input) {
    const regex = this.regex
    return input.replaceAll(regex, (result) => {
      const numberRegex = /\d+/g
      const arrayOfNumbers = result.match(numberRegex)
      return '{{' + arrayOfNumbers[0] + '\\choose ' + arrayOfNumbers[1] + '}}'
    })
  }
}
export default ElementsWithWrongCombination
