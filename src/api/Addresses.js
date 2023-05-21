import process from 'process'
const lumenServer = process.env.AAA_API
const authServer = process.env.AUTH_API
const timeServer = process.env.GET_TIME_SERVER
const socketServer = process.env.SOCKET_SERVER
const apiV2Server = process.env.AUTH_API

const API_ADDRESS = {
  // socket: process.env.VUE_APP_SOCKET_TARGET_API_SERVER,
  socket: socketServer,
  pages: {
    base: lumenServer + '/setting',
    show: (key) => lumenServer + '/setting/show?key=' + key
  },
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
    resendGuest: authServer + '/mobile/resendGuest',
    verifyMoshavereh: authServer + '/mobile/verifyMoshavereh',
    newsletter: authServer + '/newsletter',
    edit (userId) { return authServer + '/user/' + userId },
    updatePhoto() {
      return lumenServer + '/user/avatar'
    },
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
    statistics: lumenServer + '/user/dashboard/statistics',
    feature: (feature) => lumenServer + '/user/feature?feature=' + feature
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
    base: lumenServer + '/option',
    userIndex: lumenServer + '/option/user',
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
      index: lumenServer + '/option'
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
    konkurTakhminRotbe (konkurId) {
      return lumenServer + '/exam-report/rank/' + konkurId
    },
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
    // todo : temporary, MUST BE DELETED
    baseProduction (pageNumber) {
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
    examQuestion (quizId, page = 1) {
      return lumenServer + '/exam-question/attach/show/' + quizId + '?page=' + page
    },
    report: {
      getReport (userExamId) {
        return lumenServer + '/exam-report/show?user_exam_id=' + userExamId
      },
      adminGetReport: lumenServer + '/exam-report/show/admin',
      takhminRotbeExamList: lumenServer + '/exam-report/rank',
      updateReportOptions (examId) {
        return lumenServer + '/exam/config/' + examId
      }
    },
    examBookletUpload (examId) {
      return lumenServer + '/exam-question/booklet-file/' + examId
    },
    detachCategory: (examId, categoryId) => lumenServer + '/exam/detach/category/' + examId + '/' + categoryId,
    attachCategories: (examId) => lumenServer + '/exam/attach/category/' + examId,
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
      },
      pdf: (examId) => lumenServer + `/exam/user/pdf/${examId}`,
      examInfo: (examId) => lumenServer + '/exam/user/' + examId,
      questionsWithAnswer: (examId) => lumenServer + `/exam-question/user/attach/show/${examId}`
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
          key: 'type_id',
          singleMode: true
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
        return lumenServer + '/question?' + queryParam
      } else {
        return lumenServer + '/question/bank/search?' + queryParam
      }
    },
    groupAttach: lumenServer + '/question/group/attach',
    status: {
      base: lumenServer + '/question/statuses',
      changeStatus (questionId) {
        return lumenServer + '/question/' + questionId + '/status'
      }
    },
    reportStatuses: lumenServer + '/question/report/statuses',
    levels: lumenServer + '/question/levels',
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
    reportLog: (questionId) => lumenServer + '/question/report/' + questionId,
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
    getMultiType (types) {
      let treeAddress = authServer + '/forrest/tree?'
      types.forEach(element => {
        treeAddress = treeAddress + `multi-type[]=${element}&`
      })
      return treeAddress
    },
    getNodeById (nodeId) {
      return lumenServer + '/forrest/tree/' + nodeId
    },
    getNodeByType (nodeType) {
      return lumenServer + '/forrest/tree?type=' + nodeType
    },
    editNode (id) {
      return lumenServer + '/forrest/tree/' + id
    },
    getGradesList: lumenServer + '/forrest/tree?type=test',
    getLessonList(lessonId) {
      return lumenServer + '/forrest/tree/' + lessonId
    },
    getSubjectTagsTree: lumenServer + '/forrest/tree?type=subject_tags'
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
    gifts: (id) => authServer + '/gift-products/' + id,
    sampleContent: (id) => authServer + '/product/' + id + '/sample',
    favored: (id) => authServer + '/product/' + id + '/favored',
    unfavored: (id) => authServer + '/product/' + id + '/unfavored',
    bulk: (productIds) => {
      const idParams = []
      productIds.forEach((productId, productIndex) => {
        idParams.push('ids' + '[' + productIndex + ']=' + productId)
      })
      const queryParams = idParams.join('&') + '&seller=2'
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
