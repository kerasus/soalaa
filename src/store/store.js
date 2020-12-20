import Vue from 'vue'
import Vuex from 'vuex'
import { Quiz } from "../../models/Quiz"
import { Question } from "../../models/Question";


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        mapOfQuestionsDrawer: false,
        quiz: new Quiz(),
        currentQuestion: new Question(),
        isQuizPage: false
    },
    mutations: {
        updateMapOfQuestionsDrawer(state, newInfo) {
            state.mapOfQuestionsDrawer = newInfo
        },
        updateQuiz (state, newInfo) {
            state.quiz = newInfo
        },
        updateCurrentQuestion (state, newInfo) {
            state.currentQuestion = newInfo
        },
        goToNextQuestion (state) {
          state.currentQuestion = state.quiz.questions.getNextQuestion(state.currentQuestion.id)
        },
        goToPrevQuestion (state) {
            state.currentQuestion = state.quiz.questions.getPrevQuestion(state.currentQuestion.id)
        },
        updateQuizPage (state, newInfo) {
            state.isQuizPage = newInfo
        }
    },
    getters: {
        mapOfQuestionsDrawer (state) {
            return state.mapOfQuestionsDrawer
        },
        quiz (state) {
            return state.quiz
        },
        currentQuestion (state) {
            return state.currentQuestion
        },
        isQuizPage (state) {
            return state.isQuizPage
        }
    }
})

export default store