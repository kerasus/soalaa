import Vue from 'vue'
import Vuex from 'vuex'
import { Quiz } from '@/models/Quiz'
import { Question } from '@/models/Question'
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from 'vuex-shared-mutations'
import Assistant from '@/plugins/assistant'
import {User} from '@/models/User'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.localStorage,
            paths: ['userQuizData', 'access_token']
        }),
        createMutationsSharer({
            predicate: [
                'updateQuiz',
                'updateCurrentQuestion',
                'goToNextQuestion',
                'goToPrevQuestion'
            ]
        })
    ],
    state: {
        windowSize: {
            x: 0,
            y: 0,
        },
        user: new User(),
        drawer: false,
        quiz: new Quiz(),
        userAnswersOfOnlineQuiz: [],
        userQuizData: null,
        accessToken: null,
        currentQuestion: new Question(),
        appbar: true,
        quizList: []
    },
    mutations: {
        updateQuizList (state, newInfo) {
            state.quizList = newInfo
        },
        updateWindowSize (state, newInfo) {
            state.windowSize = newInfo
        },
        updateDrawer(state, newInfo) {
            state.drawer = newInfo
        },
        updateUser (state, newInfo) {
            window.localStorage.setItem('user', newInfo)
            state.user = newInfo
        },
        updateQuiz (state, newInfo) {
            state.quiz = newInfo
        },
        updateAccessToken (state, newInfo) {
            state.accessToken = newInfo
        },
        updateCurrentQuestion (state, newInfo) {
            console.log('currentQuestionChanged')
            this.commit('reloadQuizModel')
            this.commit('reloadCurrentQuestionModel')
            // set checking time
            const oldQuestionId = Assistant.getId(state.currentQuestion.id)
            const newQuestionId = Assistant.getId(newInfo.id)

            if (newQuestionId === oldQuestionId) {
                return
            }

            if (newQuestionId) {
                let newQuestion = state.quiz.questions.getQuestionById(newQuestionId)

                if(newQuestion) {
                    newQuestion.enterQuestion()
                }
            }
            if (oldQuestionId) {
                let oldQuestion = state.quiz.questions.getQuestionById(oldQuestionId)
                state.quiz.loadCheckingTimesFromUserData (oldQuestion, state.userQuizData)
                if(oldQuestion) {
                    oldQuestion.leaveQuestion()
                }
            }
            state.currentQuestion = new Question(newInfo)
            this.commit('refreshUserQuizData')

        },
        reloadQuizModel (state) {
            if (typeof state.quiz.questions.getNextQuestion !== 'function') {
                state.quiz = new Quiz(state.quiz)
            }
        },
        reloadCurrentQuestionModel (state) {
            if (typeof state.currentQuestion.isAnswered !== 'function') {
                state.currentQuestion = new Question(state.currentQuestion)
            }
        },
        // goToNextQuestion (state) {
        //   state.currentQuestion = state.quiz.questions.getNextQuestion(state.currentQuestion.id)
        // },
        // goToPrevQuestion (state) {
        //     state.currentQuestion = state.quiz.questions.getPrevQuestion(state.currentQuestion.id)
        // },
        refreshUserQuizData () {
            this.commit('saveUserQuizData')
            this.commit('loadUserQuizData')
        },
        saveUserQuizData (state) {

            this.commit('reloadQuizModel')
            state.userQuizData = state.quiz.mergeUserQuizData(state.userQuizData)
        },
        loadUserQuizData (state) {
            this.commit('reloadQuizModel')
            state.quiz.setUserQuizData(state.userQuizData)
        },
        updateAppbar (state, newInfo) {
            state.appbar = newInfo
        }
    },
    getters: {
        quizList (state) {
            return state.quizList
        },
        mapOfQuestionsDrawer (state) {
            return state.mapOfQuestionsDrawer
        },
        quiz (state) {
            return state.quiz
        },
        accessToken (state) {
            return state.accessToken
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
        },
        user (state) {
            return state.user
        }
    }
})

export default store
