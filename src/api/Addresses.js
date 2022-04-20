const lumenServer = process.env.VUE_APP_LUMEN_INTERNAL_API_SERVER
const authServer = process.env.VUE_APP_AUTH_INTERNAL_API_SERVER

const API_ADDRESS = {
  socket: process.env.VUE_APP_SOCKET_TARGET_API_SERVER,
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
  option: {
    base: lumenServer + '/option'
  },
  exam: {
    exportExcel: lumenServer + '/exam?excel_export=1',
    showExam: (examId) => lumenServer + '/exam/' + examId,
    editExam: lumenServer + '/exam',
    copyCoefficient: lumenServer + '/exam-question/zirgorooh/copy',
    sendAnswers: lumenServer + '/temp-exam/answer/choice',
    sendAnswerSheetPhoto: lumenServer + '/temp-exam/scan',
    sendScannedAnswers: lumenServer + '/temp-exam/scan/import',
    sendAnswersAfterExam: lumenServer + '/temp-exam/answer/choice/v2',
    sendStatus: lumenServer + '/temp-exam/answer/status',
    sendBookmark: lumenServer + '/temp-exam/answer/bookmark',
    sendUnBookmark: lumenServer + '/temp-exam/answer/unbookmark',
    userExamsList: lumenServer + '/examAndUser',
    takhminRotbe: lumenServer + '/exam-report/rankSimulator',
    analysisVideo: lumenServer + '/exam-question/attach/sub-category',
    getAnalysisVideo (exam_id) { return lumenServer + '/exam-question/videos/' + exam_id },
    examReportIndex (type) { return lumenServer + '/exam-report/index/' + type },
    pdf (exam_id) { return lumenServer + '/exam-question/booklet-file/' +exam_id },
    base (page_number, pagination = true) {
      if (pagination) {
        if (page_number) {
          return lumenServer + '/exam?with_pagination=1&page=' + page_number
        } else {
          return lumenServer + '/exam'
        }
      } else {
        return lumenServer + '/exam?with_pagination=0'
      }
    },
    generateExamFile (exam_id, with_answer) {
      const baseFileRoute = lumenServer + '/exam-question/file/' + exam_id
      return with_answer ? (baseFileRoute + '/with_answer') : baseFileRoute
    },
    getAnswerOfUser (user_exam_id) {
      return lumenServer + '/temp-exam/answer/'+user_exam_id
    },
    getAllAnswerOfUser (user_exam_id) {
      return lumenServer + '/temp-exam/allAnswer/'+user_exam_id
    },
    getSubCategoriesWithPermissions (exam_id) {
      return lumenServer + '/exam-question/show/sub-categories/'+ exam_id
    },
    getAnswerOfUserWithCorrect (user_exam_id) {
      return lumenServer + '/temp-exam/answer/'+user_exam_id+'/withCorrect'
    },
    registerExam: lumenServer + '/user/registerExam',
    examUser: lumenServer + '/exam-user',
    examUserAfterExam: lumenServer + '/exam-user/show',
    examQuestion (quizId) {
      return lumenServer + '/exam-question/attach/show/' + quizId
    },
    report: {
      getReport (userExamId) {
        return lumenServer + '/exam-report/show?user_exam_id=' + userExamId
      },
      updateReportOptions (examId) {
        return lumenServer + '/exam/config/' + examId
      }
    },
    examBookletUpload (exam_id) {
      return lumenServer + '/exam-question/booklet-file/' + exam_id
    }
  },
  log: {
    base: lumenServer + '/activity-log',
    addComment (id) {
      return lumenServer + '/activity-log/' + id + '/comment'
    }
  },
  question: {
    indexMonta: lumenServer + '/question/search-monta',
    index (statuses, page) {
      statuses = statuses.join('&statuses[]=')
      if (statuses) {
        statuses = '&statuses[]=' + statuses
      }

      if (typeof page !== 'undefined') {
        page = '&page='+page
      } else {
        page = ''
      }
      let queryParam = statuses + page
      if (queryParam.length > 0) {
        queryParam = queryParam.substr(1)
      }
      return lumenServer + '/question?'+queryParam
    },
    status: {
      base: lumenServer + '/question/statuses',
      changeStatus (questionId) {
        return lumenServer + '/question/' + questionId + '/status'
      }
    },
    log: {
      base (questionId, pagination) {
        if (!pagination) {
          pagination = 0
        }
        return lumenServer + '/activity-log?subject_id='+questionId+'&subject=question&with_pagination=0'
      },
    },
    base: lumenServer + '/exam-question/attach',
    createAndAttach: () => lumenServer + '/exam-question/attach/' ,
    create: lumenServer + '/question',
    attachSubCategoryToQuestion: lumenServer + '/exam-question/attach/sub-category',
    updateQuestion (questionId) {
      return lumenServer + '/question/' + questionId
    },
    attach: lumenServer + '/exam-question/attach/v2',
    detach (questionId) {
      return lumenServer + '/exam-question/detach/'+questionId
    },
    delete (questionId) {
      return lumenServer + '/question/'+questionId
    },
    getCurrentQuestion (questionId) {
      return lumenServer + '/question/' + questionId
    },
    confirm (questionId) {
      return lumenServer + '/question/confirm/' + questionId
    },
    unconfirm (questionId) {
      return lumenServer + '/question/unconfirm/' + questionId
    },
    uploadImage (questionId) {
      return lumenServer + '/question/upload/' + questionId
    }
  },
  questionSubcategory: {
    base: lumenServer + '/sub-category',
    update (id) {
      return lumenServer + '/sub-category/' + id
    },
    updateOrder: lumenServer + '/exam-question/update/order/sub-category'
  },
  questionCategory: {
    base: lumenServer + '/category',
    update (id) {
      return lumenServer + '/category/' + id
    }
  },
  subGroups : {
    base (exam_id) {
      return lumenServer + '/exam-question/zirgorooh/' + exam_id
    },
    all () {
      return lumenServer + '/option?with_pagination=0&type=zirgorooh_type'
    }
  }
}
export default API_ADDRESS
