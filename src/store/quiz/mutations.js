import { QuestionList } from 'src/models/Question'
import { Exam } from 'src/models/Exam'
import Time from 'src/plugins/time'

export function resetState (state) {
  state.quiz = null
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
