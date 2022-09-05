import { Question, QuestionList } from 'src/models/Question'
import { Exam } from 'src/models/Exam'
import Time from 'src/plugins/time'
import Assistant from 'src/plugins/assistant'

export function setPsychometricAnswer (state, newInfo) {
  state.psychometricAnswer = newInfo
}

export function resetState (state) {
  this.commit('Auth/updateUser', null)
  this.commit('Auth/updateAccessToken', null)

  state.quiz = null
  state.currentQuestion = null
  state.userQuizListData = {}
}

export function updateUserQuizListDataExam (state, newInfo) {
  state.userQuizListData = newInfo
}

export function mergeDbAnswersIntoLocalstorage (state, payload) {
  const serverAnswers = payload.dbAnswers
  const userExamId = Assistant.getId(payload.user_exam_id)

  if (!userExamId) {
    return
  }
  if (!state.userQuizListData[userExamId]) {
    state.userQuizListData[userExamId] = {}
  }

  function merge (serverCollection, localSelectedAtKey, changeLocalDataFunction) {
    serverCollection.forEach((item) => {
      const questionId = Assistant.getId(item.question_id)
      if (!questionId) {
        return
      }
      if (!state.userQuizListData[userExamId]) {
        state.userQuizListData[userExamId] = {}
      }
      if (!state.userQuizListData[userExamId][questionId]) {
        state.userQuizListData[userExamId][questionId] = {}
      }
      const serverSelectedAt = item.selected_at
      const localSelectedAt = state.userQuizListData[userExamId][questionId][localSelectedAtKey]
      if (
        (serverSelectedAt && localSelectedAt && Time.diff(serverSelectedAt, localSelectedAt) > 0) ||
        !localSelectedAt
      ) {
        changeLocalDataFunction(item, questionId)
      }
    })
  }

  // set indexedServerAnswers on userQuizListData
  function convertToIndexedDb (collection) {
    const indexed = {}
    collection.forEach(item => {
      const questionId = Assistant.getId(item.question_id)
      indexed[questionId] = item
    })

    return indexed
  }
  state.userQuizListData[userExamId].indexedServerAnswers = {
    choices: convertToIndexedDb(serverAnswers.choices),
    bookmarks: convertToIndexedDb(serverAnswers.bookmarks),
    statuses: convertToIndexedDb(serverAnswers.statuses)
  }
  // delete state.userQuizListData['621752608c47d05fc4704550']

  // merge choices
  merge(serverAnswers.choices, 'answered_at', (serverItem, questionId) => {
    const checkInTimes = state.userQuizListData[userExamId][questionId].check_in_times || []
    state.userQuizListData[userExamId][questionId].answered_at = serverItem.selected_at
    state.userQuizListData[userExamId][questionId].answered_choice_id = serverItem.choice_id
    state.userQuizListData[userExamId][questionId].check_in_times = checkInTimes
  })

  // merge bookmarks
  merge(serverAnswers.bookmarks, 'change_bookmarked_at', (serverItem, questionId) => {
    state.userQuizListData[userExamId][questionId].bookmarked = serverItem.bookmark
    state.userQuizListData[userExamId][questionId].change_bookmarked_at = serverItem.selected_at
  })

  // merge statuses
  merge(serverAnswers.statuses, 'change_status_at', (serverItem, questionId) => {
    state.userQuizListData[userExamId][questionId].status = serverItem.status
    state.userQuizListData[userExamId][questionId].change_status_at = serverItem.selected_at
  })
}

export function createEmptyQuestionIfNotExistInLocal (state, payload) {
  // const examId = payload.exam_id
  const userExamId = Assistant.getId(payload.user_exam_id)
  const questionId = payload.question_id
  if (!state.userQuizListData[userExamId]) {
    state.userQuizListData[userExamId] = {}
  }
  if (!state.userQuizListData[userExamId][questionId]) {
    state.userQuizListData[userExamId][questionId] = {}
  }
}

export function resetStatusFailedList (state) {
  state.failedListStatusData = []
}

function removeFromFailedList (state, payload, key) {
  const questionId = payload
  const questions = key === 'failedListAnswerData' ? state[key].questions : state[key]
  const target = questions.findIndex(item => item.question_id === questionId)
  if (target === -1) {
    return
  }
  questions.splice(target, 1)
}

export function removeFromStatusFailedList (state, payload) {
  removeFromFailedList(state, payload, 'failedListStatusData')
  // const questionId = payload
  // const target = state.failedListStatusData.findIndex(item => item.question_id === questionId)
  // if (target === -1) {
  //   return
  // }
  // state.failedListStatusData.splice(target, 1)
}

export function pushToStatusFailedList (state, payload) {
  state.failedListStatusData.push(payload)
}

export function resetBookmarkFailedList (state) {
  state.failedListBookmarkData = []
}

