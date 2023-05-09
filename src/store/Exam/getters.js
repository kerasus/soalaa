import { Exam } from 'src/models/Exam'
import { Question } from 'src/models/Question'

const getters = {
  failedListAnswerData: (state) => {
    return state.failedListAnswerData
  },

  failedListStatusData: (state) => {
    return state.failedListStatusData
  },

  failedListBookmarkData: (state) => {
    return state.failedListBookmarkData
  },

  failedListUnBookmarkData: (state) => {
    return state.failedListUnBookmarkData
  },

  psychometricAnswer: (state) => {
    return state.psychometricAnswer
  },

  quiz: (state) => {
    return new Exam(state.quiz)
  },

  currentQuestion: (state) => {
    return new Question(state.currentQuestion)
  },

  userQuizListData: (state) => {
    return state.userQuizListData
  },

  mapOfQuestionsDrawer: (state) => {
    return state.mapOfQuestionsDrawer
  },

  currentExamFrozenQuestions: (state) => {
    return state.currentExamFrozenQuestions
  }

}

export default getters
