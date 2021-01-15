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
            paths: ['userQuizListData', 'access_token', 'user']
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
        user: null,
        drawer: false,
        quiz: null,
        userQuizListData: [],
        accessToken: null,
        currentQuiz: null,
        currentQuestion: null,
        appbar: true
        // quizList: []
    },
    mutations: {
        resetState () {
            // Merge rather than replace so we don't lose observers
            // https://github.com/vuejs/vuex/issues/1118
            // Object.assign(state, getDefaultState())
            window.localStorage.setItem('access_token', '')
            window.localStorage.setItem('user', '')
            this.commit('user', null)
            this.commit('quiz', null)
            this.commit('accessToken', null)
            this.commit('currentQuiz', null)
            this.commit('currentQuestion', null)
            this.commit('userQuizListData', [])
        },
        // updateQuizList (state, newInfo) {
        //     state.quizList = newInfo
        // },
        updateWindowSize (state, newInfo) {
            state.windowSize = newInfo
        },
        updateAppBarAndDrawer(state, newInfo) {
            this.commit('updateAppbar', newInfo)
            this.commit('updateDrawer', newInfo)
        },
        updateDrawer(state, newInfo) {
            state.drawer = newInfo
        },
        updateUser (state, newInfo) {
            window.localStorage.setItem('user', JSON.stringify(newInfo))
            state.user = newInfo
        },
        updateQuiz (state, newInfo) {
            state.quiz = newInfo
        },
        updateAccessToken (state, newInfo) {
            state.accessToken = newInfo
        },
        updateCurrentQuiz (state, newInfo) {
            this.commit('reloadQuizModel')
            let currentQuizData = state.userQuizListData.find( (item) => {
                return item.examId = newInfo.id
            })
            if (!currentQuizData) {
                state.userQuizListData.push({
                    examId: newInfo.id,
                    examData: []
                })
            }
            state.currentQuiz = newInfo
        },
        updateCurrentQuestion (state, newInfo) {
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
                // ToDo: find userQuizData
                let currentQuizData = state.userQuizListData.find( (item) => {
                    return item.examId = state.currentQuiz.id
                })
                if (!currentQuizData) {
                    currentQuizData = {
                        examId: state.currentQuestion.id,
                        examData: []
                    }
                }
                state.quiz.loadCheckingTimesFromUserData(oldQuestion, currentQuizData.examData)
                if(oldQuestion) {
                    oldQuestion.leaveQuestion()
                }
            }
            state.currentQuestion = new Question(newInfo)
            this.commit('refreshUserQuizListData')
        },
        reloadQuizModel (state) {
            if (!state.quiz || !state.quiz.questions || typeof state.quiz.questions.getNextQuestion !== 'function') {
                state.quiz = new Quiz(state.quiz)
            }
        },
        reloadCurrentQuestionModel (state) {
            if (!state.currentQuestion || typeof state.currentQuestion.isAnswered !== 'function') {
                state.currentQuestion = new Question(state.currentQuestion)
            }
        },
        // goToNextQuestion (state) {
        //   state.currentQuestion = state.quiz.questions.getNextQuestion(state.currentQuestion.id)
        // },
        // goToPrevQuestion (state) {
        //     state.currentQuestion = state.quiz.questions.getPrevQuestion(state.currentQuestion.id)
        // },
        refreshUserQuizListData () {
            this.commit('saveUserQuizListData')
            this.commit('loadUserQuizListData')
        },
        saveUserQuizListData (state) {
            this.commit('reloadCurrentQuestionModel')
            this.commit('reloadQuizModel')
            // ToDo: find userQuizData
            let currentQuizData = state.userQuizListData.find( (item) => {
                return item.examId = state.currentQuiz.id
            })
            if (!currentQuizData) {
                currentQuizData = {
                    examId: state.currentQuestion.id,
                    examData: []
                }
            }
            state.userQuizListData.forEach( () => {
                return state.quiz.mergeUserQuizData(currentQuizData)
            })
        },
        loadUserQuizListData (state) {
            this.commit('reloadQuizModel')
            this.commit('reloadCurrentQuestionModel')
            // ToDo: find userQuizData
            if (state.currentQuestion.id === null || state.currentQuestion.id === undefined) {
                return
            }
            let currentQuizData = state.userQuizListData.find( (item) => {
                return item.examId = state.currentQuiz.id
            })
            if (!currentQuizData) {
                currentQuizData = {
                    examId: state.currentQuestion.id,
                    examData: []
                }
            }
            state.quiz.setUserQuizData(currentQuizData.examData)
        },
        updateAppbar (state, newInfo) {
            state.appbar = newInfo
        }
    },
    getters: {
        // quizList (state) {
        //     return state.quizList
        // },
        mapOfQuestionsDrawer (state) {
            return state.mapOfQuestionsDrawer
        },
        quiz (state) {
            return new Quiz(state.quiz)
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
            return new Question(state.currentQuestion)
        },
        appbar (state) {
            return state.appbar
        },
        user (state) {
            return new User(state.user)
        }
    }
})

export default store