export function removeFromBookmarkFailedList (state, payload) {
  removeFromFailedList(state, payload, 'failedListBookmarkData')
  // const questionId = payload
  // const target = state.failedListBookmarkData.findIndex(item => item.question_id === questionId)
  // if (target === -1) {
  //   return
  // }
  // state.failedListBookmarkData.splice(target, 1)
}

export function pushToBookmarkFailedList (state, payload) {
  state.failedListBookmarkData.push(payload)
}

export function resetUnBookmarkFailedList (state) {
  state.failedListUnBookmarkData = []
}

export function removeFromUnBookmarkFailedList (state, payload) {
  removeFromFailedList(state, payload, 'failedListUnBookmarkData')
  // const questionId = payload
  // const target = state.failedListUnBookmarkData.findIndex(item => item.question_id === questionId)
  // if (target === -1) {
  //   return
  // }
  // state.failedListUnBookmarkData.splice(target, 1)
}

export function pushToUnBookmarkFailedList (state, payload) {
  state.failedListUnBookmarkData.push(payload)
}

export function resetAnswerFailedList (state) {
  state.failedListAnswerData = {
    exam_user_id: null,
    questions: []
  }
}

export function removeFromAnswerFailedList (state, payload) {
  removeFromFailedList(state, payload, 'failedListAnswerData')
  // const questionId = payload
  // const target = state.failedListAnswerData.questions.findIndex(item => item.question_id === questionId)
  // if (target === -1) {
  //   return
  // }
  // state.failedListAnswerData.questions.splice(target, 1)
}

export function pushToAnswerFailedList (state, payload) {
  state.failedListAnswerData.exam_user_id = payload.exam_user_id
  state.failedListAnswerData.questions = state.failedListAnswerData.questions.concat(payload.questions)
}

export function changeQuestionBookmark (state, payload) {
  const userExamId = payload.user_exam_id
  const questionId = payload.question_id
  if (!userExamId || !questionId) {
    return
  }
  this.commit('Exam/createEmptyQuestionIfNotExistInLocal', payload)
  let changeBookmarkedAt = Time.now()
  if (payload.change_bookmarked_at) {
    changeBookmarkedAt = payload.change_bookmarked_at
  }
  state.userQuizListData[userExamId][questionId].change_bookmarked_at = changeBookmarkedAt
  state.userQuizListData[userExamId][questionId].bookmarked = payload.bookmarked
}

export function changeQuestionSelectChoice (state, payload) {
  const userExamId = payload.user_exam_id
  const questionId = payload.question_id
  if (!userExamId || !questionId) {
    return
  }
  this.commit('Exam/createEmptyQuestionIfNotExistInLocal', payload)
  let answeredAt = Time.now()
  if (payload.selected_at) {
    answeredAt = payload.selected_at
  }
  state.userQuizListData[userExamId][questionId].answered_at = answeredAt
  state.userQuizListData[userExamId][questionId].answered_choice_id = payload.answered_choice_id
}

export function changeQuestionStatus (state, payload) {
  const userExamId = payload.user_exam_id
  const questionId = payload.question_id
  if (!userExamId || !questionId) {
    return
  }
  this.commit('Exam/createEmptyQuestionIfNotExistInLocal', payload)
  let changeStatusAt = Time.now()
  if (payload.change_status_at) {
    changeStatusAt = payload.change_status_at
  }
  state.userQuizListData[userExamId][questionId].change_status_at = changeStatusAt
  state.userQuizListData[userExamId][questionId].status = payload.status
}

// export function setUserQuizListData (state, payload) {
//   const examId = Assistant.getId(payload.exam_id)
//   const questionId = Assistant.getId(payload.question_id)
//   if (!examId || !questionId) {
//     return
//   }
//   this.commit('Exam/createEmptyQuestionIfNotExistInLocal', payload)
//   state.userQuizListData[examId][questionId] = {
//     answered_at: payload.answered_at,
//     answered_choice_id: payload.answered_choice_id,
//     check_in_times: payload.check_in_times,
//     bookmarked: payload.bookmarked,
//     status: payload.status
//   }
// }

export function setQuiz (state, newInfo) {
  state.quiz = newInfo
}

export function updateQuiz (state, newInfo) {
  if (!newInfo) {
    return
  }
  newInfo.questions = new QuestionList()
  state.quiz = newInfo
}

export function setExamAcceptAtIsPassed (state) {
  state.quiz.accept_at_is_passed = true
}

export function setActiveStateOfExamCategories (state, newInfo) {
  if (!state.quiz) {
    return
  }
  Time.setStateOfExamCategories(state.quiz.categories, newInfo)
}

export function setActiveStateOfQuestionsBasedOnActiveCategory (state) {
  if (!state.quiz) {
    return
  }
  Time.setStateOfQuestionsBasedOnActiveCategory(state.quiz)
}

