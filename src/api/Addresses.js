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
    edit (userId) { return authServer + '/user/' + userId },
    mobile: {
      resend: authServer + '/mobile/resend',
      verify: authServer + '/mobile/verify'
    },
    formData: authServer + '/megaroute/getUserFormData',
    show_user: authServer + '/getUserFor3a',
    orders: {
      status: lumenServer + '/payment/status',
      userOrders: lumenServer + '/orders'
    },
    statistics: lumenServer + 'user/dashboard/statistics',
    feature: (feature) => lumenServer + '/user/feature?feature=' + feature
  },
  set: {
    base: authServer + '/set'
  },
  content: {
    base: authServer + '/c'
  },
  option: {
    base: lumenServer + '/option',
    userIndex: lumenServer + '/option/user?type=question_report_type',
    user(type) { return lumenServer + '/option/user?type=' + type }
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
    questionReport: {
      show: lumenServer + '/option/',
      edit: lumenServer + '/option',
      create: lumenServer + '/option',
      index: lumenServer + '/option?type=question_report_type&with_pagination=true'
    },
    questionTarget: {
      show: lumenServer + '/option/',
      edit: lumenServer + '/option',
      create: lumenServer + '/option',
      index: lumenServer + '/option?type=targets_type&with_pagination=true'
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
    userExamList: {
      base () {
        return lumenServer + '/examAndUser'
      },
      upcomingExams(start) {
        return lumenServer + '/examAndUser' + '?start_at_from=' + start
      },
      myExams(designerType = 'personal') {
        const route = '?designer_type=' + designerType
        return lumenServer + '/examAndUser' + route
      }

    },
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
    participate: {
      sample: (examId) => lumenServer + '/exam-user/' + examId,
      personal: (examId) => lumenServer + '/exam-user/personal/' + examId
    },
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
    },
    user: {
      draft () { return lumenServer + '/exam/user/draft' },
      reportType: lumenServer + '/option/user?type=question_report_type',
      report(questionId) { return lumenServer + '/question/report/store/' + questionId },
      attach: lumenServer + '/exam-question/user/attach/v3',
      detach(questionId) { return lumenServer + '/exam-question/user/detach/' + questionId },
      updateOrders(examId) {
        return lumenServer + '/exam-question/user/replace-questions/' + examId
      },
      detachBulk(examId) {
        return lumenServer + '/exam-question/user/detach/bulk/' + examId
      },
      draftExam: {
        create: lumenServer + '/exam/user',
        update: (examId) => lumenServer + '/exam/user/' + examId,
        getAttachedQuestions: (examId) => lumenServer + '/exam-question/user/attach/show/' + examId,
        bulkAttachQuestions: (examId) => lumenServer + '/exam-question/user/attach/bulk/' + examId,
        bulkDetachQuestions: (examId) => lumenServer + '/exam-question/user/detach/bulk/' + examId,
        replaceQuestions: (examId) => lumenServer + '/exam-question/user/replace-questions/' + examId
      }
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
      let newFilter = (filters) ? JSON.parse(JSON.stringify(filters)) : {}
      function setQueryParams (paramKey, singleMode = false) {
        if (!newFilter) {
          newFilter = {}
        }
        newFilter[paramKey] = (typeof newFilter[paramKey] !== 'undefined') ? newFilter[paramKey] : []
        if (!singleMode) {
          newFilter[paramKey] = newFilter[paramKey].join('&' + paramKey + '[]=')
          if (newFilter[paramKey]) {
            newFilter[paramKey] = '&' + paramKey + '[]=' + newFilter[paramKey]
          }
        } else {
          if (newFilter[paramKey]) {
            newFilter[paramKey] = '&' + paramKey + '=' + newFilter[paramKey]
          }
        }
      }
      setQueryParams('statuses')
      setQueryParams('years')
      setQueryParams('majors')
      setQueryParams('reference')
      setQueryParams('tags')
      setQueryParams('level')
      setQueryParams('statement', true)
      setQueryParams('sort_by', true)
      setQueryParams('sort_type', true)

      if (typeof page !== 'undefined') {
        page = '&page=' + page
      } else {
        page = ''
      }

      let queryParam = page
      // const examQuesry = '&exam=0'
      // queryParam += examQuesry
      Object.keys(newFilter).forEach(filterKey => {
        queryParam += newFilter[filterKey]
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
    printQuestions: lumenServer + '/question/export',
    report(questionId) {
      return lumenServer + 'question/report/store/' + questionId
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
  product: {
    landing: {
      sea: {
        all: authServer + '/product/soalaa/all'
      }
    },

    edit: {
      base: apiV2Server + '/admin/product'
    },
    index: {
      base: apiV2Server + '/admin/product'
    },
    show: {
      base: apiV2Server + '/product'
    }
  },
  cart: {
    orderproduct: {
      add: apiV2Server + '/orderproduct',
      delete (productId) { return apiV2Server + '/orderproduct/' + productId }
    },
    review: apiV2Server + '/checkout/review?seller=2',
    getPaymentRedirectEncryptedLink: apiV2Server + '/getPaymentRedirectEncryptedLink?seller=2',
    orderWithTransaction (orderId) { return apiV2Server + '/orderWithTransaction/' + orderId }
  },
  subscription: {
    landing: lumenServer + '/subscribe/landing',
    list: lumenServer + '/subscribe/user',
    last: lumenServer + '/subscribe/user/last',
    register: (userId) => lumenServer + `/subscribe/user/${userId}`
  },
  homePage: {
    base: lumenServer + '/homepage'
  },
  ticket: {
    create: {
      base: authServer + '/ticket'
    },
    index: {
      base: authServer + '/ticket'
    },
    show: {
      base: authServer + '/ticket',
      statusNotice: (ticketId) =>
        authServer + '/ticket/' + ticketId + '/sendTicketStatusNotice',
      batchExtend: authServer + '/orderproduct/batchExtend',
      ticketMessage: authServer + '/ticketMessage',
      reportMessage: (ticketId) =>
        authServer + '/ticketMessage/' + ticketId + '/report'
    },
    ticketRate: (ticketId) => authServer + '/ticket/' + ticketId + '/rate'
  }
}
export default API_ADDRESS
