import { Exam } from 'src/models/Exam'
import { Question } from 'src/models/Question'

export function quiz (state) {
  return new Exam(state.quiz)
}
export function userQuizListData (state) {
  return state.userQuizListData
}

export function currentQuestion (state) {
  return new Question(state.currentQuestion)
}

export function currentExamFrozenQuestions (state) {
  return state.currentExamFrozenQuestions
}
