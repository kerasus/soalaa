import APIRepository from '../classes/APIRepository'
import { appApiInstance } from 'src/boot/axios'
import { Exam, ExamList } from 'src/models/Exam.js'
import { QuestionList } from 'src/models/Question'

const APIAdresses = {
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
    base: '/examAndUser',
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
  examUserAfterExam: (examId) => 'exam-user?exam_id=' + examId,

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
    takhminRotbeExamList: '/exam-report/rank',
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
    draft: '/exam/user/draft',
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
}

export default class ExamAPI extends APIRepository {
  constructor() {
    super('exam', appApiInstance, '', '', APIAdresses)
    this.CacheList = {
      showExam: (examId) => this.APIAdresses.showExam(examId),
      takhminRotbeExamList: this.APIAdresses.report.takhminRotbeExamList
    }
  }

  userExamList(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          examList: new ExamList(response.data.data),
          meta: response.data.meta
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  myExams(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.userExamList.myExams(data.designerType),
      resolveCallback: (response) => {
        return {
          examList: new ExamList(response.data.data),
          meta: response.data.meta
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.params
    })
  }

  upcomingExams(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.userExamList.upcomingExams(data),
      resolveCallback: (response) => {
        return new ExamList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getAnswerOfUserWithCorrect(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getAnswerOfUserWithCorrect(data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  adminGetReport(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.report.adminGetReport,
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.params
    })
  }

  getReport(userExamId, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.report.getReport(userExamId),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  userReportType(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.user.reportType,
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  userReport(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.user.report(data.questionId),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.params
    })
  }

  getAllAnswerOfUser(userExamId, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getAllAnswerOfUser(userExamId),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  examUserAfterExam(userExamId, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.examUserAfterExam(userExamId),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  participate(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: data.personal ? this.APIAdresses.participate.personal(data.examId) : this.APIAdresses.participate.sample(data.examId),
      resolveCallback: (response) => {
        return response.data.data?.redirect_url
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  registerExam(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.registerExam,
      resolveCallback: (response) => {
        return response.data.data?.redirect_url
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  generateExamFile(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.generateExamFile(data.examId, data.withAnswer),
      cacheKey: this.CacheList.generateExamFile(data.examId, data.withAnswer),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response // String
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  sendAnswers(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.sendAnswers,
      resolveCallback: (response) => {
        return response // String
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  userDraftExamCreate(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.user.draftExam.create,
      resolveCallback: (response) => {
        return new Exam(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  userDraftExamUpdate(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.user.draftExam.update(data.examId),
      resolveCallback: (response) => {
        return new Exam(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  userDraftExamGetAttachedQuestions(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.user.draftExam.getAttachedQuestions(data),
      resolveCallback: (response) => {
        return new QuestionList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  userDraftExamBulkAttachQuestions(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.user.draftExam.bulkAttachQuestions(data.examId),
      resolveCallback: (response) => {
        return new Exam(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  userUpdateOrders(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.user.updateOrders(data.examId),
      resolveCallback: (response) => {
        return new Exam(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  userDetachBulk(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.user.detachBulk(data.examId),
      resolveCallback: (response) => {
        return new Exam(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  showExam(examId, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.showExam(examId),
      cacheKey: this.CacheList.showExam(examId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Exam(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  updateReportOptions(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.report.updateReportOptions(data.examId),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  takhminRotbeExamList(examId, cache = { TTL: 100 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.report.takhminRotbeExamList,
      cacheKey: this.CacheList.takhminRotbeExamList,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ExamList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
