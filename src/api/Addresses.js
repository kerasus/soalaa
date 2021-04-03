const lumenServer = process.env.VUE_APP_LUMEN_INTERNAL_API_SERVER
// const lumenRabbitMQ = process.env.VUE_APP_LUMEN_RABBIT_MQ_API_SERVER
const authServer = process.env.VUE_APP_AUTH_INTERNAL_API_SERVER

const API_ADDRESS = {
  server: {
    lumen: lumenServer,
    auth: authServer
  },
  auth: {
    login: authServer + '/login'
  },
  user: {
    base: authServer + '/user',
    mobile: {
      resend: authServer + '/mobile/resend',
      verify: authServer + '/mobile/verify'
    },
    formData: authServer + '/megaroute/getUserFormData',
    show_user: authServer + '/getUserFor3a'
  },
  set: {
    base: authServer + '/set',
  },
  content: {
    base: authServer + '/c',
  },
  exam: {
    base: lumenServer + '/exam',
    sendAnswers: lumenServer + '/temp-exam/answer/choice',
    sendStatus: lumenServer + '/temp-exam/answer/status',
    sendBookmark: lumenServer + '/temp-exam/answer/bookmark',
    sendUnBookmark: lumenServer + '/temp-exam/answer/unbookmark',
    userExamsList: lumenServer + '/examAndUser',
    getAnswerOfUser (user_exam_id) {
      return lumenServer + '/temp-exam/answer/'+user_exam_id
    },
    getAnswerOfUserWithCorrect (user_exam_id) {
      return lumenServer + '/temp-exam/answer/'+user_exam_id+'/withCorrect'
    },
    registerExam: lumenServer + '/user/registerExam',
    examUser: lumenServer + '/exam-user',
    examQuestion (quizId) {
      return lumenServer + '/eam-question/attach/show/' + quizId
    },
    report: {
      getReport (examId) {
        return lumenServer + '/exam-report?exam_id=' + examId
      }
    }
  },
  question: {
    base: lumenServer + '/question',
    attachSubCategoryToQuestion: lumenServer + '/exam-question/attach/sub-category',
    updateQuestion (questionId) {
      return lumenServer + '/question/' + questionId
    },
    getCurrentQuestion (questionId) {
      return lumenServer + '/question/' + questionId
    }
  },
  questionSubcategory: {
    base: lumenServer + '/examCategories'
  }
}
export default API_ADDRESS
