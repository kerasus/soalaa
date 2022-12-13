class ModifiersSupplement {
  constructor (modifiersData) {
    this.updateNeeded = modifiersData.updateNeeded
    this.regex = modifiersData.regex
    this.question = modifiersData.question
    this.flagName = modifiersData.flagName
    this.questionConverted = false
    this.formulaRegex = /(\${2}((?!\$\$).)+?\${2})|(\${1}((?!\$).)+?\${1})|(\\\[.+?\\\])|(\[\\.+?\]\\)/gms
  }

  needUpdate () {
    return this.questionConverted && this.updateNeeded
  }

  textDetector (text) {
    if (!text) {
      return false
    }
    const matchedText = text.match(this.regex)
    return matchedText && matchedText.length > 0
  }

  textConvertor (text) {
    if (!this.textDetector(text) && !this.updateNeeded) {
      return text
    }
    return this.convertorBaseMethod(text)
  }

  convertorBaseMethod (text) {
    return text
  }

  questionDetector () {
    return this.textDetector(this.question.descriptive_answer) ||
      this.textDetector(this.question.statement) ||
      this.question.choices?.find(choice => this.textDetector(choice.title) === true)
  }

  questionConvertor () {
    this.question.descriptive_answer = this.textConvertor(this.question.descriptive_answer)
    this.question.statement = this.textConvertor(this.question.statement)
    this.question.choices = this.question.choices?.map(choice => {
      return {
        ...choice,
        title: this.textConvertor(choice.title)
      }
    })
    this.questionConverted = true
    return this.question
  }

  flag () {
    return this.flagName
  }
}
export default ModifiersSupplement
