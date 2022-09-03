import process from 'process'
const lumenServer = process.env.AAA_API
const authServer = process.env.AUTH_API
const timeServer = process.env.GET_TIME_SERVER
const socketServer = process.env.SOCKET_SERVER
const apiV2Server = process.env.AUTH_API

const API_ADDRESS = {
  // socket: process.env.VUE_APP_SOCKET_TARGET_API_SERVER,
  socket: socketServer,
  server: {
    time: timeServer,
    lumen: lumenServer,
    auth: lumenServer
  },
  auth: {
    login: lumenServer + '/user/login'
  },
  user: {
    base: authServer + '/user',
    mobile: {
      resend: authServer + '/mobile/resend',
      verify: authServer + '/mobile/verify'
    },
    formData: authServer + '/megaroute/getUserFormData',
    show_user: authServer + '/getUserFor3a',
    getOrderList (id) {
      // return authServer + '/user/' + id + '/orders?seller=2'
      return authServer + '/user/' + id + '/orders?seller=1'
    }
  },
  set: {
    base: authServer + '/set'
  },
  content: {
    base: authServer + '/c'
  },
  option: {
    base: lumenServer + '/option'
  },
  log: {
    base: lumenServer + '/activity-log',
    addComment (id) {
      return lumenServer + '/activity-log/' + id + '/comment'
    }
  },
  entityCrud: {
    authorshipDates: {
      show: lumenServer + '/option/',
      edit: lumenServer + '/option',
      create: lumenServer + '/option',
      index: lumenServer + '/option?type=year_type&with_pagination=true'
    },
    questionAuthors: {
      show: lumenServer + '/option/',
      edit: lumenServer + '/option',
      create: lumenServer + '/option',
      index: lumenServer + '/option?type=reference_type&with_pagination=true'
    },
    majors: {
      show: lumenServer + '/option/',
      edit: lumenServer + '/option',
      create: lumenServer + '/option',
      index: lumenServer + '/option?type=major_type&with_pagination=true'
    }
  },
  exam: {
    exportExcel: lumenServer + '/exam?excel_export=1',
    showExam: (examId) => lumenServer + '/exam/' + examId,
    editExam: lumenServer + '/exam',
    copyCoefficient: lumenServer + '/exam-question/zirgorooh/copy',
    sendAnswers: lumenServer + '/temp-exam/answer/choice',
    sendStatus: lumenServer + '/temp-exam/answer/status',
    sendBookmark: lumenServer + '/temp-exam/answer/bookmark',
    sendUnBookmark: lumenServer + '/temp-exam/answer/unbookmark',
    userExamsList: lumenServer + '/examAndUser',
    takhminRotbe: lumenServer + '/exam-report/rankSimulator',
    analysisVideo: lumenServer + '/exam-question/attach/sub-category',
    getAnalysisVideo (examId) {
      return lumenServer + '/exam-question/videos/' + examId
    },
    examReportIndex (type) {
      return lumenServer + '/exam-report/index/' + type
    },
    pdf (examId) {
      return lumenServer + '/exam-question/booklet-file/' + examId
    },
    base (pageNumber) {
      if (pageNumber) {
        return lumenServer + '/exam?with_pagination=1&page=' + pageNumber
      } else {
        return lumenServer + '/exam'
      }
    },
    generateExamFile (examId, withAnswer) {
      const baseFileRoute = lumenServer + '/exam-question/file/' + examId
      return withAnswer ? (baseFileRoute + '/with_answer') : baseFileRoute
    },
    getAnswerOfUser (userExamId) {
      return lumenServer + '/temp-exam/answer/' + userExamId
    },
    getAllAnswerOfUser (userExamId) {
      return lumenServer + '/temp-exam/allAnswer/' + userExamId
    },
    getSubCategoriesWithPermissions (examId) {
      return lumenServer + '/exam-question/show/sub-categories/' + examId
    },
    getAnswerOfUserWithCorrect (userExamId) {
      return lumenServer + '/temp-exam/answer/' + userExamId + '/withCorrect'
    },
    registerExam: lumenServer + '/user/registerExam',
    examUser: lumenServer + '/exam-user',
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
    examBookletUpload (examId) {
      return lumenServer + '/exam-question/booklet-file/' + examId
    }
  },
  question: {
    photo (type, id) {
      return lumenServer + '/question/' + type + '/' + id
    },
    indexMonta: lumenServer + '/question/search-monta',
    bank: {
      page: (page) => lumenServer + '/exam-question/attach/show/6245afa20569e1374540cb88?page=' + page
    },
    index (filters, page) {
      function setQueryParams (paramKey) {
        if (!filters) {
          filters = {}
        }
        filters[paramKey] = (typeof filters[paramKey] !== 'undefined') ? filters[paramKey] : []
        filters[paramKey] = filters[paramKey].join('&' + paramKey + '[]=')
        if (filters[paramKey]) {
          filters[paramKey] = '&' + paramKey + '[]=' + filters[paramKey]
        }
      }
      setQueryParams('statuses')
      setQueryParams('years')
      setQueryParams('majors')
      setQueryParams('reference')
      setQueryParams('tags')
      setQueryParams('level')

      if (typeof page !== 'undefined') {
        page = '&page=' + page
      } else {
        page = ''
      }

      let queryParam = page
      // const examQuesry = '&exam=0'
      // queryParam += examQuesry
      Object.keys(filters).forEach(filterKey => {
        queryParam += filters[filterKey]
      })
      if (queryParam.length > 0) {
        queryParam = queryParam.substr(1)
      }
      return lumenServer + '/question?' + queryParam
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
        return lumenServer + '/activity-log?subject_id=' + questionId + '&subject=question&with_pagination=0'
      }
    },
    base: lumenServer + '/exam-question/attach',
    createAndAttach: () => lumenServer + '/attacexam-question/h/',
    create: lumenServer + '/question',
    attachSubCategoryToQuestion: lumenServer + '/exam-question/attach/sub-category',
    update (questionId) {
      return lumenServer + '/question/' + questionId
    },
    show (questionId) {
      return lumenServer + '/question/' + questionId
    },
    attach: lumenServer + '/exam-question/attach/v2',
    detach (questionId) {
      return lumenServer + '/exam-question/detach/' + questionId
    },
    delete (questionId) {
      return lumenServer + '/question/' + questionId
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
    },
    printQuestions: lumenServer + '/question/export'
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
  subGroups: {
    base (examId) {
      return lumenServer + '/exam-question/zirgorooh/' + examId
    },
    all () {
      return lumenServer + '/option?with_pagination=0&type=zirgorooh_type'
    }
  },
  tree: {
    base: lumenServer + '/forrest/tree',
    getNodeById (nodeId) {
      return lumenServer + '/forrest/tree/' + nodeId
    },
    getNodeByType (nodeType) {
      return lumenServer + '/forrest/tree?type=' + nodeType
    },
    editNode (id) {
      return lumenServer + '/forrest/tree/' + id
    }
  },
  tags: {
    setTags (questionId) {
      return lumenServer + '/id/soalaQestion/' + questionId
    }
  },
  cart: {
    orderproduct: {
      add: apiV2Server + '/orderproduct',
      delete (id) { return apiV2Server + '/orderproduct/' + id }
    },
    review: apiV2Server + '/checkout/review'
  }
}
export default API_ADDRESS
