const alaaServer = '/alaa'
const alaaApiVersion = '/api/v2'
// const alaaServerWeb = '/web'
const aaaServer = '/3a'
const aaaApiVersion = '/api'
// const aaaServerRabitApi = '/rb/api'

const API_ADDRESS = {
  auth: {
    login: alaaServer + alaaApiVersion + '/login'
  },
  user: {
    base: alaaServer + alaaApiVersion + '/user',
    mobile: {
      resend: alaaServer + alaaApiVersion + '/mobile/resend',
      verify: alaaServer + alaaApiVersion + '/mobile/verify'
    },
    formData: alaaServer + alaaApiVersion + '/megaroute/getUserFormData',
    show_user: alaaServer + alaaApiVersion + '/getUserFor3a'
  },
  set: {
    base: alaaServer + alaaApiVersion + '/set',
  },
  content: {
    base: alaaServer + alaaApiVersion + '/c',
  },
  exam: {
    base: aaaServer + aaaApiVersion + '/exam',
    sendAnswersAndFinishExam: aaaServer + aaaApiVersion + '/temp-exam/answer/choice',
    userExamsList: aaaServer + aaaApiVersion + '/examAndUser',
    getAnswerOfUser (user_exam_id) {
      return aaaServer + aaaApiVersion + '/temp-exam/answer/'+user_exam_id
    },
    getAnswerOfUserWithCorrect (user_exam_id) {
      return aaaServer + aaaApiVersion + '/temp-exam/answer/'+user_exam_id+'/withCorrect'
    },
    registerExam: aaaServer + aaaApiVersion + '/user/registerExam',
    examUser: aaaServer + aaaApiVersion + '/exam-user'
  },
  question: {
    base: aaaServer + aaaApiVersion + '/question',
    attachSubCategoryToQuestion: aaaServer + aaaApiVersion + '/exam-question/attach/sub-category',
  }
}
export default API_ADDRESS
