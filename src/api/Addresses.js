const lumenServer = process.env.AAA_API
const authServer = process.env.AUTH_API
const apiV2Server = process.env.AUTH_API
const timeServer = process.env.GET_TIME_SERVER
const socketServer = process.env.SOCKET_SERVER

const API_ADDRESS = {
  // socket: process.env.VUE_APP_SOCKET_TARGET_API_SERVER,
  socket: socketServer,
  pages: {
    base: '/setting',
    show: (key) => '/setting/show?key=' + key
  },
  server: {
    time: timeServer,
    lumen: lumenServer,
    auth: lumenServer
  },
  auth: {
    login: '/user/login'
  },
  user: {
    base: authServer + '/user',
    resendGuest: authServer + '/mobile/resendGuest',
    verifyMoshavereh: authServer + '/mobile/verifyMoshavereh',
    newsletter: authServer + '/newsletter',
    edit (userId) { return authServer + '/user/' + userId },
    updatePhoto() {
      return '/user/avatar'
    },
    mobile: {
      resend: authServer + '/mobile/resend',
      verify: authServer + '/mobile/verify'
    },
    formData: authServer + '/megaroute/getUserFormData',
    show_user: authServer + '/getUserFor3a',
    orders: {
      status: '/payment/status',
      userOrders: '/orders'
    },
    statistics: '/user/dashboard/statistics',
    feature: (feature) => '/user/feature?feature=' + feature
  },
  block: {
    home: authServer + '/home',
    shop: authServer + '/shop'
  },
  set: {
    base: authServer + '/set'
  },
  content: {
    admin: authServer + '/admin/c',
    adminGet: (id) => authServer + `/admin/c/${id}`,
    base: authServer + '/c',
    relatedProducts: (id) => authServer + '/c/' + id + '/products',
    get: (id) => authServer + `/c/${id}`
  },
  option: {
    base: '/option',
    userIndex: '/option/user',
    user(type) { return '/option/user?type=' + type }
  },
  log: {
    base: '/activity-log',
    addComment (id) {
      return '/activity-log/' + id + '/comment'
    }
  },
  entityCrud: {
    authorshipDates: {
      show: '/option/',
      edit: '/option',
      create: '/option',
      index: '/option?type=year_type&with_pagination=true'
    },
    questionAuthors: {
      show: '/option/',
      edit: '/option',
      create: '/option',
      index: '/option'
    },
    questionReport: {
      show: '/option/',
      edit: '/option',
      create: '/option',
      index: '/option?type=question_report_type&with_pagination=true'
    },
    questionTarget: {
      show: '/option/',
      edit: '/option',
      create: '/option',
      index: '/option?type=targets_type&with_pagination=true'
    },
    majors: {
      show: '/option/',
      edit: '/option',
      create: '/option',
      index: '/option?type=major_type&with_pagination=true'
    }
  },
  exam: {
    exportExcel: '/exam?excel_export=1',
    showExam: (examId) => '/exam/' + examId,
    editExam: '/exam',
    copyCoefficient: '/exam-question/zirgorooh/copy',
    sendAnswers: '/temp-exam/answer/choice',
    sendStatus: '/temp-exam/answer/status',
    sendBookmark: '/temp-exam/answer/bookmark',
    sendUnBookmark: '/temp-exam/answer/unbookmark',
    userExamsList: '/examAndUser',
    takhminRotbe: '/exam-report/rankSimulator',
    analysisVideo: '/exam-question/attach/sub-category',
    userExamList: {
      base () {
        return '/examAndUser'
      },
      upcomingExams(start) {
        return '/examAndUser' + '?start_at_from=' + start
      },
      myExams(designerType = 'personal') {
        const route = '?designer_type=' + designerType
        return '/examAndUser' + route
      }

    },
    getAnalysisVideo (examId) {
      return '/exam-question/videos/' + examId
    },
    examReportIndex (type) {
      return '/exam-report/index/' + type
    },
    pdf (examId) {
      return '/exam-question/booklet-file/' + examId
    },
    base (pageNumber) {
      if (pageNumber) {
        return '/exam?with_pagination=1&page=' + pageNumber
      } else {
        return '/exam'
      }
    },
    // todo : temporary, MUST BE DELETED
    baseProduction (pageNumber) {
      if (pageNumber) {
        return '/exam?with_pagination=1&page=' + pageNumber
      } else {
        return '/exam'
      }
    },
    generateExamFile (examId, withAnswer) {
      const baseFileRoute = '/exam-question/file/' + examId
      return withAnswer ? (baseFileRoute + '/with_answer') : baseFileRoute
    },
    getAnswerOfUser (userExamId) {
      return '/temp-exam/answer/' + userExamId
    },
    getAllAnswerOfUser (userExamId) {
      return '/temp-exam/allAnswer/' + userExamId
    },
    getSubCategoriesWithPermissions (examId) {
      return '/exam-question/show/sub-categories/' + examId
    },
    getAnswerOfUserWithCorrect (userExamId) {
      return '/temp-exam/answer/' + userExamId + '/withCorrect'
    },
    registerExam: '/user/registerExam',
    examUser: '/exam-user',
    participate: {
      sample: (examId) => '/exam-user/' + examId,
      personal: (examId) => '/exam-user/personal/' + examId
    },
    examQuestion (quizId, page = 1) {
      return '/exam-question/attach/show/' + quizId + '?page=' + page
    },
    report: {
      getReport (userExamId) {
        return '/exam-report/show?user_exam_id=' + userExamId
      },
      adminGetReport: '/exam-report/show/admin',
      updateReportOptions (examId) {
        return '/exam/config/' + examId
      }
    },
    examBookletUpload (examId) {
      return '/exam-question/booklet-file/' + examId
    },
    detachCategory: (examId, categoryId) => '/exam/detach/category/' + examId + '/' + categoryId,
    attachCategories: (examId) => '/exam/attach/category/' + examId,
    user: {
      draft () { return '/exam/user/draft' },
      reportType: '/option/user?type=question_report_type',
      report(questionId) { return '/question/report/store/' + questionId },
      attach: '/exam-question/user/attach/v3',
      detach(questionId) { return '/exam-question/user/detach/' + questionId },
      updateOrders(examId) {
        return '/exam-question/user/replace-questions/' + examId
      },
      detachBulk(examId) {
        return '/exam-question/user/detach/bulk/' + examId
      },
      draftExam: {
        create: '/exam/user',
        update: (examId) => '/exam/user/' + examId,
        getAttachedQuestions: (examId) => '/exam-question/user/attach/show/' + examId,
        bulkAttachQuestions: (examId) => '/exam-question/user/attach/bulk/' + examId,
        bulkDetachQuestions: (examId) => '/exam-question/user/detach/bulk/' + examId,
        replaceQuestions: (examId) => '/exam-question/user/replace-questions/' + examId
      },
      pdf: (examId) => `/exam/user/pdf/${examId}`,
      examInfo: (examId) => '/exam/user/' + examId,
      questionsWithAnswer: (examId) => `/exam-question/user/attach/show/${examId}`
    }
  },
  question: {
    photo (type, id) {
      return '/question/' + type + '/' + id
    },
    indexMonta: '/question/search-monta',
    bank: {
      page: (page) => '/exam-question/attach/show/6245afa20569e1374540cb88?page=' + page
    },
    index (filters, page, isAdmin = false) {
      let newFilter = (filters) ? JSON.parse(JSON.stringify(filters)) : {}
      function setQueryParams (paramKey, singleMode = false) {
        if (!newFilter) {
          newFilter = {}
        }
        const fillNewFilter = function (paramKey, sign) {
          if (typeof newFilter[paramKey] !== 'undefined' && newFilter[paramKey] !== '') {
            newFilter[paramKey] = '&' + paramKey + sign + newFilter[paramKey]
          }
        }

        if (singleMode) {
          fillNewFilter(paramKey, '=')
          return
        }

        newFilter[paramKey] = (typeof newFilter[paramKey] !== 'undefined') ? newFilter[paramKey] : []
        newFilter[paramKey] = newFilter[paramKey].join('&' + paramKey + '[]=')
        fillNewFilter(paramKey, '[]=')
      }

      const setQueryParamsKeys = [
        {
          key: 'statuses',
          singleMode: false
        },
        {
          key: 'years',
          singleMode: false
        },
        {
          key: 'majors',
          singleMode: false
        },
        {
          key: 'reference',
          singleMode: false
        },
        {
          key: 'tags',
          singleMode: false
        },
        {
          key: 'level',
          singleMode: false
        },
        {
          key: 'question_report_type',
          singleMode: false
        },
        {
          key: 'sort_by',
          singleMode: true
        },
        {
          key: 'report_status',
          singleMode: true
        },
        {
          key: 'sort_type',
          singleMode: true
        },
        {
          key: 'tags_with_childrens',
          singleMode: true
        }
      ]

      setQueryParamsKeys.forEach(item => {
        setQueryParams(item.key, item.singleMode)
      })

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
      if (isAdmin) {
        return '/question?' + queryParam
      } else {
        return '/question/bank/search?' + queryParam
      }
    },
    groupAttach: '/question/group/attach',
    status: {
      base: '/question/statuses',
      changeStatus (questionId) {
        return '/question/' + questionId + '/status'
      }
    },
    reportStatuses: '/question/report/statuses',
    levels: '/question/levels',
    log: {
      base (questionId, pagination) {
        if (!pagination) {
          pagination = 0
        }
        return '/activity-log?subject_id=' + questionId + '&subject=question&with_pagination=0'
      }
    },
    base: '/exam-question/attach',
    createAndAttach: () => '/attacexam-question/h/',
    create: '/question',
    attachSubCategoryToQuestion: '/exam-question/attach/sub-category',
    update (questionId) {
      return '/question/' + questionId
    },
    reportLog: (questionId) => '/question/report/' + questionId,
    show (questionId) {
      return '/question/' + questionId
    },
    attach: '/exam-question/attach/v2',
    detach (questionId) {
      return '/exam-question/detach/' + questionId
    },
    delete (questionId) {
      return '/question/' + questionId
    },
    getCurrentQuestion (questionId) {
      return '/question/' + questionId
    },
    confirm (questionId) {
      return '/question/confirm/' + questionId
    },
    unconfirm (questionId) {
      return '/question/unconfirm/' + questionId
    },
    uploadImage (questionId) {
      return '/question/upload/' + questionId
    },
    printQuestions: '/question/export',
    report(questionId) {
      return 'question/report/store/' + questionId
    }
  },
  questionSubcategory: {
    base: '/sub-category',
    update (id) {
      return '/sub-category/' + id
    },
    updateOrder: '/exam-question/update/order/sub-category'
  },
  questionCategory: {
    base: '/category',
    update (id) {
      return '/category/' + id
    }
  },
  subGroups: {
    base (examId) {
      return '/exam-question/zirgorooh/' + examId
    },
    all () {
      return '/option?with_pagination=0&type=zirgorooh_type'
    }
  },
  tree: {
    base: '/forrest/tree',
    getMultiType (types) {
      let treeAddress = authServer + '/forrest/tree?'
      types.forEach(element => {
        treeAddress = treeAddress + `multi-type[]=${element}&`
      })
      return treeAddress
    },
    getNodeById (nodeId) {
      return '/forrest/tree/' + nodeId
    },
    getNodeByType (nodeType) {
      return '/forrest/tree?type=' + nodeType
    },
    editNode (id) {
      return '/forrest/tree/' + id
    },
    getGradesList: '/forrest/tree?type=test',
    getLessonList(lessonId) {
      return '/forrest/tree/' + lessonId
    },
    getSubjectTagsTree: '/forrest/tree?type=subject_tags'
  },
  tags: {
    setTags (questionId) {
      return '/id/soalaQestion/' + questionId
    }
  },
  product: {
    landing: {
      sea: {
        all: authServer + '/product/soalaa/all'
      }
    },
    gifts: (id) => authServer + '/gift-products/' + id,
    sampleContent: (id) => authServer + '/product/' + id + '/sample',
    favored: (id) => authServer + '/product/' + id + '/favored',
    unfavored: (id) => authServer + '/product/' + id + '/unfavored',
    bulk: (productIds) => {
      const idParams = []
      productIds.forEach((productId, productIndex) => {
        idParams.push('ids' + '[' + productIndex + ']=' + productId)
      })
      const queryParams = idParams.join('&')
      return authServer + '/product?' + queryParams
    },

    edit: {
      base: apiV2Server + '/admin/product'
    },
    index: {
      base: apiV2Server + '/admin/product'
    },
    show: {
      base: authServer + '/product'
    }
  },
  cart: {
    orderproduct: {
      add: apiV2Server + '/orderproduct',
      delete (productId) { return apiV2Server + '/orderproduct/' + productId }
    },
    review: apiV2Server + '/checkout/review',
    getPaymentRedirectEncryptedLink: apiV2Server + '/getPaymentRedirectEncryptedLink?seller=2',
    orderWithTransaction (orderId) { return apiV2Server + '/orderWithTransaction/' + orderId }
  },
  subscription: {
    landing: '/subscribe/landing',
    list: '/subscribe/user',
    last: '/subscribe/user/last',
    register: (userId) => `/subscribe/user/${userId}`
  },
  homePage: {
    base: '/homepage'
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
