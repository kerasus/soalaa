import Vue from 'vue'
import Vuex from 'vuex'
import { Quiz } from '@/models/Quiz'
import { Question } from '@/models/Question'
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from 'vuex-shared-mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.localStorage,
            paths: ['userAnswersOfOnlineQuiz', 'userQuizData']
        }),
        createMutationsSharer({
            predicate: [
                'updateQuiz',
                'answerQuestion',
                'loadUserAnswers',
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
        drawer: false,
        quiz: new Quiz(),
        userAnswersOfOnlineQuiz: [],
        userQuizData: null,
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

            this.commit('reloadQuizModel')
            this.commit('reloadCurrentQuestionModel')

            // set checking time
            const oldQuestionId = state.currentQuestion.id
            const newQuestionId = newInfo.id
            if (newQuestionId !== oldQuestionId) {
                let newQuestion = state.quiz.questions.getQuestionById(newQuestionId)
                if(newQuestion) {
                    newQuestion.enterQuestion()
                }

                let oldQuestion = state.quiz.questions.getQuestionById(oldQuestionId)
                if(oldQuestion) {
                    oldQuestion.leaveQuestion()
                }
            }

            state.currentQuestion = new Question(newInfo)
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
            state.userQuizData = state.quiz.getUserQuizData()
        },
        loadUserQuizData (state) {
            this.commit('reloadQuizModel')
            state.quiz.setUserQuizData(state.userQuizData)
        },

        answerQuestion (state) {
            this.commit('reloadQuizModel')
            // state.quiz.questions.getQuestionById(newInfo.questionId).selectChoice(newInfo.choiceId)
            state.userAnswersOfOnlineQuiz = state.quiz.getUserQuestionsData()
            this.commit('loadUserAnswers')
        },

        loadUserAnswers (state) {
            this.commit('reloadQuizModel')
            state.quiz.setUserQuizData(state.userQuizData)
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
