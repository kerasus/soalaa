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
        user: new User(),
        drawer: false,
        quiz: new Quiz(),
        userAnswersOfOnlineQuiz: [],
        userQuizListData: [],
        accessToken: null,
        currentQuestion: new Question(),
        currentQuizId: null,
        appbar: true,
        quizList: []
    },
    mutations: {
        updateQuizList (state, newInfo) {
            state.quizList = newInfo
        },
        updateCurrentQuizId (state, newInfo) {
            state.currentQuizId = newInfo
        },
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
                    return item.examId = state.currentQuizId
                })
                if (!currentQuizData) {
                    currentQuizData = {
                        examId: state.currentQuizId,
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
        refreshUserQuizListData () {
            this.commit('saveUserQuizListData')
            this.commit('loadUserQuizListData')
        },
        saveUserQuizListData (state) {
            this.commit('reloadQuizModel')
            // ToDo: find userQuizData
            let currentQuizData = state.userQuizListData.find( (item) => {
                return item.examId = state.currentQuizId
            })
            if (!currentQuizData) {
                currentQuizData = {
                    examId: state.currentQuizId,
                    examData: []
                }
            }
            state.userQuizListData = state.quiz.mergeUserQuizData(currentQuizData.examData)
        },
        loadUserQuizListData (state) {
            this.commit('reloadQuizModel')
            // ToDo: find userQuizData
            if (state.currentQuizId === null || state.currentQuizId === undefined) {
                return
            }
            let currentQuizData = state.userQuizListData.find( (item) => {
                return item.examId = state.currentQuizId
            })
            if (!currentQuizData) {
                currentQuizData = {
                    examId: state.currentQuizId,
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
