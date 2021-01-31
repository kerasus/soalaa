import {Question} from "@/models/Question";

const mixinUserActionOnQuestion = {
  methods: {
    userActionOnQuestion(questionId, actionType, data) {
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
      this.sendUserQuestionsDataToServer(exam_user_id, userExamData, questionId, actionType)
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
    sendUserQuestionsDataToServer(examUserId, userExamData, questionId, actionType) {

      // find question
      let userQuestionData = userExamData[questionId]

      // set data from localstorage of user
      let dataToSendAnswer = {
        question_id: questionId,
        choice_id: userQuestionData.answered_choice_id,
        selected_at: userQuestionData.answered_at
      }
      let dataToSendStatus = {question_id: questionId, status: userQuestionData.status}
      let dataToSendBookmark = questionId

      // send data
      let question = new Question()
      if (actionType === 'answer') {
        question.sendAnswer(examUserId, dataToSendAnswer)
      }
      if (actionType === 'bookmark') {
        if (userQuestionData.bookmarked) {
          question.sendBookmark(examUserId, dataToSendBookmark)
        } else {
          question.sendUnBookmark(examUserId, dataToSendBookmark)
        }
      }
      if (actionType === 'status') {
        question.sendStatus(examUserId, dataToSendStatus)
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
        this.$store.commit('changeQuestion_Status', {
          exam_id: examId,
          question_id: questionId,
          status: newState
        })
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
        this.$store.commit('changeQuestion_SelectChoice', {
          exam_id: examId,
          question_id: questionId,
          answered_choice_id: null
        })
      }
      this.$store.commit('changeQuestion_Status', {
        exam_id: examId,
        question_id: questionId,
        status: newStatus
      })
    }
  }
}

export default mixinUserActionOnQuestion
