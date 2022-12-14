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
        examId: '63998911875ae1a1bc0c157d',
        questions: [],
        isPending: false
      },
      {
        examName: 'ParagraphWithTwoDollarSigns',
        examId: '6399895893de5da8d50ecd90',
        questions: [],
        isPending: false
      },
      {
        examName: 'DataKatexElInTwoDollarSigns',
        examId: '6399897793de5da8d50ecdab',
        questions: [],
        isPending: false
      },
      {
        examName: 'OddNumberOfDollarSigns',
        examId: '6399899993de5da8d50ecdb6',
        questions: [],
        isPending: false
      },
      {
        examName: 'UnclosedFormulaBracket',
        examId: '63998a01a3fb042c6f0b3913',
        questions: [],
        isPending: false
      },
      {
        examName: 'NotCoddedInequalitySigns',
        examId: '63998a2ca3fb042c6f0b3924',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithPossibleLossOfPersianWordsCaretSymbol',
        examId: '63998a45a3fb042c6f0b3933',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithHtmlStyleTag',
        examId: '63998a69a3fb042c6f0b3960',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithTheOverlineTag',
        examId: '63998a8aa3fb042c6f0b39bb',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithUnderBraces',
        examId: '63998aa1a3fb042c6f0b39f3',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithPossibleLossOfPersianWordsBackslashSymbol',
        examId: '63998abcc8eea92242077213',
        questions: [],
        isPending: false
      },
      {
        examName: 'PossibilityOfTextLossForInequalitySigns',
        examId: '63998b07c8eea92242077262',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementsWithPrimeAndPower',
        examId: '63998b330c5f8d0b980c99bc',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementsWithWrongCombination',
        examId: '63998b71b0ab2ad22604e46d',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementsWithWrongSinus',
        examId: '63998b92b0ab2ad22604e48e',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithCurlyBrackets',
        examId: '63998bb78b517e5c5104d307',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementsWithWidehatTag',
        examId: '63998bd18b517e5c5104d32a',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementsWithWrongCosine',
        examId: '63998bea8b517e5c5104d340',
        questions: [],
        isPending: false
      },
      {
        examName: 'allFailedUpdateQuestions',
        examId: '63998c042fd9a747500f81b5',
        questions: [],
        isPending: false
      },
      {
        examName: 'ElementWithWrongTag',
        examId: '63998c292fd9a747500f81d7',
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
