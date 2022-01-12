import Assistant from '@/plugins/assistant'
import Time from '@/plugins/time'
import {QuestSubcategory, QuestSubcategoryList} from '@/models/QuestSubcategory'
import axios from 'axios'
import {Exam} from '@/models/Exam'
import {QuestCategoryList} from '@/models/QuestCategory'
import ExamData from '@/assets/js/ExamData'
import API_ADDRESS from '@/api/Addresses'
import SocketConnection from '@/plugins/socket'


const mixinQuiz = {
    computed: {
        isQuizPage() {
            return this.$route.name === 'onlineQuiz.quiz'
        },
        quiz: {
            get() {
                return this.$store.getters.quiz
            },
            set(newInfo) {
                this.$store.commit('updateQuiz', newInfo)
            }
        },
        userQuizListData() {
            return this.$store.getters.userQuizListData
        },
        userQuestionData() {
            return (questionId) => {
                let questionData = this.userQuizListData[this.quiz.id][questionId]
                if (!questionData) {
                    questionData = this.getCurrentExamQuestions(false)[questionId]
                }
                return questionData
            }
        },
        currentExamFrozenQuestions() {
            return this.$store.getters.currentExamFrozenQuestions
        },
        currentQuestion: {
            get() {
                return this.$store.getters.currentQuestion
            },
            set(newInfo) {
                this.$store.commit('updateCurrentQuestion', {
                    newQuestionId: newInfo.id,
                    currentExamQuestions: this.getCurrentExamQuestions()
                })
            }
        },
        currentLesson() {
            // this.$store.commit('reloadQuizModel')
            // let currentLesson = new QuestSubcategory()
            if (!this.currentQuestion || !this.currentQuestion.sub_category) {
                return new QuestSubcategory()
            }
            let currentSubCategoryId = this.currentQuestion.sub_category.id
            return this.quiz.sub_categories.list.find((item) => Assistant.getId(item.id) === Assistant.getId(currentSubCategoryId))
            // if (!this.currentQuestion.sub_category) {
            //   this.loadFirstQuestion()
            // }

            // if (this.getCurrentExam().questions.list.length > 0 && this.currentQuestion.sub_category) {
            //   let subCategoryId = Assistant.getId(this.currentQuestion.sub_category.id)
            //   currentLesson = this.getCurrentExam().sub_categories.getItem('id', subCategoryId)
            // }

            // return currentLesson
        },
        currentExamQuestions() {
            return window.currentExamQuestions
        }
    },
    data() {
        return {
            bookletsDialog: false,
            useSocket: true,
            socket: null,
            considerActiveCategoryAndSubcategory: false
        }
    },
    methods: {
        setSocket(token, examId, callbacks) {
            if (!this.useSocket) {
                this.socket = false
                return
            }

            this.socket = SocketConnection.getInstance(token, examId)
            this.setSocketEvents(callbacks)
            if (!this.socket.connected) {
                this.socket.connect()
            }
        },
        disconnectSocket() {
            if (!this.useSocket || !this.socket) {
                this.socket = false
                return
            }

            this.socket.disconnect();
        },
        setSocketEvents (callbacks) {


            this.socket.on('reconnect', () => {
                this.socket.emit('socket.event.reconnect:log', 'socket.event.reconnect:log')
                // // client
                // this.socket.emit("test", dataToSend, function(err, success) {
                // })
            })
            this.socket.on('question.file-link:update', (data) => {
                const questionsFileUrl = data.questionFileLink
                let that = this
                this.reloadQuestionFile(questionsFileUrl, 'onlineQuiz.alaaView', this.$route.params.quizId)
                    .then(() => {
                        that.isRtl = !that.isLtrString(that.currentQuestion.statement)
                        that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
                        if (callbacks && callbacks['question.file-link:update'] && callbacks['question.file-link:update']['afterReload']) {
                            callbacks['question.file-link:update']['afterReload']()
                        }
                    })
                    .catch((error) => {
                        Assistant.reportErrors(error)
                        that.$notify({
                            group: 'notifs',
                            title: 'توجه!',
                            text: 'مشکلی در دریافت اطلاعات آژمون رخ داده است. لطفا دوباره امتحان کنید.',
                            type: 'error'
                        })
                        that.$router.push({name: 'user.exam.list'})
                    })
            })

            return

            this.socket.on('connect', () => {
                const engine = this.socket.io.engine
                // console.log('engine.transport.name', engine.transport.name) // in most cases, prints "polling"

                // console.log(this.socket.connected) // true
                // this.onSocketStatusChange('socket connected')
                // this.isConnected = true

                engine.on('connecting', () => {
                    // this.onSocketStatusChange('on connection')
                })
                engine.on('reconnect', () => {
                    this.socket.emit('socket.event.reconnect:log', 'socket.event.reconnect:log')
                    // // client
                    // this.socket.emit("test", dataToSend, function(err, success) {
                    // })
                })
                engine.on('disconnect', () => {
                    // this.onSocketStatusChange('Socket to break off')
                    // this.isConnected = false
                })
                engine.on('connect_failed', () => {
                    // this.onSocketStatusChange('connection failed')
                })
                engine.on('question.file-link:update', (data) => {
                    const questionsFileUrl = data.questionFileLink
                    let that = this
                    this.reloadQuestionFile(questionsFileUrl, 'onlineQuiz.alaaView', this.$route.params.quizId)
                        .then(() => {
                            that.isRtl = !that.isLtrString(that.currentQuestion.statement)
                            that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
                            if (callbacks && callbacks['question.file-link:update'] && callbacks['question.file-link:update']['afterReload']) {
                                callbacks['question.file-link:update']['afterReload']()
                            }
                        })
                        .catch((error) => {
                            Assistant.reportErrors(error)
                            that.$notify({
                                group: 'notifs',
                                title: 'توجه!',
                                text: 'مشکلی در دریافت اطلاعات آژمون رخ داده است. لطفا دوباره امتحان کنید.',
                                type: 'error'
                            })
                            that.$router.push({name: 'user.exam.list'})
                        })
                })

                engine.once("upgrade", () => {
                    // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
                    // console.log(engine.transport.name) // in most cases, prints "websocket"
                })

                //
                // engine.on("packet", ({ type, data }) => {
                //     // called for each packet received
                // })
                //
                // engine.on("packetCreate", ({ type, data }) => {
                //     // called for each packet sent
                // })
                //
                // engine.on("drain", () => {
                //     // called when the write buffer is drained
                // })
                //
                // engine.on("close", (reason) => {
                //     // called when the underlying connection is closed
                // })
            })
        },
        getUserQuestionData (quizId, question_id) {
            if (typeof question_id === 'undefined') {
                question_id = this.currentQuestion.id
            }
            if (typeof quizId === 'undefined') {
                quizId = this.quiz.id
            }
            if (
                !quizId ||
                !question_id ||
                !this.userQuizListData ||
                !this.userQuizListData[quizId]
            ) {
                return false
            }
            return this.userQuizListData[quizId][question_id]
        },

        getCurrentExam() {
            return this.$store.getters.quiz
        },
        getCurrentExamQuestionIndexes() {
            if (window.currentExamQuestionIndexes) {
                return window.currentExamQuestionIndexes
            }
            window.currentExamQuestionIndexes = JSON.parse(window.localStorage.getItem('currentExamQuestionIndexes'))
            return JSON.parse(window.localStorage.getItem('currentExamQuestionIndexes'))
        },
        setCurrentExamQuestions(currentExamQuestions) {
            window.currentExamQuestions = currentExamQuestions
            window.localStorage.setItem('currentExamQuestions', JSON.stringify(currentExamQuestions))
            // Vue.set(this, 'currentExamQuestions', Object.freeze(currentExamQuestions))
        },
        setCurrentExamQuestionIndexes(currentExamQuestionIndexes) {
            window.currentExamQuestionIndexes = currentExamQuestionIndexes
            window.localStorage.setItem('currentExamQuestionIndexes', JSON.stringify(currentExamQuestionIndexes))
        },
        sortQuestions(questions) {
            let sortList = Array.prototype.sort.bind(questions)
            sortList(function (a, b) {
                let sorta = parseInt(a.order),
                    sortb = parseInt(b.order)
                if (sorta < sortb) {
                    return -1
                }
                if (sorta > sortb) {
                    return 1
                }
                return 0
            })
        },
        saveCurrentExamQuestions(questionsList) {
            let currentExamQuestions = {}
            let currentExamQuestionIndexes = {}

            this.sortQuestions (questionsList)
            // let sortList = Array.prototype.sort.bind(questionsList)
            // sortList(function (a, b) {
            //     let sorta = parseInt(a.order),
            //         sortb = parseInt(b.order)
            //     if (sorta < sortb) {
            //         return -1
            //     }
            //     if (sorta > sortb) {
            //         return 1
            //     }
            //     return 0
            // })

            questionsList.forEach((item, index) => {
                item.index = index
                this.setQuestionsLtr(item)
                currentExamQuestions[item.id.toString()] = item
                currentExamQuestionIndexes[index.toString()] = item.id
            })
            this.setCurrentExamQuestionIndexes(currentExamQuestionIndexes)
            this.modifyCurrentExamQuestions(currentExamQuestions)
            this.setCurrentExamQuestions(currentExamQuestions)
        },
        getCurrentExamQuestionsInArray() {
            let currentExamQuestionsArray = []
            if (this.quiZ !== {}) {
                let currentExamQuestionIndexes = this.getCurrentExamQuestionIndexes()
                let currentExamQuestions = this.getCurrentExamQuestions()
                if (!currentExamQuestionIndexes) {
                    return currentExamQuestionsArray
                }
                let currentExamQuestionIndexesArray = Object.keys(currentExamQuestionIndexes)
                currentExamQuestionIndexesArray.forEach((item) => {
                    let questionId = currentExamQuestionIndexes[item]
                    currentExamQuestionsArray.push(currentExamQuestions[questionId])
                })
            }
            else {
                currentExamQuestionsArray = this.quiZ
            }
            return currentExamQuestionsArray
        },
        getCurrentExamQuestions() {
            if (window.currentExamQuestions) {
                return window.currentExamQuestions
            }
            window.currentExamQuestions = JSON.parse(window.localStorage.getItem('currentExamQuestions'))
            this.modifyCurrentExamQuestions(window.currentExamQuestions)
            // Vue.set(this, 'currentExamQuestions', Object.freeze(window.currentExamQuestions))

            return window.currentExamQuestions
        },
        modifyCurrentExamQuestions(currentExamQuestions) {
            let currentExamQuestionsArray = []
            let currentExamQuestionIndexes = this.getCurrentExamQuestionIndexes()
            if (!currentExamQuestionIndexes) {
                return currentExamQuestionsArray
            }
            let currentExamQuestionIndexesArray = Object.keys(currentExamQuestionIndexes)
            currentExamQuestionIndexesArray.forEach((item) => {
                let questionId = currentExamQuestionIndexes[item]
                currentExamQuestionsArray.push(currentExamQuestions[questionId])
            })
            return currentExamQuestionsArray
        },
        getQuestionsOfSubcategory(subcatId) {
            let currentExamQuestions = this.getCurrentExamQuestions()
            let currentExamQuestionsArray = []
            for (const questionId in currentExamQuestions) {
                if (Assistant.getId(currentExamQuestions[questionId].sub_category.id) === Assistant.getId(subcatId)) {
                    currentExamQuestionsArray.push(currentExamQuestions[questionId])
                }
            }

            return currentExamQuestionsArray
        },

        reloadQuestionFile (questionsFileUrl, viewType, examId) {
            if (!Assistant.getId(examId)) {
                return
            }
            let that = this
            return new Promise(function (resolve, reject) {
                let userExamId = undefined
                let examData = new ExamData()
                window.currentExamQuestions = null
                window.currentExamQuestionIndexes = null
                // that.$store.commit('AppLayout/updateOverlay', {show: true, loading: true, text: ''})
                examData.getExamDataAndParticipate(examId)
                examData.loadQuestionsFromFile()
                examData.getUserExamData(userExamId)
                    .run()
                    .then((result) => {
                        try {
                            // save questions in localStorage
                            that.saveCurrentExamQuestions(examData.exam.questions.list)
                            // save exam info in vuex store (remove questions of exam then save in store)
                            examData.exam.loadSubcategoriesOfCategories()
                            const VUE_APP_ACTIVE_ALL_CATEGORIES_IN_EXAM = process.env.VUE_APP_ACTIVE_ALL_CATEGORIES_IN_EXAM === 'true'
                            Time.setStateOfExamCategories(examData.exam.categories, VUE_APP_ACTIVE_ALL_CATEGORIES_IN_EXAM)
                            let currentExamQuestions = that.getCurrentExamQuestions()
                            Time.setStateOfQuestionsBasedOnActiveCategory(examData.exam, currentExamQuestions)
                            that.$store.commit('updateQuiz', examData.exam)
                            that.setCurrentExamQuestions(currentExamQuestions)
                            that.loadCurrentQuestion(viewType)
                            // examData.exam = that.quiz
                            that.reloadCurrentQuestion(viewType)

                            that.$store.commit('mergeDbAnswersIntoLocalstorage', {
                                dbAnswers: examData.userExamData,
                                exam_id: examData.exam.id
                            })
                            resolve(result)
                        } catch (error) {
                            console.error(error)
                            that.$router.push({name: 'user.exam.list'})
                            reject(error)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                        that.$router.push({name: 'user.exam.list'})
                    })
                    .finally(() => {
                        that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
                    })
            })
        },

        startExam(examId, viewType) {

            if (!Assistant.getId(examId)) {
                return
            }
            let that = this
            return new Promise(function (resolve, reject) {
                let userExamId = undefined
                let examData = new ExamData()
                if (that.needToLoadQuizData()) {
                    that.saveCurrentExamQuestions([])
                    that.$store.commit('cleanCurrentQuestion')
                    // window.currentExamQuestions = null
                    // window.currentExamQuestionIndexes = null
                    that.bookletsDialog = true
                    that.$store.commit('AppLayout/updateOverlay', {show: true, loading: true, text: ''})
                    examData.getExamDataAndParticipate(examId)
                    examData.loadQuestionsFromFile()
                } else {
                    userExamId = that.quiz.user_exam_id
                    that.loadCurrentQuestion(viewType)
                }
                examData.getUserExamData(userExamId)
                    .run()
                    .then((result) => {
                        try {
                            if (that.needToLoadQuizData()) {
                                // save questions in localStorage
                                that.saveCurrentExamQuestions(examData.exam.questions.list)
                                // save exam info in vuex store (remove questions of exam then save in store)
                                examData.exam.loadSubcategoriesOfCategories()
                                const VUE_APP_ACTIVE_ALL_CATEGORIES_IN_EXAM = process.env.VUE_APP_ACTIVE_ALL_CATEGORIES_IN_EXAM === 'true'
                                Time.setStateOfExamCategories(examData.exam.categories, VUE_APP_ACTIVE_ALL_CATEGORIES_IN_EXAM)
                                let currentExamQuestions = that.getCurrentExamQuestions()
                                Time.setStateOfQuestionsBasedOnActiveCategory(examData.exam, currentExamQuestions)
                                that.$store.commit('updateQuiz', examData.exam)
                                that.setCurrentExamQuestions(currentExamQuestions)
                                that.loadCurrentQuestion(viewType)
                                that.reloadCurrentQuestion(viewType)

                            } else {
                                examData.exam = that.quiz
                            }
                            that.$store.commit('mergeDbAnswersIntoLocalstorage', {
                                dbAnswers: examData.userExamData,
                                exam_id: examData.exam.id
                            })
                            resolve(result)
                        } catch (error) {
                            console.error(error)
                            that.$router.push({name: 'user.exam.list'})
                            reject(error)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                        that.$router.push({name: 'user.exam.list'})
                    })
                    .finally(() => {
                        that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
                    })
            })
        },
        needToLoadQuizData() {
            return (!Assistant.getId(this.quiz.id) || !Assistant.getId(this.quiz.user_exam_id) || Assistant.getId(this.$route.params.quizId) !== Assistant.getId(this.quiz.id))
        },
        participateExam(examId, viewType) {
            let that = this
            return new Promise(function (resolve, reject) {
                that.user.loadExamDataFroParticipate(examId)
                    .then(({userExamForParticipate}) => {
                        that.loadExam(userExamForParticipate, viewType)
                            .then(() => {
                                resolve()
                            })
                            .catch((error) => {
                                Assistant.reportErrors({location: 'mixin/Quiz.js -> loadExam()'})
                                reject(error)
                            })
                    })
                    .catch((error) => {
                        that.$router.push({name: 'user.exam.list'})
                        Assistant.reportErrors({location: 'mixin/Quiz.js -> participateExam()'})
                        reject(error)
                    })
            })
        },
        loadExam(examDataWithQuestions, viewType, exam_id) {
            let that = this
            return new Promise(function (resolve, reject) {
                if (examDataWithQuestions) {
                    // save questions in localStorage
                    that.saveCurrentExamQuestions(examDataWithQuestions.questions.list)
                    // save exam info in vuex store (remove questions of exam then save in store)
                    if (exam_id) {
                        examDataWithQuestions.id = exam_id
                    }

                    that.$store.commit('updateQuiz', examDataWithQuestions)
                }
                that.loadExamExtraData(that.quiz, viewType)
                if (viewType !== 'results') {
                    that.loadCurrentQuestion(viewType)
                }
                // if (examDataWithQuestions) {
                    that.quiz.getAnswerOfUserInExam()
                        .then((response) => {
                            if (!Assistant.getId(that.quiz.id)) {
                                Assistant.reportErrors({
                                    location: 'mixin/Quiz.js -> loadExam() -> quiz.getAnswerOfUserInExam()',
                                    message: 'quiz.id not set'
                                })
                                reject()
                            }
                            that.$store.commit('mergeDbAnswersIntoLocalstorage', {
                                dbAnswers: response.data,
                                exam_id: that.quiz.id
                            })
                            resolve()
                        })
                        .catch((error) => {
                            Assistant.reportErrors({location: 'mixin/Quiz.js -> loadExam()'})
                            reject(error)
                        })
                // } else {
                //     resolve()
                // }
            })
        },
        setQuestionsLtr(question) {
            question.ltr = !this.isLtrString(question.statement)
            // if (!question.statement) {
            //     return
            // }
            // const englishRegex = /^[A-Za-z0-9 :"'ʹ.<>%$&@!+()\-_/\n,…?ᵒ*~]*$/
            // question.ltr = !!question.statement.match(englishRegex)
        },
        loadExamExtraData(quiz, viewType) {
            this.quiz.loadSubcategoriesOfCategories()

            if (viewType !== 'results') {
                let currentExamQuestions = this.getCurrentExamQuestions()
                const VUE_APP_ACTIVE_ALL_CATEGORIES_IN_EXAM = process.env.VUE_APP_ACTIVE_ALL_CATEGORIES_IN_EXAM === 'true'
                Time.setStateOfExamCategories(quiz.categories, VUE_APP_ACTIVE_ALL_CATEGORIES_IN_EXAM)
                Time.setStateOfQuestionsBasedOnActiveCategory(quiz, currentExamQuestions)
                this.setCurrentExamQuestions(currentExamQuestions)
            }

            this.$store.commit('updateQuiz', quiz)
        },
        getQuestNumber () {
            let questNumber = this.$route.params.questNumber
            if (this.currentQuestion.order) {
                questNumber = this.currentQuestion.order
            }
            else if (!questNumber) {
                questNumber = 1
            }

            return questNumber
        },
        reloadCurrentQuestion(viewType) {
            let questNumber = this.getQuestNumber()
            const questionId = this.getQuestionIdFromNumber(questNumber)
            if (!questionId) {
                return
            }
            this.changeQuestion(questionId, viewType, true)
        },
        loadCurrentQuestion(viewType) {
            let questNumber = this.getQuestNumber()
            this.loadQuestionByNumber(questNumber, viewType)
        },
        loadFirstQuestion() {
            this.loadQuestionByNumber(1)
        },
        loadQuestionByNumber(number, viewType) {
            const questionId = this.getQuestionIdFromNumber(number)
            if (!questionId) {
                return
            }
            this.changeQuestion(questionId, viewType)
        },
        hasExamDataOnThisDeviseStorage (examId) {
            return !!this.userQuizListData[examId]
        },
        getUserAnswers (examId) {
            const userExamData = this.userQuizListData[examId]
            let answers = []

            for (const questionId in userExamData) {
                if (userExamData[questionId].answered_at) {
                    answers.push({
                        question_id: questionId,
                        choice_id: userExamData[questionId].answered_choice_id,
                        selected_at: (!userExamData[questionId].answered_at) ? null : userExamData[questionId].answered_at,
                        bookmarked: userExamData[questionId].bookmarked,
                        status: userExamData[questionId].status,
                        check_in_times: userExamData[questionId].check_in_times,
                    })
                }
            }

            return answers
        },
        sendUserQuestionsDataToServerAndFinishExam(examId, examUserId) {
            let answers = this.getUserAnswers(examId)

            return axios.post(API_ADDRESS.exam.sendAnswers, {exam_user_id: examUserId, finish: true, questions: answers })
        },
        syncUserAnswersWithDBAndSendAnswersToServerInExamTime(examId, examUserId, finishExam) {
            let answers = this.getUserAnswers(examId)

            return axios.post(API_ADDRESS.exam.sendAnswers, {exam_user_id: examUserId, finish: finishExam, questions: answers })
        },

        showExamAfterExamTime(examId, viewType) {

            if (!Assistant.getId(examId)) {
                return
            }
            let that = this
            return new Promise(function (resolve, reject) {
                let examData = new ExamData()
                that.saveCurrentExamQuestions([])
                that.$store.commit('cleanCurrentQuestion')
                // window.currentExamQuestions = null
                // window.currentExamQuestionIndexes = null
                that.bookletsDialog = true
                that.$store.commit('AppLayout/updateOverlay', {show: true, loading: true, text: ''})
                examData.getExamData(examId)
                examData.loadQuestionsFromFile()
                examData.getUserExamData()
                    .run()
                    .then((result) => {
                        try {
                            // save questions in localStorage
                            that.saveCurrentExamQuestions(examData.exam.questions.list)
                            // save exam info in vuex store (remove questions of exam then save in store)
                            examData.exam.loadSubcategoriesOfCategories()
                            Time.setStateOfExamCategories(examData.exam.categories, true)
                            let currentExamQuestions = that.getCurrentExamQuestions()
                            Time.setStateOfQuestionsBasedOnActiveCategory(examData.exam, currentExamQuestions)
                            that.$store.commit('updateQuiz', examData.exam)
                            that.setCurrentExamQuestions(currentExamQuestions)
                            that.loadCurrentQuestion(viewType)
                            that.reloadCurrentQuestion(viewType)

                            that.$store.commit('mergeDbAnswersIntoLocalstorage', {
                                dbAnswers: examData.userExamData,
                                exam_id: examData.exam.id
                            })
                            resolve(result)
                        } catch (error) {
                            console.error(error)
                            that.$router.push({name: 'user.exam.list'})
                            reject(error)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                        that.$router.push({name: 'user.exam.list'})
                    })
                    .finally(() => {
                        that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
                    })
            })
        },
        syncUserAnswersWithDBAndSendAnswersToServerAfterExamTime(examId, examUserId, finishExam) {
            let answers = this.getUserAnswers(examId)

            return axios.post(API_ADDRESS.exam.sendAnswersAfterExam, {exam_user_id: examUserId, finish: finishExam, questions: answers })
        },


        isLtrString (string) {
            if (!string) {
                return false
            }
            // const englishRegex = /^[A-Za-z0-9 :"'ʹ.<>%$&@!+()\-/\n,…?;ᵒ*~]*$/
            // return !!string.match(englishRegex)
            const persianRegex = /[\u0600-\u06FF]/
            return !string.match(persianRegex)
        },
        answerClicked(data) {
            let questionId = data.questionId

            const socket = (this.useSocket) ? this.socket : false
            return this.userActionOnQuestion(questionId, 'answer', {choiceId: data.choiceId}, socket)
        },
        changeBookmark(questionId) {
            const socket = (this.useSocket) ? this.socket : false
            return this.userActionOnQuestion(questionId, 'bookmark', null, socket)
        },
        changeStatus(questionId, newStatus) {
            const socket = (this.useSocket) ? this.socket : false
            return this.userActionOnQuestion(questionId, 'status', {newStatus}, socket)
        },
        getQuestionNumberFromIndex(index) {
            index = parseInt(index)
            return index + 1
        },
        getQuestionNumberFromId(id) {
            let currentExamQuestions = this.getCurrentExamQuestions()
            if (!currentExamQuestions || typeof id === 'undefined' || id === null) {
                return 1
            }
            let targetQuestion = currentExamQuestions[id]
            if (!targetQuestion) {
                return 1
            }
            const questionIndex = targetQuestion.index
            // return this.getQuestionNumberFromIndex(questionIndex)
            return +questionIndex + 1
        },
        getQuestionIdFromNumber(number) {
            const questionIndex = this.getQuestionIndexFromNumber(number)
            const questionId = this.getCurrentExamQuestionIndexes()[questionIndex]
            if (questionIndex < 0 || !questionId) {
                return false
            }

            return questionId
        },
        getQuestionIndexFromNumber(number) {
            number = parseInt(number)
            return number - 1
        },
        getFirstActiveQuestion() {
            let questions = this.getCurrentExamQuestions()
            for (const questionId in questions) {
                if (questions[questionId].in_active_category) {
                    return questions[questionId]
                }
            }
            return null
        },
        getCategoryActiveStatus(categoryId) {
            const category = this.quiz.categories.list.find((item) => Assistant.getId(item.id) === Assistant.getId(categoryId))
            return !category || category.is_active
        },
        getQuestionIndexById(questionId) {
            let currentExamQuestionIndexes = this.getCurrentExamQuestionIndexes()
            for (let index in currentExamQuestionIndexes) {
                if (currentExamQuestionIndexes[index] === questionId) {
                    return index
                }
            }
        },
        getQuestionByIndex(questionIndex) {
            let question = this.getCurrentExamQuestions()[this.getCurrentExamQuestionIndexes()[questionIndex]]
            if (question) {
                return question
            } else {
                return false
            }
        },
        getNextQuestion(questionId) {
            let currentIndex = this.getQuestionIndexById(questionId),
                nextIndex = ++currentIndex
            return this.getQuestionByIndex(nextIndex)
        },
        getPrevQuestion(questionId) {
            let currentIndex = this.getQuestionIndexById(questionId),
                prevIndex = --currentIndex
            return this.getQuestionByIndex(prevIndex)
        },
        goToCategory(categoryId) {
            const nextCategoryQuestion = this.quiz.questions.list.find((item) => Assistant.getId(item.category_id) === Assistant.getId(categoryId))
            if (nextCategoryQuestion) {
                this.changeQuestion(nextCategoryQuestion.id)
            }
        },
        goToNextQuestion(viewType) {
            // this.$store.commit('loadUserQuizListData')
            let question = this.getNextQuestion(this.currentQuestion.id)
            if (!question) {
                return
            }
            this.changeQuestion(question.id, viewType)
        },
        goToPrevQuestion(viewType) {
            // this.$store.commit('loadUserQuizListData')
            let question = this.getPrevQuestion(this.currentQuestion.id)
            if (!question) {
                return
            }

            this.changeQuestion(question.id, viewType)
        },
        changeQuestion(id, viewType, mandatory) {
            if (Assistant.getId(this.currentQuestion.id) === Assistant.getId(id) && !mandatory) {
                return
            }

            let questIndex = this.getQuestionIndexById(id),
                questNumber = this.getQuestionNumberFromIndex(questIndex)

            if (typeof questIndex === 'undefined') {
                return
            }

            let currentExamQuestions = this.getCurrentExamQuestions()
            let currentQuestion = currentExamQuestions[id]

            if (this.considerActiveCategoryAndSubcategory) {
                let currentQuestionCategoryActiveStatus = this.getCategoryActiveStatus(currentQuestion.sub_category.category_id)

                if (!currentQuestionCategoryActiveStatus) {
                    currentQuestion = this.getFirstActiveQuestion()
                    if (!currentQuestion) {
                        return
                    }
                    questIndex = this.getQuestionIndexById(currentQuestion.id)
                    questNumber = this.getQuestionNumberFromIndex(questIndex)
                }
            }

            this.$store.commit('updateCurrentQuestion', {
                newQuestionId: currentQuestion.id,
                currentExamQuestions: this.getCurrentExamQuestions(),
                mandatory
            })
            if (parseInt(this.$route.params.questNumber) !== parseInt(questNumber) && this.$route.name !== 'onlineQuiz.konkoorView' && this.$route.name !== 'onlineQuiz.bubblesheet-view') {
                this.loadExamPageByViewType(this.quiz.id, questNumber, viewType)
            }
        },
        loadExamPageByViewType(examId, questNumber, viewType) {
            if (!viewType) {
                viewType = 'onlineQuiz.alaaView'
            }
            this.$router.push({name: viewType, params: {quizId: examId, questNumber}})
        },
        // ToDo: change argument (type, questNumber)
        changeView(type) {
            if (type === 'alaa') {
                const questionNumber = this.getQuestionNumberFromId(this.currentQuestion.id)
                this.$router.push({
                    name: 'onlineQuiz.alaaView',
                    params: {quizId: this.quiz.id, questNumber: questionNumber}
                })
            } else if (type === 'konkoor') {
                this.$store.commit('AppLayout/updateDrawer', false)
                setTimeout(() => {
                    this.$router.push({name: 'onlineQuiz.konkoorView', params: {quizId: this.quiz.id}})
                }, 200)
            }
        },



        getExamUserData (exam_id) {
            return new Promise(function (resolve, reject) {
                axios.post(API_ADDRESS.exam.examUser, {exam_id})
                    .then((response) => {
                        let userExamForParticipate = new Exam()
                        userExamForParticipate.id =  Assistant.getId(response.data.data.exam_id)
                        userExamForParticipate.user_exam_id = Assistant.getId(response.data.data.id)
                        userExamForParticipate.created_at = response.data.data.created_at
                        userExamForParticipate.questions_file_url = response.data.data.questions_file_url
                        userExamForParticipate.categories = new QuestCategoryList(response.data.data.categories)
                        userExamForParticipate.sub_categories = new QuestSubcategoryList(response.data.data.sub_categories)
                        resolve(userExamForParticipate)
                    })
                    .catch((error) => {
                        Assistant.reportErrors({location: 'GetExamDataFroParticipate'})
                        reject(error)
                    })
            })
        }
    }
}

export default mixinQuiz
