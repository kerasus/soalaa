import Vue from 'vue'
import Vuex from 'vuex'
import {Question, QuestionList} from '@/models/Question'
import createPersistedState from 'vuex-persistedstate'
// import createMutationsSharer from 'vuex-shared-mutations'
import Assistant from '@/plugins/assistant'
import {User} from '@/models/User'
import { Exam } from "@/models/Exam";
import Time from "@/plugins/time";
// import {UserExamData} from "@/models/UserExamData";

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.localStorage,
            paths: ['userQuizListData', 'access_token', 'user']
        })
        // createMutationsSharer({
        //     predicate: [
        //         'updateQuiz',
        //         'updateCurrentQuestion',
        //         'goToNextQuestion',
        //         'goToPrevQuestion'
        //     ]
        // })
    ],
    state: {
        drawer: false,
        windowSize: {
            x: 0,
            y: 0,
        },
        appbar: true,
        overlay: false,

        user: null,
        accessToken: null,

        quiz: null,
        userQuizListData: {},
        currentQuestion: null,
        currentExamFrozenQuestions: null
    },
    mutations: {
        resetState (state) {
            // Merge rather than replace so we don't lose observers
            // https://github.com/vuejs/vuex/issues/1118
            // Object.assign(state, getDefaultState())
            state.user = null
            state.quiz = null
            state.accessToken = null
            state.currentQuestion = null
            state.userQuizListData = {}
            window.localStorage.setItem('access_token', '')
            // window.localStorage.setItem('user', '')
            // window.localStorage.setItem('vuex', '')
        },

        updateDrawer(state, newInfo) {
            state.drawer = newInfo
        },
        updateAppBar (state, newInfo) {
            state.appbar = newInfo
        },
        updateOverlay (state, newInfo) {
            state.overlay = newInfo
        },
        updateWindowSize (state, newInfo) {
            state.windowSize = newInfo
        },
        updateAppBarAndDrawer(state, newInfo) {
            console.log('newInfo: ', newInfo)
            this.commit('updateAppBar', newInfo)
            this.commit('updateDrawer', newInfo)
        },

        updateUser (state, newInfo) {
            window.localStorage.setItem('user', JSON.stringify(newInfo))
            state.user = newInfo
        },
        updateAccessToken (state, newInfo) {
            state.accessToken = newInfo
        },



        updateUserQuizListDataExam (state, newInfo) {
            state.userQuizListData = newInfo
        },
        mergeDbAnswersIntoLocalstorage (state, payload) {
            let dbAnswers = payload.dbAnswers
            let examId = Assistant.getId(payload.exam_id)

            if (!examId) {
                return
            }
            if (!state.userQuizListData[examId]) {
                Vue.set(state.userQuizListData, examId, {})
            }

            dbAnswers.forEach( (item) => {
                let questionId = Assistant.getId(item.question_id)
                if (!questionId) {
                    return
                }
                if (!state.userQuizListData[examId][questionId]) {
                    Vue.set(state.userQuizListData[examId], questionId, {})
                }
                const check_in_times = state.userQuizListData[examId][questionId].check_in_times || []
                Vue.set(state.userQuizListData[examId], questionId, {
                    answered_at: item.selected_at,
                    answered_choice_id: item.choice_id,
                    bookmarked: item.bookmark,
                    status: item.status,
                    check_in_times
                })
            })
        },
        changeQuestion_RefreshQuestionObject (state, payload) {
            let examId = payload.exam_id
            let questionId = payload.question_id
            if (!state.userQuizListData[examId]) {
                Vue.set(state.userQuizListData, examId, {})
            }
            if (!state.userQuizListData[examId][questionId]) {
                Vue.set(state.userQuizListData[examId], questionId, {})
            }
        },
        changeQuestion_Bookmark (state, payload) {
            let examId = payload.exam_id
            let questionId = payload.question_id
            if (!examId || !questionId) {
                return
            }
            this.commit('changeQuestion_RefreshQuestionObject', payload)
            Vue.set(state.userQuizListData[examId][questionId], 'bookmarked', payload.bookmarked)
        },
        changeQuestion_SelectChoice (state, payload) {
            let examId = payload.exam_id
            let questionId = payload.question_id
            if (!examId || !questionId) {
                return
            }
            this.commit('changeQuestion_RefreshQuestionObject', payload)
            let answeredAt = Time.now()
            if (payload.selected_at) {
                answeredAt = payload.selected_at
            }
            Vue.set(state.userQuizListData[examId][questionId], 'answered_at', answeredAt)
            Vue.set(state.userQuizListData[examId][questionId], 'answered_choice_id', payload.answered_choice_id)
        },
        changeQuestion_Status (state, payload) {
            let examId = payload.exam_id
            let questionId = payload.question_id
            if (!examId || !questionId) {
                return
            }
            this.commit('changeQuestion_RefreshQuestionObject', payload)
            Vue.set(state.userQuizListData[examId][questionId], 'status', payload.status)
        },
        setUserQuizListData (state, payload) {
            let examId = Assistant.getId(payload.exam_id)
            let questionId = Assistant.getId(payload.question_id)
            if (!examId || !questionId) {
                return
            }
            this.commit('changeQuestion_RefreshQuestionObject', payload)
            Vue.set(state.userQuizListData[examId], questionId, {
                answered_at: payload.answered_at,
                answered_choice_id: payload.answered_choice_id,
                check_in_times: payload.check_in_times,
                bookmarked: payload.bookmarked,
                status: payload.status
            })
        },
        setQuiz (state, newInfo) {
            state.quiz = newInfo
        },
        updateQuiz (state, newInfo) {
            if (!newInfo) {
                return
            }
            newInfo.questions = new QuestionList()
            state.quiz = newInfo
        },
        setExamAcceptAtIsPassed (state) {
            state.quiz.accept_at_is_passed = true
        },
        setActiveStateOfExamCategories (state) {
            if (!state.quiz) {
                return
            }
            Time.setStateOfExamCategories(state.quiz.categories)
        },
        setActiveStateOfQuestionsBasedOnActiveCategory (state) {
            if (!state.quiz) {
                return
            }
            Time.setStateOfQuestionsBasedOnActiveCategory(state.quiz)
        },
        setCurrentQuestion (state, newInfo) {
            state.currentQuestion = new Question(newInfo)
        },
        clearExamData (state, examId) {
            let currentQuizDataIndex = state.userQuizListData.findIndex( (item) => {
                return (item && Assistant.getId(item.examId) === Assistant.getId(examId))
            })
            if (currentQuizDataIndex) {
                delete state.userQuizListData[currentQuizDataIndex]
            }
        },
        checkIfQuestionExistInUserQuizListData (state, questionId) {
            if (!state.userQuizListData[state.quiz.id]) {
                Vue.set(state.userQuizListData, state.quiz.id, {})
            }
            if (!state.userQuizListData[state.quiz.id][questionId]) {
                Vue.set(state.userQuizListData[state.quiz.id], questionId, {})
            }
        },
        enterQuestion (state, questionId) {
            this.commit('checkIfQuestionExistInUserQuizListData', questionId)
            if (!state.userQuizListData[state.quiz.id][questionId].check_in_times) {
                Vue.set(state.userQuizListData[state.quiz.id][questionId], 'check_in_times', [])
            }
            const check_in_times = state.userQuizListData[state.quiz.id][questionId].check_in_times
            check_in_times.push({start: Time.now(), end: null})
            Vue.set(state.userQuizListData[state.quiz.id][questionId], 'check_in_times', check_in_times)
            console.log(state.userQuizListData[state.quiz.id][questionId].check_in_times, questionId)
        },
        leaveQuestion (state, questionId) {
            this.commit('checkIfQuestionExistInUserQuizListData', questionId)
            state.userQuizListData[state.quiz.id][questionId].check_in_times[state.userQuizListData[state.quiz.id][questionId].check_in_times.length - 1].end = Time.now()
            state.userQuizListData[state.quiz.id][questionId].check_in_times = state.userQuizListData[state.quiz.id][questionId].check_in_times.filter((item) => {
                return item.end
            })
        },
        updateCurrentQuestion (state, newInfo) {
            const oldQuestionId = (!state.currentQuestion) ? false : Assistant.getId(state.currentQuestion.id)
            const newQuestionId = Assistant.getId(newInfo.newQuestionId)
            if (!state.quiz || newQuestionId === oldQuestionId || !Assistant.getId(state.quiz.id)) {
                return
            }
            const currentExamQuestions = newInfo.currentExamQuestions
            const currentQuestion = currentExamQuestions[newQuestionId]
            if (newQuestionId) {
                this.commit('enterQuestion', newQuestionId)
            }
            if (oldQuestionId) {
                let currentQuizData = state.userQuizListData[state.quiz.id]
                if (!currentQuizData) {
                    currentQuizData = {
                        examId: state.currentQuestion.id,
                        examData: []
                    }
                }
                this.commit('leaveQuestion', oldQuestionId)
            }

            state.currentQuestion = new Question(currentQuestion)
        },
        reloadQuizModel (state) {
            if (!state.quiz || !state.quiz.questions || typeof state.quiz.questions.getNextQuestion !== 'function') {
                state.quiz = new Exam(state.quiz)
            }
        },
        reloadCurrentQuestionModel (state) {
            if (!state.currentQuestion || typeof state.currentQuestion.isAnswered !== 'function') {
                state.currentQuestion = new Question(state.currentQuestion)
            }
        },
        updateCurrentExamFrozenQuestions (state, newInfo) {
            state.currentExamFrozenQuestions = newInfo
        }
    },
    getters: {
        drawer (state) {
            return state.drawer
        },
        appbar (state) {
            return state.appbar
        },
        overlay (state) {
            return state.overlay
        },
        windowSize (state) {
            return state.windowSize
        },

        user (state) {
            return new User(state.user)
        },
        accessToken (state) {
            return state.accessToken
        },


        quiz (state) {
            return new Exam(state.quiz)
        },
        currentQuestion (state) {
            return new Question(state.currentQuestion)
        },
        userQuizListData (state) {
            return state.userQuizListData
        },
        mapOfQuestionsDrawer (state) {
            return state.mapOfQuestionsDrawer
        },
        currentExamFrozenQuestions (state) {
            return state.currentExamFrozenQuestions
        }
    }
})

export default store
