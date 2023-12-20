import { appApiInstance } from 'src/boot/axios.js'
import { Exam, ExamList } from 'src/models/Exam.js'
import { QuestionList } from 'src/models/Question.js'
import APIRepository from '../classes/APIRepository.js'
import { UserExamData } from 'src/models/UserExamData.js'
import { QuestCategoryList } from 'src/models/QuestCategory.js'
import { UserAnswersOfExam } from 'src/models/UserAnswersOfExam.js'

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
  konkurTakhminRotbe(konkurId) {
    return '/exam-report/rank/' + konkurId
  },
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
  getAnalysisVideo(examId) {
    return '/exam-question/videos/' + examId
  },
  examReportIndex(type, next = '') {
    return '/exam-report/index/' + type + next
  },
  pdf(examId) {
    return '/exam-question/booklet-file/' + examId
  },
  base(pageNumber) {
    if (pageNumber) {
      return '/exam?with_pagination=1&page=' + pageNumber
    } else {
      return '/exam'
    }
  },
  // todo : temporary, MUST BE DELETED
  baseProduction(pageNumber) {
    if (pageNumber) {
      return '/exam?with_pagination=1&page=' + pageNumber
    } else {
      return '/exam'
    }
  },
  generateExamFile(examId, withAnswer) {
    const baseFileRoute = '/exam-question/file/' + examId
    return withAnswer ? (baseFileRoute + '/with_answer') : baseFileRoute
  },
  getAnswerOfUser(userExamId) {
    return '/temp-exam/answer/' + userExamId
  },
  getAllAnswerOfUser(userExamId) {
    return '/temp-exam/allAnswer/' + userExamId
  },
  getSubCategoriesWithPermissions(examId) {
    return '/exam-question/show/sub-categories/' + examId
  },
  getAnswerOfUserWithCorrect(userExamId) {
    return '/temp-exam/answer/' + userExamId + '/withCorrect'
  },
  registerExam: '/user/registerExam',
  examUser: '/exam-user',
  examUserAfterExam: (examId) => 'exam-user?exam_id=' + examId,

  participate: {
    sample: (examId) => '/exam-user/' + examId,
    personal: (examId) => '/exam-user/personal/' + examId
  },
  examQuestion(quizId, page = 1) {
    return '/exam-question/attach/show/' + quizId + '?page=' + page
  },
  report: {
    getReport(userExamId) {
      return '/exam-report/show?user_exam_id=' + userExamId
    },
    adminGetReport: '/exam-report/show/admin',
    takhminRotbeExamList: '/exam-report/rank',
    updateReportOptions(examId) {
      return '/exam/config/' + examId
    }
  },
  examBookletUpload(examId) {
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
  },
  subGroups: {
    base(examId) {
      return '/exam-question/zirgorooh/' + examId
    },
    all() {
      return '/option?with_pagination=0&type=zirgorooh_type'
    }
  }
}

export default class ExamAPI extends APIRepository {
  constructor() {
    super('exam', appApiInstance, '', '', APIAdresses)
    this.CacheList = {
      base: (pageNumber) => this.name + this.APIAdresses.base(pageNumber),
      showExam: (examId) => this.name + this.APIAdresses.showExam(examId),
      getAllAnswerOfUser: (examId) => this.name + this.APIAdresses.getAllAnswerOfUser(examId),
      examUserAfterExam: (examId) => this.name + this.APIAdresses.examUserAfterExam(examId),
      takhminRotbeExamList: this.name + this.APIAdresses.report.takhminRotbeExamList,
      userExamList: this.name + this.APIAdresses.userExamList.base,
      pdf: (examId) => this.name + this.APIAdresses.pdf(examId),
      user: {
        draft: this.name + this.APIAdresses.user.draft,
        examInfo: (examId) => this.name + this.APIAdresses.user.examInfo(examId),
        report: (examId) => this.name + this.APIAdresses.user.report(examId)
      }
    }
  }

