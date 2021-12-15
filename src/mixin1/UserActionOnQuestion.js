import { Question } from 'src/models/Question'

const mixinUserActionOnQuestion = {
  methods: {
    userActionOnQuestion (questionId, actionType, data) {
      console.log('userActionOnQuestion 4:', this.quiz)
      console.log('userActionOnQuestion 5:', questionId)
      console.log('userActionOnQuestion 6:', data)
      const examId = this.quiz.id
      const examUserId = this.quiz.user_exam_id
      console.log('userActionOnQuestion 7:', examUserId)
      this.beforeUserActionOnQuestion(examId, questionId)
      const userExamData = this.userQuizListData[examId]
      console.log('userActionOnQuestion 8 :', userExamData)
      if (!userExamData) {
        return
      }
      const userQuestionData = userExamData[questionId]
      console.log('userActionOnQuestion 9 :', userQuestionData)
      if (!userQuestionData) {
        return
      }
      if (actionType === 'answer') {
        console.log('answer')
        this.userActionOnQuestion_answer(data, examId, questionId, userQuestionData)
      } else if (actionType === 'bookmark') {
        console.log('bookmark')
        this.userActionOnQuestion_bookmark(examId, questionId, userQuestionData)
      } else if (actionType === 'status') {
        console.log('status')
        this.userActionOnQuestion_status(data, examId, questionId, userQuestionData)
      }
      this.afterUserActionOnQuestion()
      return this.sendUserQuestionsDataToServer(examUserId, userExamData, questionId, actionType)
    },
    beforeUserActionOnQuestion (examId, questionId) {
      console.log('beforeUserActionOnQuestion')
      this.$store.commit('quiz/updateCurrentQuestion', {
        newQuestionId: questionId,
        currentExamQuestions: this.getCurrentExamQuestions()
      })
      this.$store.commit('quiz/changeQuestionRefreshQuestionObject', {
        exam_id: examId,
        question_id: questionId
      })
    },
    afterUserActionOnQuestion () {
      console.log('afterUserActionOnQuestion')
      console.log('afterUserActionOnQuestion 10:', this.userQuizListData)
      this.$store.commit('quiz/updateUserQuizListDataExam', this.userQuizListData)
      console.log('afterUserActionOnQuestion 11:', this.userQuizListData)
    },
    getUserQuestionDataFromLocalstorage (userExamData, questionId) {
      // find question
      const userQuestionData = userExamData[questionId]

      // set data from localstorage of user
      const dataToSendAnswer = {
        question_id: questionId,
        choice_id: userQuestionData.answered_choice_id,
        selected_at: userQuestionData.answered_at
      }
      const dataToSendStatus = { question_id: questionId, status: userQuestionData.status }
      const dataToSendBookmark = questionId

      return {
        userQuestionData,
        dataToSendAnswer,
        dataToSendStatus,
        dataToSendBookmark
      }
    },
    sendUserQuestionsDataToServer (examUserId, userExamData, questionId, actionType) {
      console.log('sendUserQuestionsDataToServer')
      const userQuestionDataFromLocalstorage = this.getUserQuestionDataFromLocalstorage(userExamData, questionId)

      // send data
      const question = new Question()
      if (actionType === 'answer') {
        console.log('answer')
        return question.sendAnswer(examUserId, userQuestionDataFromLocalstorage.dataToSendAnswer)
      }
      if (actionType === 'bookmark') {
        if (userQuestionDataFromLocalstorage.userQuestionData.bookmarked) {
          return question.sendBookmark(examUserId, userQuestionDataFromLocalstorage.dataToSendBookmark)
        } else {
          return question.sendUnBookmark(examUserId, userQuestionDataFromLocalstorage.dataToSendBookmark)
        }
      }
      if (actionType === 'status') {
        return question.sendStatus(examUserId, userQuestionDataFromLocalstorage.dataToSendStatus)
      }
    },
    userActionOnQuestion_answer (data, examId, questionId, userQuestionData) {
      const oldStatus = userQuestionData.status
      const oldAnsweredChoiceId = userQuestionData.answered_choice_id
      let newAnsweredChoiceId = data.choiceId
      if (oldAnsweredChoiceId === newAnsweredChoiceId) {
        newAnsweredChoiceId = null
      } else if (oldStatus === 'x') {
        const newState = ''
        this.$store.commit('quiz/changeQuestionStatus', {
          exam_id: examId,
          question_id: questionId,
          status: newState
        })
      }
      this.$store.commit('quiz/changeQuestionSelectChoice', {
        exam_id: examId,
        question_id: questionId,
        answered_choice_id: newAnsweredChoiceId
      })
    },
    userActionOnQuestion_bookmark (examId, questionId, userQuestionData) {
      this.$store.commit('quiz/changeQuestionRefreshQuestionObject', {
        exam_id: examId,
        question_id: questionId
      })
      const oldBookmarked = userQuestionData.bookmarked
      const newBookmark = !(oldBookmarked)
      this.$store.commit('quiz/changeQuestionBookmark', {
        exam_id: examId,
        question_id: questionId,
        bookmarked: newBookmark
      })
    },
    userActionOnQuestion_status (data, examId, questionId, userQuestionData) {
      let newStatus = data.newStatus
      const oldQuestion = userQuestionData
      const oldStatus = (!oldQuestion) ? false : oldQuestion.status
      if (oldQuestion && newStatus === oldStatus) {
        newStatus = ''
      } else if (newStatus === 'x') {
        this.$store.commit('quiz/changeQuestionSelectChoice', {
          exam_id: examId,
          question_id: questionId,
          answered_choice_id: null
        })
      }
      this.$store.commit('quiz/changeQuestionStatus', {
        exam_id: examId,
        question_id: questionId,
        status: newStatus
      })
    },
    sendAnswersAndFinishExam () {

    }
  }
}

export default mixinUserActionOnQuestion
