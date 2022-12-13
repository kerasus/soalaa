import EmptyFormulaElements from './IssueModifiers/1.EmptyFormulaElements.js'
import ParagraphWithTwoDollarSigns from './IssueModifiers/2.ParagraphWithTwoDollarSigns.js'
import DataKatexElInTwoDollarSigns from './IssueModifiers/3.DataKatexElInTwoDollarSigns.js'
import OddNumberOfDollarSigns from './IssueModifiers/4.OddNumberOfDollarSigns.js'
import UnclosedFormulaBracket from './IssueModifiers/5.UnclosedFormulaBracket.js'
import ElementWithWrongTag from './IssueModifiers/6.ElementWithWorngTag.js'
import NotCoddedInequalitySigns from './IssueModifiers/9.NotCoddedInequalitySigns.js'
// todo
// import TextElWithDollarSign from "./IssueModifiers/10.TextElWithDollarSign.js";
import ElementWithPossibleLossOfPersianWordsCaretSymbol from './IssueModifiers/7.ElementWithPossibleLossOfPersianWordsCaretSymbol.js'
import ElementWithHtmlStyleTag from './IssueModifiers/8.ElementWithHtmlStyleTag.js'
import ElementWithTheOverlineTag from './IssueModifiers/11.ElementWithTheOverlineTag.js'
import ElementWithUnderBraces from './IssueModifiers/12.ElementWithUnderBraces.js'
import ElementWithPossibleLossOfPersianWordsBackslashSymbol from './IssueModifiers/13.ElementWithPossibleLossOfPersianWordsBackslashSymbol.js'
import PossibilityOfTextLossForInequalitySigns from './IssueModifiers/15.PossibilityOfTextLossForInequalitySigns.js'
import ElementsWithPrimeAndPower from './IssueModifiers/16.ElementsWithPrimeAndPower.js'
import ElementsWithWrongCombination from './IssueModifiers/17.ElementsWithWrongCombination.js'
import ElementsWithWrongSinus from './IssueModifiers/18.ElementsWithWrongSinus.js'
import ElementsWithWrongCosine from './IssueModifiers/19.ElementsWithWrongCosine.js'
import ElementWithCurlyBrackets from './IssueModifiers/20.ElementWithCurlyBrackets.js'
import ElementsWithWidehatTag from './IssueModifiers/14.ElementsWithWidehatTag.js'
import API_ADDRESS from 'src/api/Addresses'

class QuestionModifier {
  constructor (question = {}, axios) {
    this.updateNeeded = false
    this.updateFailed = true
    this.question = question
    this.questionsFlags = []
    this.$axios = axios
    this.timesAllowedToUpdateQuestion = 5
    this.timesQuestionHasBeenUpdated = 0
    if (question._id) {
      this.question.id = question._id
    }
    if (!question.type.type_id && (question.type.value === 'konkur' || question.type === 'konkur')) {
      this.question.type_id = '6225f4828044517f52500c04'
    }
    if (this.question.tags && this.question.tags.length > 0) {
      this.question.tags = this.question.tags.map(item => {
        if (item.id) {
          return item.id
        }
        return item
      })
    }
    if (this.question.designers && this.question.designers.length > 0) {
      this.question.designers = this.question.designers.map(item => {
        if (item.id) {
          return item.id
        }
        return item
      })
    }
    if (this.question.reference && this.question.reference.length > 0) {
      this.question.reference = this.question.reference.map(item => {
        if (item.id) {
          return item.id
        }
        return item
      })
    }
    if (this.question.years && this.question.years.length > 0) {
      this.question.years = this.question.years.map(item => {
        if (item.id) {
          return item.id
        }
        return item
      })
    }
    if (this.question.majors && this.question.majors.length > 0) {
      this.question.majors = this.question.majors.map(item => {
        if (item.id) {
          return item.id
        }
        return item
      })
    }
    if (this.question.targets && this.question.targets.length > 0) {
      this.question.targets = this.question.targets.map(item => {
        if (item.id) {
          return item.id
        }
        return item
      })
    }
  }

  flagQuestion (modifier) {
    this.questionsFlags.push(modifier.flag())
  }

