import QuestionModifier from 'src/questionRepairer/QuestionModifier'

class QuestionHandler {
  constructor (arrayOfQuestions = []) {
    this.arrayOfQuestions = arrayOfQuestions
    this.allModifiedQuestions = []
  }

  run () {
    for (let i = 0; i < 5; i++) {
      const modifiedQuestion = new QuestionModifier(this.arrayOfQuestions[i])
      modifiedQuestion.inspectAllScenarios().updateIfNeeded()
      this.allModifiedQuestions.push(modifiedQuestion)
    }
    console.log('this.allModifiedQuestions', this.allModifiedQuestions)
    // this.arrayOfQuestions.forEach(question => {
    //   const modifiedQuestion = new QuestionModifier(question)
    //   modifiedQuestion.inspectAllScenarios().updateIfNeeded()
    //   this.allModifiedQuestions.push(modifiedQuestion)
    // })
  }
}
export default QuestionHandler