  userExamList(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.userExamList.base,
      cacheKey: this.CacheList.userExamList,
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
        return new Exam(response.data.data.exam)
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
        return response.data.data // String (report)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.params
    })
  }

  examReportIndex(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.examReportIndex(data.type, data?.next),
      resolveCallback: (response) => {
        return {
          examReport: response.data?.data,
          meta: response.data?.meta,
          links: response.data?.links
        }
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
        return response.data.data // String (report)
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
        return response.data.data // Report Type List
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  userReport(data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.user.report(data.questionId),
      cacheKey: this.CacheList.user.report(data.examId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data // String Message
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.params
    })
  }

  getUserDraft(data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.user.draft,
      cacheKey: this.CacheList.user.draft,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Exam(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      ...(data && { data })
    })
  }

  deleteUserDraft() {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.user.draft,
      resolveCallback: (response) => {
        return response.data // String Message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  userExamInfo(data = {}, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.user.examInfo(data.examId),
      cacheKey: this.CacheList.user.examInfo(data.examId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        // return Exam Info
        return {
          title: response.data?.data?.title,
          temp: {
            grade: {
              title: response.data?.data?.temp?.grade?.title
            },
            major: {
              title: response.data?.data?.temp?.major?.title
            }
          },
          n_questions: response.data?.data?.n_questions
        }
      },
      rejectCallback: (error) => {
        return error
      },
      ...(data.params && { data: data.params })
    })
  }

  getExamUser(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.user.examUser,
      resolveCallback: (response) => {
        return new Exam(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  userQuestionsWithAnswer(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.user.questionsWithAnswer(data.examId),
      resolveCallback: (response) => {
        return new QuestionList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  getAllAnswerOfUser(userExamId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getAllAnswerOfUser(userExamId),
      cacheKey: this.CacheList.getAllAnswerOfUser(userExamId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new UserAnswersOfExam(response.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  examUserAfterExam(userExamId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.examUserAfterExam(userExamId),
      cacheKey: this.CacheList.user.examUserAfterExam(userExamId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new UserExamData(response.data.data)
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
        return new UserExamData(response.data.data)
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

  generateExamFile(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.generateExamFile(data.examId, data.withAnswer),
      resolveCallback: (response) => {
        return response.data // String Message "done"
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  sendAnswers(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.sendAnswers,
      resolveCallback: (response) => {
        return response.data // String Massage
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  sendStatus(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.sendStatus,
      resolveCallback: (response) => {
        return response.data // String Massage
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  sendBookmark(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.sendBookmark,
      resolveCallback: (response) => {
        return response.data // String Massage
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  sendUnBookmark(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.sendBookmark,
      resolveCallback: (response) => {
        return response.data // String Massage
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
      apiMethod: 'put',
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

  userDraftExamBulkDetachQuestions(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.user.draftExam.bulkDetachQuestions(data.examId),
      resolveCallback: (response) => {
        return new Exam(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  userDraftExamBulkReplaceQuestions(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.user.draftExam.replaceQuestions(data.examId),
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

  showExam(examId, cache = { TTL: 1000 }) {
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

  getBase(examId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base(examId),
      cacheKey: this.CacheList.base(examId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ExamList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  postBase(data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base(),
      resolveCallback: (response) => {
        return new ExamList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      ...(data && { data })
    })
  }

  updateReportOptions(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.report.updateReportOptions(data.examId),
      resolveCallback: (response) => {
        return response.data // String
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  konkurTakhminRotbe(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.konkurTakhminRotbe(data.examId),
      resolveCallback: (response) => {
        return response.data.ranks // list of { title,rank }
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  takhminRotbe(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.takhminRotbe,
      resolveCallback: (response) => {
        return {
          main: response.data.main,
          sub_category: response.data.sub_category,
          zirgorooh: response.data.zirgorooh
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  takhminRotbeExamList(examId, cache = { TTL: 1000 }) {
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

  getExamAnswersFiles(examId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.pdf(examId),
      cacheKey: this.CacheList.pdf(examId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data // file list
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  examBookletUpload(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.examBookletUpload(data.examId),
      resolveCallback: (response) => {
        return response.data.data.url // String URL
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  getSubCategoriesWithPermissions(examId) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getSubCategoriesWithPermissions(examId),
      resolveCallback: (response) => {
        return new QuestCategoryList(response.data.data, {
          meta: response.data.meta,
          links: response.data.links
        })
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getSubGroup(examId) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.subGroups.base(examId),
      resolveCallback: (response) => {
        return response.data.data // String subGroups List
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  createSubGroup(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.subGroups.base(data.examId),
      resolveCallback: (response) => {
        return response.data.data // String subGroups List
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        zirgorooh: null // string List
      }, data.data)
    })
  }

  getAllSubGroup(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.subGroups.all(),
      resolveCallback: (response) => {
        return response.data.data // All subGroups List
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getAnalysisVideo(examId) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getAnalysisVideo(examId),
      resolveCallback: (response) => {
        return new ExamList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  analysisVideo(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.analysisVideo,
      resolveCallback: (response) => {
        return response.data // String Message
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        video: '', // Video Address
        sub_category_id: '', // Number
        exams: [] // exam list
      }, data)
    })
  }

  examQuestion(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.examQuestion(data.examId, data.page),
      resolveCallback: (response) => {
        return {
          data: new QuestionList(response.data.data),
          meta: response.data.meta
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data: this.getNormalizedSendData({
        video: '', // Video Address
        sub_category_id: '', // Number
        exams: [] // exam list
      }, data.data)
    })
  }

  copyCoefficient(data = {}) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.copyCoefficient,
      resolveCallback: (response) => {
        return response.data // String Message
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  attachCategories(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.attachCategories(data.examId),
      resolveCallback: (response) => {
        return response.data // String Message
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  detachCategory(data = {}) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.detachCategory(data.examId, data.categoryId),
      resolveCallback: (response) => {
        return response.data // String Message
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