  inspectAllScenarios () {
    this.inspectForEmptyFormulaElements()
      // .inspectForEmptyForParagraphWithTwoDollarSigns()
      .inspectForEmptyForDataKatexElInTwoDollarSigns()
      .inspectForEmptyForOddNumberOfDollarSigns()
      .inspectForEmptyForUnclosedFormulaBracket()
      .inspectForElementWithWrongTag()
      .inspectNotCoddedInequalitySigns()
      // .inspectForTextElWithDollarSign()
      .inspectForElementWithPossibleLossOfPersianWordsCaretSymbol()
      .inspectForElementWithHtmlStyleTag()
      .inspectForElementWithTheOverlineTag()
      .inspectForElementWithUnderBraces()
      .inspectForElementWithPossibleLossOfPersianWordsBackslashSymbol()
      .inspectForElementsWithWidehatTag()
      .inspectForPossibilityOfTextLossForInequalitySigns()
      .inspectForElementsWithPrimeAndPower()
      .inspectForElementsWithWrongCombination()
      .inspectForElementsWithWrongSinus()
      .inspectForElementsWithWrongCosine()
      .inspectForElementWithCurlyBrackets()
    if (this.questionsFlags.length > 0) {
      window.countOfFlags++
    }
    return this
  }

  inspectScenarioBaseMethod (modifier) {
    if (!modifier.questionDetector()) {
      return this
    }
    this.question = modifier.questionConvertor()
    this.flagQuestion(modifier)
    if (modifier.needUpdate()) {
      this.updateNeeded = true
    }
    return this
  }

  inspectForEmptyFormulaElements () {
    this.inspectScenarioBaseMethod(new EmptyFormulaElements(this.question))
    return this
  }

  inspectForEmptyForParagraphWithTwoDollarSigns () {
    const modifier = new ParagraphWithTwoDollarSigns(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForEmptyForDataKatexElInTwoDollarSigns () {
    const modifier = new DataKatexElInTwoDollarSigns(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForEmptyForOddNumberOfDollarSigns () {
    const modifier = new OddNumberOfDollarSigns(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForEmptyForUnclosedFormulaBracket () {
    const modifier = new UnclosedFormulaBracket(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForElementWithWrongTag () {
    const modifier = new ElementWithWrongTag(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectNotCoddedInequalitySigns () {
    const modifier = new NotCoddedInequalitySigns(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  // inspectForTextElWithDollarSign () {
  //   let modifier = new TextElWithDollarSign(this.question)
  //   this.inspectScenarioBaseMethod(modifier)
  //   return this
  // }
  inspectForElementWithPossibleLossOfPersianWordsCaretSymbol () {
    const modifier = new ElementWithPossibleLossOfPersianWordsCaretSymbol(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForElementWithHtmlStyleTag () {
    const modifier = new ElementWithHtmlStyleTag(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForElementWithTheOverlineTag () {
    const modifier = new ElementWithTheOverlineTag(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForElementWithUnderBraces () {
    const modifier = new ElementWithUnderBraces(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForElementWithPossibleLossOfPersianWordsBackslashSymbol () {
    const modifier = new ElementWithPossibleLossOfPersianWordsBackslashSymbol(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForElementsWithWidehatTag () {
    const modifier = new ElementsWithWidehatTag(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForPossibilityOfTextLossForInequalitySigns () {
    const modifier = new PossibilityOfTextLossForInequalitySigns(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForElementsWithPrimeAndPower () {
    const modifier = new ElementsWithPrimeAndPower(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForElementsWithWrongCombination () {
    const modifier = new ElementsWithWrongCombination(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForElementsWithWrongSinus () {
    const modifier = new ElementsWithWrongSinus(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForElementsWithWrongCosine () {
    const modifier = new ElementsWithWrongCosine(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  inspectForElementWithCurlyBrackets () {
    const modifier = new ElementWithCurlyBrackets(this.question)
    this.inspectScenarioBaseMethod(modifier)
    return this
  }

  updateQuestion () {
    if (this.timesQuestionHasBeenUpdated === this.timesAllowedToUpdateQuestion) {
      return
    }
    return new Promise((resolve, reject) => {
      window.countOfUR++
      this.$axios.put(API_ADDRESS.question.update(this.question.id), this.question)
        .then((response) => {
          this.timesQuestionHasBeenUpdated++
          this.updateFailed = false
          resolve(response)
        })
        .catch((err) => {
          this.timesQuestionHasBeenUpdated++
          this.updateFailed = true
          if (this.timesQuestionHasBeenUpdated === this.timesAllowedToUpdateQuestion) {
            reject(err)
          }
          resolve(this.updateQuestion())
        })
    })
  }

  updateIfNeeded () {
    if (!this.updateNeeded) {
      this.updateFailed = false
      return new Promise((resolve) => {
        resolve()
      })
    }
    return this.updateQuestion()
  }
}
export default QuestionModifier
