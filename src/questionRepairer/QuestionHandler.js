import QuestionModifier from 'src/questionRepairer/QuestionModifier'
// import API_ADDRESS from 'src/api/Addresses'
import { Notify } from 'quasar'
import { saveAs } from 'file-saver'
class QuestionHandler {
  constructor (arrayOfQuestions = [], axios) {
    this.arrayOfQuestions = arrayOfQuestions
    this.allQuestionsStatuses = [{
      questionId: '',
      isUpdateRequestPending: false
    }]
    this.allQuestionsRequestsAreFinished = []
    this.$axios = axios
    this.attachExamList = [
      {
        examName: 'EmptyFormulaElements',
        examId: '639713ed4121b90fa30ca76e',
        questions: [],
        isPending: false
      },
      {
        examName: 'ParagraphWithTwoDollarSigns',
        examId: '639713cdeb6a9f69ae079418',
        questions: [],
        isPending: false
      },
      {
        examName: 'DataKatexElInTwoDollarSigns',
        examId: '639713bc4121b90fa30ca75c',
        questions: [],
        isPending: false
      },
      {
        examName: 'OddNumberOfDollarSigns',
        examId: '6397139c4121b90fa30ca753',
        questions: [],
        isPending: false
      },
      {
        examName: 'UnclosedFormulaBracket',
        examId: '6397137d4121b90fa30ca747',
        questions: [],
        isPending: false
      },
      {
        examName: 'NotCoddedInequalitySigns',
        examId: '639713644121b90fa30ca737',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithPossibleLossOfPersianWordsCaretSymbol',
        examId: '6397134d4121b90fa30ca728',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithHtmlStyleTag',
        examId: '639713384121b90fa30ca717',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithTheOverlineTag',
        examId: '6397131d4121b90fa30ca705',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithUnderBraces',
        examId: '639713084121b90fa30ca6f2',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithPossibleLossOfPersianWordsBackslashSymbol',
        examId: '639712f04121b90fa30ca6de',
        questions: [],
        isPending: false
      },
      {
        examName: 'PossibilityOfTextLossForInequalitySigns',
        examId: '639712c64121b90fa30ca6ca',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementsWithPrimeAndPower',
        examId: '639712a84121b90fa30ca6b6',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementsWithWrongCombination',
        examId: '6397125d4121b90fa30ca69f',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementsWithWrongSinus',
        examId: '6397123b4121b90fa30ca689',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithCurlyBrackets',
        examId: '639712264121b90fa30ca672',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementsWithWidehatTag',
        examId: '639712074121b90fa30ca65a',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementsWithWrongCosine',
        examId: '639711ed4121b90fa30ca644',
        questions: [],
        isPending: false
      },
      {
        examName: 'allFailedUpdateQuestions',
        examId: '639711cf4121b90fa30ca629',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithWrongTag',
        examId: '639710a64121b90fa30ca608',
        questions: [],
        isPending: false
      }
    ]
    this.countOfUpdateRequest = 0
    this.arrayOfUpdateRequest = []
  }

  attachQuestionToExamRequest (attachExamObj) {
    if (!(attachExamObj.questions.length > 0)) {
      return new Promise((resolve, reject) => {
        resolve()
      })
    }
    // return this.$axios.post(API_ADDRESS.exam.bulkAttachQuestions(), {
    //   exam_id: attachExamObj.examId,
    //   questions: attachExamObj.questions.map((questionModifier, index) => {
    //     return {
    //       order: index + 1,
    //       sub_category_id: '60b7875428f350277f04c5e3',
    //       question_id: questionModifier.question.id
    //     }
    //   })
    // })
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  attachAllQuestionsToExams () {
    this.attachExamList.forEach(attachExamObj => {
      attachExamObj.isPending = true
      this.attachQuestionToExamRequest(attachExamObj)
        .then(() => {
          attachExamObj.status = true
          attachExamObj.isPending = false
          this.checkAllAttachRequestsAreFinished()
        })
        .catch(() => {
          attachExamObj.status = false
          attachExamObj.isPending = false
          this.checkAllAttachRequestsAreFinished()
        })
    })
  }

  updateQuestionRequestStatuses(questionId, status) {
    const indexQuestionStatus = this.allQuestionsStatuses.findIndex(obj => obj.questionId === questionId)
    this.allQuestionsStatuses[indexQuestionStatus] = {
      questionId,
      isUpdateRequestPending: status
    }
  }

  checkAllQuestionsRequestsAreFinished (modifiedQuestion) {
    const hasPendingQuestion = this.allQuestionsStatuses.find(obj => obj.isUpdateRequestPending)
    if (hasPendingQuestion) {
      return
    }
    this.attachAllQuestionsToExams()
  }

  initQuestionModifier (question) {
    const modifiedQuestion = new QuestionModifier(question, this.$axios)
    this.allQuestionsStatuses.push({
      questionId: question.id || question._id,
      isUpdateRequestPending: true
    })
    modifiedQuestion.inspectAllScenarios().updateIfNeeded()
      .then(() => {
        this.updateQuestionRequestStatuses(question.id, false)
        this.pushQuestionToExamAttachList(modifiedQuestion)
        this.checkAllQuestionsRequestsAreFinished(modifiedQuestion)
      })
      .catch(() => {
        this.updateQuestionRequestStatuses(question.id, false)
        this.pushQuestionToExamAttachList(modifiedQuestion)
        this.checkAllQuestionsRequestsAreFinished(modifiedQuestion)
      })
  }

  pushQuestionToExamAttachList (modifiedQuestion) {
    if (modifiedQuestion.updateFailed) {
      this.attachExamList[this.attachExamList.length - 1].questions.push(modifiedQuestion)
    }
    if (modifiedQuestion.questionsFlags.length > 0) {
      modifiedQuestion.questionsFlags.forEach(flag => {
        const indexOfExam = this.attachExamList.findIndex(attachExamObj => attachExamObj.examName === flag)
        this.attachExamList[indexOfExam].questions.push(modifiedQuestion)
      })
    }
  }

  checkAllAttachRequestsAreFinished () {
    const hasPendingExam = this.attachExamList.find(obj => obj.isPending)
    if (hasPendingExam) {
      return
    }
    const fileName = 'result.json'
    const fileToSave = new Blob([JSON.stringify(this.attachExamList)], {
      type: 'application/json'
    })
    saveAs(fileToSave, fileName)
    Notify.create({
      type: 'positive',
      message: 'download file now',
      position: 'top'
    })
  }

  initHandler () {
    return new Promise((resolve, reject) => {
      this.arrayOfQuestions.forEach((question) => {
        this.initQuestionModifier(question)
      })
      resolve()
    })
  }

  run () {
    console.log('run')
    return new Promise((resolve, reject) => {
      this.initHandler().then((response) => {
        resolve(response)
      })
    })
  }
}
export default QuestionHandler
