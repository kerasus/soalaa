import Vue from 'vue'
import Vuex from 'vuex'
import { Quiz } from "../../models/Quiz"
import { Question } from "../../models/Question";


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        mapOfQuestionsDrawer: false,
        quiz: new Quiz(),
        currentQuestion: new Question()
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
        }
    }
})

export default store