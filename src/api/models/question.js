import { Question, QuestionList } from 'src/models/Question.js'
import APIRepository from '../classes/APIRepository.js'
import { appApiInstance } from 'src/boot/axios.js'

const APIAdresses = {
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
}

export default class QuestionAPI extends APIRepository {
  constructor() {
    super('Question', appApiInstance, '/exam-question', new Question(), APIAdresses)
    this.CacheList = {
      index: (filters, page, isAdmin = false) => this.name + this.APIAdresses.index(filters, page, isAdmin)
    }
  }

  getIndex(data, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.index(data.filters, data.page, data.isAdmin),
      cacheKey: this.CacheList.index(data.filters, data.page, data.isAdmin),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return {
          QuestionList: new QuestionList(response.data.data),
          meta: response.data.meta
        }
      },
      rejectCallback: () => {
        return new QuestionList()
      }
    })
  }

  create(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      resolveCallback: (response) => {
        return new QuestionList(response.data.data)
      },
      rejectCallback: () => {
        return new QuestionList()
      },
      data
    })
  }

  detach(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.detach(data.questionId),
      resolveCallback: (response) => {
        return response.data // String Message
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  update(data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.update(data.id),
      resolveCallback: (response) => {
        return new QuestionList(response.data.data)
      },
      rejectCallback: () => {
        return new QuestionList()
      },
      data
    })
  }

  delete(data) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.update(data.questionId),
      resolveCallback: (response) => {
        return response.data /// String
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  getLevels(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.levels,
      resolveCallback: (response) => {
        return response.data.data // List of Options Objects [{key,Value}]
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getIndexMonta(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.indexMonta,
      resolveCallback: (response) => {
        return {
          questionList: new QuestionList(response.data.data),
          meta: response.data.mata,
          links: response.data.links
        }
      },
      rejectCallback: (error) => {
        return error
      },
      data
    })
  }

  groupAttach(data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.groupAttach,
      resolveCallback: (response) => {
        return new Question(response.data.data)
      },
      rejectCallback: () => {
        return new Question()
      },
      data
    })
  }

  confirm(questionId, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.confirm(questionId),
      resolveCallback: (response) => {
        return {
          confirmed: response.data.data.confirmed,
          confirmers: response.data.data.confirmers
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  unconfirm(questionId, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.unconfirm(questionId),
      resolveCallback: (response) => {
        return {
          confirmed: response.data.data.confirmed,
          confirmers: response.data.data.confirmers
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
