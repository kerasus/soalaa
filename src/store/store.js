import Vue from 'vue'
import Vuex from 'vuex'
import { Quiz } from '@/models/Quiz'
import { Question } from '@/models/Question'
// import createPersistedState from 'vuex-persistedstate'
// import createMutationsSharer from 'vuex-shared-mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [
        // createPersistedState({
        //     storage: window.localStorage,
        //     paths: ['userAnswersOfOnlineQuiz', 'currentQuestion']
        // }),
        // createMutationsSharer({
        //     predicate: [
        //         'updateDrawer',
        //         'updateQuiz',
        //         'updateCurrentQuestion',
        //         'goToNextQuestion',
        //         'goToPrevQuestion'
        //     ]
        // })
    ],
    state: {
        windowSize: {
            x: 0,
            y: 0,
        },
        drawer: false,
        quiz: new Quiz(),
        userAnswersOfOnlineQuiz: [],
        currentQuestion: new Question(),
        appbar: true
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
        },
        answerQuestion (state, newInfo) {
            state.quiz.questions.getQuestionById(newInfo.questionId).choiceClicked(newInfo.choiceId)
            state.appbar = newInfo
        },
        updateAppbar (state, newInfo) {
            state.appbar = newInfo
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
        },
        userAnswersOfOnlineQuiz (state) {
            return state.userAnswersOfOnlineQuiz
        },
        appbar (state) {
            return state.appbar
        }
    }
})

export default store
