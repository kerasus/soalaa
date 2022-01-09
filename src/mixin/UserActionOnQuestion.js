import {Question} from "@/models/Question";

const mixinUserActionOnQuestion = {
    methods: {
        userActionOnQuestion(questionId, actionType, data, socket) {
            let examId = this.quiz.id
            let exam_user_id = this.quiz.user_exam_id
            this.beforeUserActionOnQuestion(examId, questionId)
            let userExamData = this.userQuizListData[examId]
            if (!userExamData) {
                return
            }
            let userQuestionData = userExamData[questionId]
            if (!userQuestionData) {
                return
            }
            if (actionType === 'answer') {
                this.userActionOnQuestion_answer(data, examId, questionId, userQuestionData)
            } else if (actionType === 'bookmark') {
                this.userActionOnQuestion_bookmark(examId, questionId, userQuestionData)
            } else if (actionType === 'status') {
                this.userActionOnQuestion_status(data, examId, questionId, userQuestionData)
            }
            this.afterUserActionOnQuestion()
            return this.sendUserQuestionsDataToServer(exam_user_id, userExamData, questionId, actionType, socket)
        },
        beforeUserActionOnQuestion(examId, questionId) {
            this.$store.commit('updateCurrentQuestion', {
                newQuestionId: questionId,
                currentExamQuestions: this.getCurrentExamQuestions()
            })
            this.$store.commit('changeQuestion_RefreshQuestionObject', {
                exam_id: examId,
                question_id: questionId
            })
        },
        afterUserActionOnQuestion() {
            this.$store.commit('updateUserQuizListDataExam', this.userQuizListData)
        },
        getUserQuestionDataFromLocalstorage(userExamData, questionId) {
            // find question
            let userQuestionData = userExamData[questionId]
            let dataToSendFailedAnswers = this.$store.state.failedListAnswerData

            // set data from localstorage of user
            let dataToSendAnswer = [{
                question_id: questionId,
                choice_id: userQuestionData.answered_choice_id,
                selected_at: userQuestionData.answered_at
            }]

            let dataToSendStatus = {question_id: questionId, status: userQuestionData.status}
            let dataToSendBookmark = questionId

            return {
                userQuestionData,
                dataToSendAnswer,
                dataToSendFailedAnswers,
                dataToSendStatus,
                dataToSendBookmark
            }
        },
        sendUserQuestionsDataToServer(examUserId, userExamData, questionId, actionType, socket) {
            let userQuestionDataFromLocalstorage = this.getUserQuestionDataFromLocalstorage(userExamData, questionId)
            let online = navigator.onLine
            // send data
            let question = new Question()
            if (online){
                if (actionType === 'answer') {
                    return question.sendUserActionToServer('answer' ,examUserId, {answerArray: userQuestionDataFromLocalstorage.dataToSendAnswer , failedAnswersArray: userQuestionDataFromLocalstorage.dataToSendFailedAnswers}, socket)
                }
            }

            if (actionType === 'bookmark') {
                if (userQuestionDataFromLocalstorage.userQuestionData.bookmarked) {
                    return question.sendUserActionToServer('bookmark' ,examUserId, {question_id: userQuestionDataFromLocalstorage.dataToSendBookmark}, socket)
                } else {
                    return question.sendUserActionToServer('unBookmark' ,examUserId, {question_id: userQuestionDataFromLocalstorage.dataToSendBookmark}, socket)
                }
            }
            if (actionType === 'status') {
                return question.sendUserActionToServer('status' ,examUserId, userQuestionDataFromLocalstorage.dataToSendStatus, socket)
            }
        },
        userActionOnQuestion_answer(data, examId, questionId, userQuestionData) {
            let oldStatus = userQuestionData.status
            let oldAnswered_choice_id = userQuestionData.answered_choice_id
            let newAnswered_choice_id = data.choiceId
            if (oldAnswered_choice_id === newAnswered_choice_id) {
                newAnswered_choice_id = null
            } else if (oldStatus === 'x') {
                let newState = ''
                data.newStatus = newState
                userQuestionData.status = oldStatus
                this.userActionOnQuestion_status(data, examId, questionId, userQuestionData)
                // this.$store.commit('changeQuestion_Status', {
                //     exam_id: examId,
                //     question_id: questionId,
                //     status: newState
                // })
            }
            this.$store.commit('changeQuestion_SelectChoice', {
                exam_id: examId,
                question_id: questionId,
                answered_choice_id: newAnswered_choice_id
            })
        },
        userActionOnQuestion_bookmark(examId, questionId, userQuestionData) {
            this.$store.commit('changeQuestion_RefreshQuestionObject', {
                exam_id: examId,
                question_id: questionId
            })
            let oldBookmarked = userQuestionData.bookmarked
            let newBookmark = !(oldBookmarked)
            this.$store.commit('changeQuestion_Bookmark', {
                exam_id: examId,
                question_id: questionId,
                bookmarked: newBookmark
            })
        },
        userActionOnQuestion_status(data, examId, questionId, userQuestionData) {
            let newStatus = data.newStatus
            let oldQuestion = userQuestionData
            let oldStatus = (!oldQuestion) ? false : oldQuestion.status
            if (oldQuestion && newStatus === oldStatus) {
                newStatus = ''
            } else if (newStatus === 'x') {
                userQuestionData.status = newStatus
                data.choiceId = null
                this.userActionOnQuestion_answer(data, examId, questionId, userQuestionData)
                // this.$store.commit('changeQuestion_SelectChoice', {
                //     exam_id: examId,
                //     question_id: questionId,
                //     answered_choice_id: null
                // })
            }
            this.$store.commit('changeQuestion_Status', {
                exam_id: examId,
                question_id: questionId,
                status: newStatus
            })
        },
        sendAnswersAndFinishExam() {

        }
    }
}

export default mixinUserActionOnQuestion
