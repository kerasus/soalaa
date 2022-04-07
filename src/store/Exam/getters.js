import { Exam } from 'src/models/Exam'
import { Question } from 'src/models/Question'

export function failedListAnswerData (state) {
  return state.failedListAnswerData
}

export function failedListStatusData (state) {
  return state.failedListStatusData
}

export function failedListBookmarkData (state) {
  return state.failedListBookmarkData
}

export function failedListUnBookmarkData (state) {
  return state.failedListUnBookmarkData
}

export function psychometricAnswer (state) {
  return state.psychometricAnswer
}

export function quiz (state) {
  return new Exam(state.quiz)
}

export function currentQuestion (state) {
  return new Question(state.currentQuestion)
}

export function userQuizListData (state) {
  return state.userQuizListData
}

export function mapOfQuestionsDrawer (state) {
  return state.mapOfQuestionsDrawer
}

export function currentExamFrozenQuestions (state) {
  return state.currentExamFrozenQuestions
}
