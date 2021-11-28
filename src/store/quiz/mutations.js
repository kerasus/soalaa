import { Question, QuestionList } from 'src/models/Question'
import { Exam } from 'src/models/Exam'
import Time from 'src/plugins/time'
import Assistant from 'src/plugins/assistant'

export function resetState (state) {
  state.quiz = null
  state.currentQuestion = null
  state.userQuizListData = {}
}

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

export function reloadQuizModel (state) {
  if (!state.quiz || !state.quiz.questions || typeof state.quiz.questions.getNextQuestion !== 'function') {
    state.quiz = new Exam(state.quiz)
  }
}

export function updateUserQuizListDataExam (state, newInfo) {
  state.userQuizListData = newInfo
}

export function mergeDbAnswersIntoLocalstorage (state, payload) {
  const dbAnswers = payload.dbAnswers
  const examId = Assistant.getId(payload.exam_id)

  if (!examId) {
    return
  }
  if (!state.userQuizListData[examId]) {
    // TODO --> 'vue.set'
    // Vue.set(state.userQuizListData, examId, {})
  }

  function merge (collection1, collection2) {
    collection1.map(item1 => {
      const targetCollect2Index = collection2.findIndex(item2 => item1.question_id === item2.question_id)
      if (targetCollect2Index < 0) {
        // eslint-disable-next-line array-callback-return
        return
      }
      item1.status = (!collection2[targetCollect2Index].status) ? null : collection2[targetCollect2Index].status
      item1.bookmarked = (!collection2[targetCollect2Index].bookmark) ? false : collection2[targetCollect2Index].bookmark
      collection2.splice(targetCollect2Index, 1)

      return item1
    })

    collection2.forEach(item2 => {
      collection1.push({
        question_id: item2.question_id,
        answered_at: item2.selected_at,
        answered_choice_id: item2.choice_id,
        bookmarked: item2.bookmark,
        status: item2.status,
        check_in_times: []
      })
    })
  }

  merge(dbAnswers.choices, dbAnswers.statuses)
  merge(dbAnswers.choices, dbAnswers.bookmarks)

  const userData = dbAnswers.choices

  userData.forEach((item) => {
    const questionId = Assistant.getId(item.question_id)
    if (!questionId) {
      return
    }
    if (!state.userQuizListData[examId][questionId]) {
      // TODO --> 'vue.set'
      // Vue.set(state.userQuizListData[examId], questionId, {})
    }
    // const checkInTimes = state.userQuizListData[examId][questionId].check_in_times || []
    // TODO --> 'vue.set'
    // Vue.set(state.userQuizListData[examId], questionId, {
    //   answered_at: item.selected_at,
    //   answered_choice_id: item.choice_id,
    //   bookmarked: item.bookmarked,
    //   status: item.status,
    //   checkInTimes
    // })
  })
}

export function changeQuestionRefreshQuestionObject (state, payload) {
  const examId = payload.exam_id
  const questionId = payload.question_id
  if (!state.userQuizListData[examId]) {
    // TODO --> 'vue.set'
    // Vue.set(state.userQuizListData, examId, {})
  }
  if (!state.userQuizListData[examId][questionId]) {
    // TODO --> 'vue.set'
    // Vue.set(state.userQuizListData[examId], questionId, {})
  }
}

export function changeQuestionBookmark (state, payload) {
  const examId = payload.exam_id
  const questionId = payload.question_id
  if (!examId || !questionId) {
    return
  }
  this.commit('changeQuestion_RefreshQuestionObject', payload)
  // TODO --> 'vue.set'
  // Vue.set(state.userQuizListData[examId][questionId], 'bookmarked', payload.bookmarked)
}

export function changeQuestionSelectChoice (state, payload) {
  const examId = payload.exam_id
  const questionId = payload.question_id
  if (!examId || !questionId) {
    return
  }
  this.commit('changeQuestion_RefreshQuestionObject', payload)
  let answeredAt = Time.now()
  if (payload.selected_at) {
    answeredAt = payload.selected_at
    return answeredAt
  }
  // TODO --> 'vue.set'
  // Vue.set(state.userQuizListData[examId][questionId], 'answered_at', answeredAt)
  // Vue.set(state.userQuizListData[examId][questionId], 'answered_choice_id', payload.answered_choice_id)
}

export function changeQuestionStatus (state, payload) {
  const examId = payload.exam_id
  const questionId = payload.question_id
  if (!examId || !questionId) {
    return
  }
  this.commit('changeQuestion_RefreshQuestionObject', payload)
  // TODO --> 'vue.set'
  // Vue.set(state.userQuizListData[examId][questionId], 'status', payload.status)
}

