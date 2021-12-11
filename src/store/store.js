import Vue from 'vue'
import Vuex from 'vuex'
import Time from '@/plugins/time'
import Assistant from '@/plugins/assistant'
import AppLayout from '@/store/modules/AppLayout'
import Auth from '@/store/modules/Auth'
import {Exam} from '@/models/Exam'
import {Question, QuestionList} from '@/models/Question'
import createPersistedState from 'vuex-persistedstate'
import completeInfo from "@/middleware/completeInfo";
// import createMutationsSharer from 'vuex-shared-mutations'

Vue.use(Vuex)

// const debug = process.env.VUE_APP_NODE_ENV !== 'production'
const debug = true

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.localStorage,
            paths: ['userQuizListData', 'Auth.accessToken', 'Auth.user', 'psychometricAnswer']
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
    modules: {
        Auth,
        AppLayout
    },
    strict: debug,
    state: {
        quiz: null,
        redirectAfterCompleteInfoPage: null,
        userQuizListData: {},
        currentQuestion: null,
        currentExamFrozenQuestions: null,
        psychometricAnswer: {},
        errorQuestionData: [],
        oldQuestionId: null
    },
    mutations: {
        setPsychometricAnswer(state, newInfo) {
            this.psychometricAnswer = newInfo
        },
        resetState(state) {
            // Merge rather than replace so we don't lose observers
            // https://github.com/vuejs/vuex/issues/1118
            // Object.assign(state, getDefaultState())

            this.commit('Auth/updateUser', null)
            this.commit('Auth/updateAccessToken', null)

            state.quiz = null
            state.currentQuestion = null
            state.userQuizListData = {}
        },

        updateRedirectAfterCompleteInfoPage(state, newInfo) {
            state.redirectAfterCompleteInfoPage = newInfo
        },
        updateUserQuizListDataExam(state, newInfo) {
            state.userQuizListData = newInfo
        },
        mergeDbAnswersIntoLocalstorage(state, payload) {
            let dbAnswers = payload.dbAnswers
            let examId = Assistant.getId(payload.exam_id)

            if (!examId) {
                return
            }
            if (!state.userQuizListData[examId]) {
                Vue.set(state.userQuizListData, examId, {})
            }

            function merge(collection1, collection2) {
                collection1.map(item1 => {
                    const targetCollect2Index = collection2.findIndex(item2 => item1.question_id === item2.question_id)
                    if (targetCollect2Index < 0) {
                        return
                    }
                    item1.status = (!collection2[targetCollect2Index].status) ? null : collection2[targetCollect2Index].status
                    item1.bookmarked = (!collection2[targetCollect2Index].bookmark) ? false : collection2[targetCollect2Index].bookmark
                    collection2.splice(targetCollect2Index, 1)

                    return item1
                })

                collection2.forEach(item2 => {
                    collection1.push({
                        question_id: item2.question_id,
                        answered_at: item2.selected_at,
                        answered_choice_id: item2.choice_id,
                        bookmarked: item2.bookmark,
                        status: item2.status,
                        check_in_times: []
                    })
                })
            }

            merge(dbAnswers.choices, dbAnswers.statuses)
            merge(dbAnswers.choices, dbAnswers.bookmarks)

            let userData = dbAnswers.choices

            userData.forEach((item) => {
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
                    bookmarked: item.bookmarked,
                    status: item.status,
                    check_in_times
                })
            })
        },
        changeQuestion_RefreshQuestionObject(state, payload) {
            let examId = payload.exam_id
            let questionId = payload.question_id
            if (!state.userQuizListData[examId]) {
                Vue.set(state.userQuizListData, examId, {})
            }
            if (!state.userQuizListData[examId][questionId]) {
                Vue.set(state.userQuizListData[examId], questionId, {})
            }
        },
        changeQuestion_Bookmark(state, payload) {
            let examId = payload.exam_id
            let questionId = payload.question_id
            if (!examId || !questionId) {
                return
            }
            this.commit('changeQuestion_RefreshQuestionObject', payload)
            Vue.set(state.userQuizListData[examId][questionId], 'bookmarked', payload.bookmarked)
        },
        // ---------------------------> if things got weird you have the backup code! right below (delete this after finishing your task Nima!)
        // changeQuestion_SelectChoice(state, payload) {
        //     let examId = payload.exam_id
        //     let questionId = payload.question_id
        //     if (!examId || !questionId) {
        //         return
        //     }
        //     this.commit('changeQuestion_RefreshQuestionObject', payload)
        //     let answeredAt = Time.now()
        //     if (payload.selected_at) {
        //         answeredAt = payload.selected_at
        //     }
        //     Vue.set(state.userQuizListData[examId][questionId], 'answered_at', answeredAt)
        //     Vue.set(state.userQuizListData[examId][questionId], 'answered_choice_id', payload.answered_choice_id)
        // },
        changeQuestion_SelectChoice(state, payload) {
            let errorReceived = true
            let examId = payload.exam_id
            let questionId = payload.question_id
            let choiceId = payload.answered_choice_id
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
            if (errorReceived) {
                let errorData = {choice_id: choiceId, question_id: questionId, selected_at: answeredAt}
                if (state.oldQuestionId === questionId) {
                    state.errorQuestionData.pop()
                } else {
                    state.oldQuestionId = questionId
                }
                state.errorQuestionData.push(errorData)
            }
        },
        changeQuestion_Status(state, payload) {
            let examId = payload.exam_id
            let questionId = payload.question_id
            if (!examId || !questionId) {
                return
            }
            this.commit('changeQuestion_RefreshQuestionObject', payload)
            Vue.set(state.userQuizListData[examId][questionId], 'status', payload.status)
        },
        setUserQuizListData(state, payload) {
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
        setQuiz(state, newInfo) {
            state.quiz = newInfo
        },
        updateQuiz(state, newInfo) {
            if (!newInfo) {
                return
            }
            newInfo.questions = new QuestionList()
            state.quiz = newInfo
        },
        setExamAcceptAtIsPassed(state) {
            state.quiz.accept_at_is_passed = true
        },
        setActiveStateOfExamCategories(state, newInfo) {
            if (!state.quiz) {
                return
            }
            Time.setStateOfExamCategories(state.quiz.categories, newInfo)
        },
        setActiveStateOfQuestionsBasedOnActiveCategory(state) {
            if (!state.quiz) {
                return
            }
            Time.setStateOfQuestionsBasedOnActiveCategory(state.quiz)
        },
        setCurrentQuestion(state, newInfo) {
            state.currentQuestion = new Question(newInfo)
        },
        clearExamData(state, examId) {
            delete state.userQuizListData[examId]
        },
        checkIfQuestionExistInUserQuizListData(state, questionId) {
            if (!state.userQuizListData[state.quiz.id]) {
                Vue.set(state.userQuizListData, state.quiz.id, {})
            }
            if (!state.userQuizListData[state.quiz.id][questionId]) {
                Vue.set(state.userQuizListData[state.quiz.id], questionId, {})
            }
        },
        enterQuestion(state, questionId) {
            this.commit('checkIfQuestionExistInUserQuizListData', questionId)
            if (!state.userQuizListData[state.quiz.id][questionId].check_in_times) {
                Vue.set(state.userQuizListData[state.quiz.id][questionId], 'check_in_times', [])
            }
            const check_in_times = state.userQuizListData[state.quiz.id][questionId].check_in_times
            check_in_times.push({start: Time.now(), end: null})
            Vue.set(state.userQuizListData[state.quiz.id][questionId], 'check_in_times', check_in_times)
        },
        leaveQuestion(state, questionId) {
            this.commit('checkIfQuestionExistInUserQuizListData', questionId)
            let check_in_times = state.userQuizListData[state.quiz.id][questionId].check_in_times
            if (!check_in_times || check_in_times.length === 0) {
                return
            }
            state.userQuizListData[state.quiz.id][questionId].check_in_times[state.userQuizListData[state.quiz.id][questionId].check_in_times.length - 1].end = Time.now()
            state.userQuizListData[state.quiz.id][questionId].check_in_times = state.userQuizListData[state.quiz.id][questionId].check_in_times.filter((item) => {
                return item.end
            })
        },
        updateCurrentQuestion(state, newInfo) {
            const oldQuestionId = (!state.currentQuestion) ? false : Assistant.getId(state.currentQuestion.id)
            const newQuestionId = Assistant.getId(newInfo.newQuestionId)
            if (!state.quiz || newQuestionId === oldQuestionId || !Assistant.getId(state.quiz.id)) {
                return
            }
            const currentExamQuestions = newInfo.currentExamQuestions
            const currentQuestion = new Question(currentExamQuestions[newQuestionId])
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

            if (
                state.userQuizListData &&
                state.userQuizListData[state.quiz.id] &&
                state.userQuizListData[state.quiz.id][currentQuestion.id] &&
                typeof state.userQuizListData[state.quiz.id][currentQuestion.id].answered_choice_id !== 'undefined' &&
                state.userQuizListData[state.quiz.id][currentQuestion.id].answered_choice_id !== null
            ) {
                currentQuestion.choices.list.forEach((item, index) => {
                    if (item.id.toString() === state.userQuizListData[state.quiz.id][currentQuestion.id].answered_choice_id.toString()) {
                        currentQuestion.choices.list[index].active = true
                    }
                })
            }

            state.currentQuestion = new Question(currentQuestion)
        },
        reloadQuizModel(state) {
            if (!state.quiz || !state.quiz.questions || typeof state.quiz.questions.getNextQuestion !== 'function') {
                state.quiz = new Exam(state.quiz)
            }
        },
        reloadCurrentQuestionModel(state) {
            if (!state.currentQuestion || typeof state.currentQuestion.isAnswered !== 'function') {
                state.currentQuestion = new Question(state.currentQuestion)
            }
        },
        updateCurrentExamFrozenQuestions(state, newInfo) {
            state.currentExamFrozenQuestions = newInfo
        }
    },
    getters: {

        redirectAfterCompleteInfoPage(state) {
            return state.redirectAfterCompleteInfoPage
        },
        psychometricAnswer(state) {
            return state.psychometricAnswer
        },
        quiz(state) {
            return new Exam(state.quiz)
        },
        currentQuestion(state) {
            return new Question(state.currentQuestion)
        },
        userQuizListData(state) {
            return state.userQuizListData
        },
        mapOfQuestionsDrawer(state) {
            return state.mapOfQuestionsDrawer
        },
        currentExamFrozenQuestions(state) {
            return state.currentExamFrozenQuestions
        },

    }
})

export default store
