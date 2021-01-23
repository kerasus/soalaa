import Vue from 'vue'
import Vuex from 'vuex'
import {Question, QuestionList} from '@/models/Question'
import createPersistedState from 'vuex-persistedstate'
// import createMutationsSharer from 'vuex-shared-mutations'
import Assistant from '@/plugins/assistant'
import {User} from '@/models/User'
import { Exam } from "@/models/exam";
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
        windowSize: {
            x: 0,
            y: 0,
        },
        user: null,
        drawer: false,
        quiz: null,
        userQuizListData: [],
        accessToken: null,
        currentQuestion: null,
        appbar: true,
        overlay: false
        // quizList: []
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
        // updateQuizList (state, newInfo) {
        //     state.quizList = newInfo
        // },
        updateWindowSize (state, newInfo) {
            state.windowSize = newInfo
        },
        updateAppBarAndDrawer(state, newInfo) {
            this.commit('updateAppBar', newInfo)
            this.commit('updateDrawer', newInfo)
        },
        updateDrawer(state, newInfo) {
            state.drawer = newInfo
        },
        updateUser (state, newInfo) {
            window.localStorage.setItem('user', JSON.stringify(newInfo))
            state.user = newInfo
        },
        mergeDbAnswersIntoLocalstorage (state, payload) {
            let dbAnswers = payload.dbAnswers
            let examId = Assistant.getId(payload.exam_id)

            if (!examId) {
                return
            }
            if (!state.userQuizListData[examId]) {
                state.userQuizListData[examId] = {}
            }

            dbAnswers.forEach( (item) => {
                let questionId = Assistant.getId(item.question_id)

                if (!questionId) {
                    return
                }
                if (!state.userQuizListData[examId][questionId]) {
                    state.userQuizListData[examId][questionId] = {}
                }

                state.userQuizListData[examId][questionId] = {
                    answered_at: item.selected_at,
                    answered_choice_id: item.choice_id,
                    bookmarked: item.bookmark,
                    state: item.status
                }
            })
        },
        setUserQuizListData (state, payload) {

            let examId = Assistant.getId(payload.exam_id)
            let questionId = Assistant.getId(payload.question_id)

            if (!examId || !questionId) {
                return
            }

            if (!state.userQuizListData[examId]) {
                state.userQuizListData[examId] = {}
            }
            if (!state.userQuizListData[examId][questionId]) {
                state.userQuizListData[examId][questionId] = {}
            }

            state.userQuizListData[examId][questionId] = {
                answered_at: payload.answered_at,
                answered_choice_id: payload.answered_choice_id,
                checking_times: payload.checking_times,
                bookmarked: payload.bookmarked,
                state: payload.state
            }

            // let currentQuizData = state.userQuizListData[examId]

            // let currentQuizData = state.userQuizListData.find( (item) => {
            //     return (item && Assistant.getId(item.examId) === Assistant.getId(newInfo.id))
            // })
            // if (!currentQuizData) {
            //     state.userQuizListData.push({
            //         examId: newInfo.id,
            //         examData: []
            //     })
            // } else {
            //     state.userQuizListData.forEach( (item, index) => {
            //         if (item && Assistant.getId(item.examId) === Assistant.getId(newInfo.id)) {
            //             state.userQuizListData[index] = state.quiz.mergeUserQuizData(item)
            //         }
            //     })
            // }
            //
            // state.userQuizListData = newInfo
        },
        setQuiz (state, newInfo) {
            state.quiz = newInfo
        },
        updateQuiz (state, newInfo) {
            if (!newInfo) {
                return
            }
            // console.count('store updateQuiz');
            // console.group();
            // console.time();

            // window.localStorage.setItem('currentExam.questions', JSON.stringify(newInfo.questions.list))
            newInfo.questions = new QuestionList()
            // this.commit('reloadQuizModel')
            state.quiz = newInfo
            // state.quiz.questions.list = state.quiz.questions.list.map(item => {
            //     return Object.freeze(item);
            // })

            // this.commit('setUserQuizListData')






            // console.timeEnd();
            // console.groupEnd();
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
        updateAccessToken (state, newInfo) {
            state.accessToken = newInfo
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
        updateCurrentQuestion (state, newInfo) {
            this.commit('reloadQuizModel')
            this.commit('reloadCurrentQuestionModel')
            // set checking time
            const oldQuestionId = Assistant.getId(state.currentQuestion.id)
            const newQuestionId = Assistant.getId(newInfo.id)
            if (newQuestionId === oldQuestionId || !Assistant.getId(state.quiz.id)) {
                return
            }
            const currentExamQuestions = JSON.parse(window.localStorage.getItem('currentExamQuestions'))
            const currentQuestion = currentExamQuestions[newQuestionId]
            // ToDo: check in comment
            // if (newQuestionId) {
            //     let newQuestion = state.quiz.questions.getQuestionById(newQuestionId)
            //
            //     if(newQuestion) {
            //         newQuestion.enterQuestion()
            //     }
            // }
            // if (oldQuestionId) {
            //
            //     // let currentQuizData = state.userQuizListData.find( (item) => {
            //     //     return (item && Assistant.getId(item.examId) === Assistant.getId(state.quiz.id))
            //     // })
            //     // if (!currentQuizData) {
            //     //     currentQuizData = {
            //     //         examId: state.currentQuestion.id,
            //     //         examData: []
            //     //     }
            //     // }
            //
            //     // ToDo: checkin time is no optimize
            //     // let oldQuestion = state.quiz.questions.getQuestionById(oldQuestionId)
            //     // state.quiz.loadCheckingTimesFromUserData(oldQuestion, currentQuizData.examData)
            //     // if(oldQuestion) {
            //     //     oldQuestion.leaveQuestion()
            //     // }
            // }


            state.currentQuestion = new Question(currentQuestion)
            // this.commit('refreshUserQuizListData')
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
                return (item && Assistant.getId(item.examId) === Assistant.getId(state.quiz.id))
            })
            if (!currentQuizData) {
                currentQuizData = {
                    examId: state.currentQuestion.id,
                    examData: []
                }
            }
            state.userQuizListData.map( (item) => {
                if (item && Assistant.getId(item.examId) === Assistant.getId(state.quiz.id)) {
                    return state.quiz.mergeUserQuizData(currentQuizData)
                }
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
                return (item && Assistant.getId(item.examId) === Assistant.getId(state.quiz.id))
            })
            if (!currentQuizData) {
                currentQuizData = {
                    examId: state.currentQuestion.id,
                    examData: []
                }
            }
            state.quiz.setUserQuizData(currentQuizData.examData)
        },
        updateAppBar (state, newInfo) {
            state.appbar = newInfo
        },
        updateOverlay (state, newInfo) {
            state.overlay = newInfo
        }
    },
    getters: {
        mapOfQuestionsDrawer (state) {
            return state.mapOfQuestionsDrawer
        },
        quiz (state) {
            return new Exam(state.quiz)
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
        overlay (state) {
            return state.overlay
        },
        user (state) {
            return new User(state.user)
        },
        userQuizListData (state) {
            return state.userQuizListData
        }
    }
})

export default store