export function setUserQuizListData (state, payload) {
  const examId = Assistant.getId(payload.exam_id)
  const questionId = Assistant.getId(payload.question_id)
  if (!examId || !questionId) {
    return
  }
  this.commit('changeQuestion_RefreshQuestionObject', payload)
  // TODO --> 'vue.set'
  // Vue.set(state.userQuizListData[examId], questionId, {
  //   answered_at: payload.answered_at,
  //   answered_choice_id: payload.answered_choice_id,
  //   check_in_times: payload.check_in_times,
  //   bookmarked: payload.bookmarked,
  //   status: payload.status
  // })
}

export function clearExamData (state, examId) {
  delete state.userQuizListData[examId]
}

export function checkIfQuestionExistInUserQuizListData (state, questionId) {
  if (!state.userQuizListData[state.quiz.id]) {
    // TODO --> 'vue.set'
    // Vue.set(state.userQuizListData, state.quiz.id, {})
  }
  if (!state.userQuizListData[state.quiz.id][questionId]) {
    // TODO --> 'vue.set'
    // Vue.set(state.userQuizListData[state.quiz.id], questionId, {})
  }
}

export function enterQuestion (state, questionId) {
  this.commit('checkIfQuestionExistInUserQuizListData', questionId)
  if (!state.userQuizListData[state.quiz.id][questionId].check_in_times) {
    // TODO --> 'vue.set'
    // Vue.set(state.userQuizListData[state.quiz.id][questionId], 'check_in_times', [])
  }
  const checkInTimes = state.userQuizListData[state.quiz.id][questionId].check_in_times
  checkInTimes.push({ start: Time.now(), end: null })
  // TODO --> 'vue.set'
  // Vue.set(state.userQuizListData[state.quiz.id][questionId], 'check_in_times', check_in_times)
}

export function leaveQuestion (state, questionId) {
  this.commit('checkIfQuestionExistInUserQuizListData', questionId)
  const checkInTimes = state.userQuizListData[state.quiz.id][questionId].check_in_times
  if (!checkInTimes || checkInTimes.length === 0) {
    return
  }
  state.userQuizListData[state.quiz.id][questionId].check_in_times[state.userQuizListData[state.quiz.id][questionId].check_in_times.length - 1].end = Time.now()
  state.userQuizListData[state.quiz.id][questionId].check_in_times = state.userQuizListData[state.quiz.id][questionId].check_in_times.filter((item) => {
    return item.end
  })
}

export function updateCurrentQuestion (state, newInfo) {
  const oldQuestionId = (!state.currentQuestion) ? false : Assistant.getId(state.currentQuestion.id)
  const newQuestionId = Assistant.getId(newInfo.newQuestionId)
  if (!state.quiz || newQuestionId === oldQuestionId || !Assistant.getId(state.quiz.id)) {
    return
  }
  const currentExamQuestions = newInfo.currentExamQuestions
  const currentQuestion = new Question(currentExamQuestions[newQuestionId])
  if (newQuestionId) {
    this.commit('enterQuestion', newQuestionId)
  }
  if (oldQuestionId) {
    let currentQuizData = state.userQuizListData[state.quiz.id]
    if (!currentQuizData) {
      currentQuizData = {
        examId: state.currentQuestion.id,
        examData: []
      }
    }
    this.commit('leaveQuestion', oldQuestionId)
  }

  if (
    state.userQuizListData &&
    state.userQuizListData[state.quiz.id] &&
    state.userQuizListData[state.quiz.id][currentQuestion.id] &&
    typeof state.userQuizListData[state.quiz.id][currentQuestion.id].answered_choice_id !== 'undefined' &&
    state.userQuizListData[state.quiz.id][currentQuestion.id].answered_choice_id !== null
  ) {
    currentQuestion.choices.list.forEach((item, index) => {
      if (item.id.toString() === state.userQuizListData[state.quiz.id][currentQuestion.id].answered_choice_id.toString()) {
        currentQuestion.choices.list[index].active = true
      }
    })
  }

  state.currentQuestion = new Question(currentQuestion)
}

export function setCurrentQuestion (state, newInfo) {
  state.currentQuestion = new Question(newInfo)
}

export function reloadCurrentQuestionModel (state) {
  if (!state.currentQuestion || typeof state.currentQuestion.isAnswered !== 'function') {
    state.currentQuestion = new Question(state.currentQuestion)
  }
}

export function updateCurrentExamFrozenQuestions (state, newInfo) {
  state.currentExamFrozenQuestions = newInfo
}