export function setCurrentQuestion (state, newInfo) {
  state.currentQuestion = new Question(newInfo)
}

export function clearExamData (state, userExamId) {
  delete state.userQuizListData[userExamId]
}

export function checkIfQuestionExistInUserQuizListData (state, questionId) {
  if (!state.userQuizListData[state.quiz.user_exam_id]) {
    state.userQuizListData[state.quiz.user_exam_id] = {}
  }
  if (!state.userQuizListData[state.quiz.user_exam_id][questionId]) {
    state.userQuizListData[state.quiz.user_exam_id][questionId] = {}
  }
}

export function enterQuestion (state, questionId) {
  // this.commit('Exam/checkIfQuestionExistInUserQuizListData', questionId)

  this.commit('Exam/checkIfQuestionExistInUserQuizListData', questionId)
  if (!state.userQuizListData[state.quiz.user_exam_id][questionId].check_in_times) {
    state.userQuizListData[state.quiz.user_exam_id][questionId].check_in_times = []
  }
  const checkInTimes = state.userQuizListData[state.quiz.user_exam_id][questionId].check_in_times
  checkInTimes.push({ start: Time.now(), end: null })
  state.userQuizListData[state.quiz.user_exam_id][questionId].check_in_times = checkInTimes
}

export function leaveQuestion (state, questionId) {
  this.commit('Exam/checkIfQuestionExistInUserQuizListData', questionId)
  const checkInTimes = state.userQuizListData[state.quiz.user_exam_id][questionId].check_in_times
  if (!checkInTimes || checkInTimes.length === 0) {
    return
  }
  state.userQuizListData[state.quiz.user_exam_id][questionId].check_in_times[state.userQuizListData[state.quiz.user_exam_id][questionId].check_in_times.length - 1].end = Time.now()
  state.userQuizListData[state.quiz.user_exam_id][questionId].check_in_times = state.userQuizListData[state.quiz.user_exam_id][questionId].check_in_times.filter((item) => {
    return item.end
  })
}

export function cleanCurrentQuestion (state) {
  state.currentQuestion = new Question()
}

export function updateCurrentQuestion (state, newInfo) {
  const oldQuestionId = (!state.currentQuestion) ? false : Assistant.getId(state.currentQuestion.id)
  const newQuestionId = Assistant.getId(newInfo.newQuestionId)
  if (!state.quiz || newQuestionId === oldQuestionId || !Assistant.getId(state.quiz.user_exam_id)) {
    return
  }
  const currentExamQuestions = newInfo.currentExamQuestions
  if (!currentExamQuestions) {
    return
  }
  const currentQuestion = new Question(currentExamQuestions[newQuestionId])
  if (newQuestionId) {
    this.commit('Exam/enterQuestion', newQuestionId)
  }
  if (oldQuestionId) {
    let currentQuizData = state.userQuizListData[state.quiz.user_exam_id]
    if (!currentQuizData) {
      currentQuizData = {
        examId: state.currentQuestion.id,
        examData: []
      }
    }
    this.commit('Exam/leaveQuestion', oldQuestionId)
  }

  if (
    state.userQuizListData &&
    state.userQuizListData[state.quiz.user_exam_id] &&
    state.userQuizListData[state.quiz.user_exam_id][currentQuestion.id] &&
    typeof state.userQuizListData[state.quiz.user_exam_id][currentQuestion.id].answered_choice_id !== 'undefined' &&
    state.userQuizListData[state.quiz.user_exam_id][currentQuestion.id].answered_choice_id !== null
  ) {
    currentQuestion.choices.list.forEach((item, index) => {
      if (item.id.toString() === state.userQuizListData[state.quiz.user_exam_id][currentQuestion.id].answered_choice_id.toString()) {
        currentQuestion.choices.list[index].active = true
      }
    })
  }

  state.currentQuestion = new Question(currentQuestion)
}

export function reloadQuizModel (state) {
  if (!state.quiz || !state.quiz.questions || typeof state.quiz.questions.getNextQuestion !== 'function') {
    state.quiz = new Exam(state.quiz)
  }
}

export function reloadCurrentQuestionModel (state) {
  if (!state.currentQuestion || typeof state.currentQuestion.isAnswered !== 'function') {
    state.currentQuestion = new Question(state.currentQuestion)
  }
}

export function updateCurrentExamFrozenQuestions (state, newInfo) {
  state.currentExamFrozenQuestions = newInfo
}

// export function changeQuestionRefreshQuestionObject (state, payload) {
//   const examId = payload.exam_id
//   const questionId = payload.question_id
//   if (!state.userQuizListData[examId]) {
//     state.userQuizListData[examId] = {}
//   }
//   if (!state.userQuizListData[examId][questionId]) {
//     state.userQuizListData[examId][questionId] = {}
//   }
// }
