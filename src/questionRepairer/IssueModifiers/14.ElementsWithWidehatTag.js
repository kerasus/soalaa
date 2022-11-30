import ModifiersSupplement from '../ModifiersSupplement.js'

class ElementsWithWidehatTag extends ModifiersSupplement {
  constructor(question) {
    super({
      question,
      regex: /({\\widehat)(.*?)(\})/gms,
      updateNeeded: true,
      flagName: 'ElementsWithWidehatTag'
    })
  }

  convertorBaseMethod (input) {
    const regex = this.regex
    return input.replaceAll(regex, (result) => {
      const charUnderWidehat = result.replace('{\\widehat', '').replace('}', '')
      return '\\widehat{' + charUnderWidehat + '}'
    })
  }
}
export default ElementsWithWidehatTag
