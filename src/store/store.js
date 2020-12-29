import Vue from 'vue'
import Vuex from 'vuex'
import { Quiz } from '@/models/Quiz'
import { Question } from '@/models/Question';


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        windowSize: {
            x: 0,
            y: 0,
        },
        drawer: true,
        quiz: new Quiz(),
        currentQuestion: new Question()
    },
    mutations: {
        updateWindowSize (state, newInfo) {
            state.windowSize = newInfo
        },
        updateDrawer(state, newInfo) {
            state.drawer = newInfo
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
        }
    },
    getters: {
        mapOfQuestionsDrawer (state) {
            return state.mapOfQuestionsDrawer
        },
        quiz (state) {
            return state.quiz
        },
        windowSize (state) {
            return state.windowSize
        },
        drawer (state) {
            return state.drawer
        },
        currentQuestion (state) {
            return state.currentQuestion
        }
    }
})

export default store
