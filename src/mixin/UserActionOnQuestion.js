import Time from 'src/plugins/time'
import API_ADDRESS from 'src/api/Addresses'
import Assistant from 'src/plugins/assistant'

const mixinUserActionOnQuestion = {
  methods: {
    userActionOnQuestion (questionId, actionType, data, socket, sendData) {
      const userExamId = this.quiz.user_exam_id
      const examUserId = this.quiz.user_exam_id
      const userExamData = this.userQuizListData[userExamId]

      this.changeLocalDataBasedOnUserAction(actionType, data, userExamId, questionId)

      if (typeof sendData === 'undefined' || sendData === true) {
        console.log('test')
        return this.sendUserQuestionsDataToServer(userExamId, examUserId, userExamData, questionId, actionType, socket)
      }
      return false
    },
    changeLocalDataBasedOnUserAction (actionType, data, userExamId, questionId) {
      this.$store.commit('Exam/createEmptyQuestionIfNotExistInLocal', {
        user_exam_id: userExamId,
        question_id: questionId
      })
      this.$store.commit('Exam/updateCurrentQuestion', {
        newQuestionId: questionId,
        currentExamQuestions: this.getCurrentExamQuestions()
      })

      const userExamData = this.userQuizListData[userExamId]
      const userQuestionData = userExamData[questionId]

      if (actionType === 'answer') {
        this.userActionOnQuestion_answer(data, userExamId, questionId, userQuestionData)
      } else if (actionType === 'bookmark') {
        this.userActionOnQuestion_bookmark(userExamId, questionId, userQuestionData)
      } else if (actionType === 'status') {
        this.userActionOnQuestion_status(data, userExamId, questionId, userQuestionData)
      }

      this.$store.commit('Exam/updateUserQuizListDataExam', this.userQuizListData)
    },

    pushToFailedList (type, payload) {
      switch (type) {
        case 'answer':
          payload.questions.forEach(question => {
            this.removeFromFailedList(type, question.question_id)
          })
          this.$store.commit('Exam/pushToAnswerFailedList', payload)
          break
        case 'status':
          this.removeFromFailedList(type, payload.question_id)
          this.$store.commit('Exam/pushToStatusFailedList', payload)
          break
        case 'bookmark':
          this.removeFromFailedList(type, payload.question_id)
          this.$store.commit('Exam/pushToBookmarkFailedList', payload)
          break
        case 'unBookmark':
          this.removeFromFailedList(type, payload.question_id)
          this.$store.commit('Exam/pushToUnBookmarkFailedList', payload)
          break
        default:
          return false
      }
    },

    // findQuestionFromFailedList (type, questionId) {
    //   switch (type) {
    //     case 'answer':
    //       return this.$store.getters['Exam/failedListAnswerData'].questions.findIndex(item => item.question_id === questionId)
    //     case 'status':
    //       return 'failedListStatusData'
    //     case 'bookmark':
    //       return 'failedListBookmarkData'
    //     case 'unBookmark':
    //       return 'failedListUnBookmarkData'
    //     default:
    //       return false
    //   }
    // },
    removeFromFailedList (type, questionId) {
      // const target = this.findQuestionFromFailedList(type, questionId)
      // if (target === -1) {
      switch (type) {
        case 'answer':
          this.$store.commit('Exam/removeFromAnswerFailedList', questionId)
          break
        case 'status':
          this.$store.commit('Exam/removeFromStatusFailedList', questionId)
          break
        case 'bookmark':
          this.$store.commit('Exam/removeFromBookmarkFailedList', questionId)
          break
        case 'unBookmark':
          this.$store.commit('Exam/removeFromUnBookmarkFailedList', questionId)
          break
        default:
          return false
      }
      // }
    },

    clearFailedList () {
      this.$store.commit('Exam/resetAnswerFailedList')
      this.$store.commit('Exam/resetStatusFailedList')
      this.$store.commit('Exam/resetBookmarkFailedList')
      this.$store.commit('Exam/resetUnBookmarkFailedList')
    },
    refreshFailedLists (userExamId) {
      this.clearFailedList()
      this.updateFailedList(userExamId, 'answer')
      this.updateFailedList(userExamId, 'status')
      this.updateFailedList(userExamId, 'bookmark')
      this.updateFailedList(userExamId, 'unBookmark')
    },
    getIndexedServerAnswerKey (type) {
      switch (type) {
        case 'answer':
          return 'choices'
        case 'status':
          return 'statuses'
        case 'bookmark':
          return 'bookmarks'
        case 'unBookmark':
          return 'bookmarks'
        default:
          return false
      }
    },
    getLocalSelectedAtKey (type) {
      switch (type) {
        case 'answer':
          return 'answered_at'
        case 'status':
          return 'change_status_at'
        case 'bookmark':
          return 'change_bookmarked_at'
        case 'unBookmark':
          return 'change_bookmarked_at'
        default:
          return false
      }
    },
    serverHasQuestion (userExam, type, questionId) {
      const indexedServerAnswerKey = this.getIndexedServerAnswerKey(type)
      const indexedServerAnswers = userExam.indexedServerAnswers
      return !!indexedServerAnswers[indexedServerAnswerKey][questionId]
    },
    isLocalSelectedAtGreaterThanServerSelectedAt (userExam, type, questionId) {
      const indexedServerAnswerKey = this.getIndexedServerAnswerKey(type)
      const localSelectedAtKey = this.getLocalSelectedAtKey(type)
      const indexedServerAnswers = userExam.indexedServerAnswers
      const serverSelectedAt = indexedServerAnswers[indexedServerAnswerKey][questionId].selected_at
      const localSelectedAt = userExam[questionId][localSelectedAtKey]
      return (serverSelectedAt && localSelectedAt && Time.diff(localSelectedAt, serverSelectedAt))
    },
    updateFailedList (userExamId, type) {
      const userExam = this.userQuizListData[userExamId]

      for (const [key] of Object.entries(userExam)) {
        if (key === 'indexedServerAnswers') {
          continue
        }

        const questionId = Assistant.getId(key)
        if (!questionId) {
          continue
        }

        const payload = this.getSendPayload(type, questionId)
        if (!payload) {
          return
        }

        if (!this.serverHasQuestion(userExam, type, questionId)) {
          const localQuestionData = userExam[questionId]
          if (type === 'bookmark' && !localQuestionData.bookmarked) {
            continue
          } else if (type === 'unBookmark' && localQuestionData.bookmarked) {
            continue
          }

          this.pushToFailedList(type, payload)
          continue
        }

        if (this.isLocalSelectedAtGreaterThanServerSelectedAt(userExam, type, questionId)) {
          this.pushToFailedList(type, payload)
        }
      }
    },

    getFailedListData () {
      return {
        answers: this.$store.getters['Exam/failedListAnswerData'],
        bookmarks: this.$store.getters['Exam/failedListBookmarkData'],
        unBookmarks: this.$store.getters['Exam/failedListUnBookmarkData'],
        statuses: this.$store.getters['Exam/failedListStatusData']
      }
    },

    getUserQuestionDataFromLocalstorage (userExamData, questionId) {
      // find question
      const userQuestionData = userExamData[questionId]
      const failedListData = this.getFailedListData()
      const dataToSendFailedAnswers = failedListData.answers
      const dataToSendFailedStatus = failedListData.statuses
      const dataToSendFailedBookmark = failedListData.bookmarks

      // set data from localstorage of user
      const dataToSendAnswer = [{
        question_id: questionId,
        choice_id: userQuestionData.answered_choice_id,
        selected_at: userQuestionData.answered_at
      }]

      const dataToSendStatus = {
        question_id: questionId,
        status: userQuestionData.status,
        selected_at: userQuestionData.change_status_at
      }
      const dataToSendBookmark = {
        questionId,
        selected_at: userQuestionData.change_bookmarked_at
      }

      return {
        userQuestionData,
        dataToSendAnswer,
        dataToSendFailedAnswers,
        dataToSendFailedStatus,
        dataToSendFailedBookmark,
        dataToSendStatus,
        dataToSendBookmark
      }
    },
    sendUserQuestionsDataToServer (userExamId, examUserId, userExamData, questionId, actionType, socket) {
      const userQuestionDataFromLocalstorage = this.getUserQuestionDataFromLocalstorage(userExamData, questionId)
      // let online = Assistant.isOnline()
      // send data
      // if (!online){
      //     return false
      // }

      if (actionType === 'answer') {
        return this.sendUserActionToServer('answer', userExamId, examUserId, {
          answerArray: userQuestionDataFromLocalstorage.dataToSendAnswer,
          failedAnswersArray: userQuestionDataFromLocalstorage.dataToSendFailedAnswers
        }, questionId, socket)
      }
      if (actionType === 'bookmark') {
        if (userQuestionDataFromLocalstorage.userQuestionData.bookmarked) {
          return this.sendUserActionToServer('bookmark', userExamId, examUserId, {
            bookmark: userQuestionDataFromLocalstorage.dataToSendBookmark,
            failedBookmarksArray: userQuestionDataFromLocalstorage.dataToSendFailedBookmark
          }, questionId, socket)
        } else {
          return this.sendUserActionToServer('unBookmark', userExamId, examUserId, {
            bookmark: userQuestionDataFromLocalstorage.dataToSendBookmark,
            failedBookmarksArray: userQuestionDataFromLocalstorage.dataToSendFailedBookmark
          }, questionId, socket)
        }
      }
      if (actionType === 'status') {
        return this.sendUserActionToServer('status', userExamId, examUserId, {
          status: userQuestionDataFromLocalstorage.dataToSendStatus,
          failedStatusArray: userQuestionDataFromLocalstorage.dataToSendFailedStatus
        }, questionId, socket)
      }
    },
    userActionOnQuestion_answer (data, userExamId, questionId, userQuestionData) {
      const oldStatus = userQuestionData.status
      const oldAnsweredChoiceId = userQuestionData.answered_choice_id
      let newAnsweredChoiceId = data.choiceId
      if (oldAnsweredChoiceId === newAnsweredChoiceId) {
        newAnsweredChoiceId = null
      } else if (oldStatus === 'x') {
        const newState = ''
        data.newStatus = newState
        const newuserQuestionData = JSON.parse(JSON.stringify(userQuestionData))
        newuserQuestionData.status = oldStatus
        this.userActionOnQuestion_status(data, userExamId, questionId, newuserQuestionData)
      }
      this.$store.commit('Exam/changeQuestionSelectChoice', {
        user_exam_id: userExamId,
        question_id: questionId,
        answered_choice_id: newAnsweredChoiceId
      })
    },
    userActionOnQuestion_bookmark (userExamId, questionId, userQuestionData) {
      const oldBookmarked = userQuestionData.bookmarked
      const newBookmark = !(oldBookmarked)
      this.$store.commit('Exam/changeQuestionBookmark', {
        user_exam_id: userExamId,
        question_id: questionId,
        bookmarked: newBookmark
      })
    },
    userActionOnQuestion_status (data, userExamId, questionId, userQuestionData) {
      let newStatus = data.newStatus
      const oldQuestion = userQuestionData
      const oldStatus = (!oldQuestion) ? false : oldQuestion.status
      if (oldQuestion && newStatus === oldStatus) {
        newStatus = ''
      } else if (newStatus === 'x') {
        const newuserQuestionData = JSON.parse(JSON.stringify(userQuestionData))
        newuserQuestionData.status = newStatus
        data.choiceId = null
        this.userActionOnQuestion_answer(data, userExamId, questionId, newuserQuestionData)
      }
      this.$store.commit('Exam/changeQuestionStatus', {
        user_exam_id: userExamId,
        question_id: questionId,
        status: newStatus
      })
    },

    sendFailedData (socket) {
      const failedListData = this.getFailedListData()
      if (!socket) {
        this.sendAnswerFailedListByHttpRequest(failedListData.answers)
        this.sendBookmarkFailedListByHttpRequest(failedListData.bookmarks)
        this.sendUnBookmarkFailedListByHttpRequest(failedListData.unBookmarks)
        this.sendStatusFailedListByHttpRequest(failedListData.statuses)
      } else {
        this.sendAnswerFailedListBySocket(socket, failedListData.answers)
        this.sendBookmarkFailedListBySocket(socket, failedListData.bookmarks)
        this.sendUnBookmarkFailedListBySocket(socket, failedListData.unBookmarks)
        this.sendStatusFailedListBySocket(socket, failedListData.statuses)
      }
    },

    sendAnswerFailedListByHttpRequest (failedPayload) {
      if (failedPayload.questions.length === 0) {
        return
      }
      this.$axios.post(API_ADDRESS.exam.sendAnswers, failedPayload)
        .then(() => {
          this.$store.commit('Exam/resetAnswerFailedList')
        })
    },
    sendAnswerFailedListBySocket (socket, failedPayload) {
      if (failedPayload.questions.length === 0) {
        return
      }
      this.sendDataBySocket(socket, 'question.answer:save', failedPayload)
        .then(() => {
          this.$store.commit('Exam/resetAnswerFailedList')
        })
        .catch(() => {
          this.sendAnswerFailedListByHttpRequest(failedPayload)
        })
    },

    sendBookmarkFailedListByHttpRequest (failedBookmarksArray) {
      failedBookmarksArray.forEach(failedBookmark => {
        this.sendBookmarkFailedByHttpRequest(failedBookmark)
      })
    },
    sendBookmarkFailedByHttpRequest (failedPayload) {
      this.$axios.post(API_ADDRESS.exam.sendBookmark, failedPayload)
        .then(() => {
          this.$store.commit('Exam/removeFromBookmarkFailedList', failedPayload.question_id)
        })
    },
    sendBookmarkFailedListBySocket (socket, failedBookmarksArray) {
      failedBookmarksArray.forEach(failedBookmark => {
        this.sendBookmarkFailedBySocket(socket, failedBookmark)
      })
    },
    sendBookmarkFailedBySocket (socket, failedPayload) {
      this.sendDataBySocket(socket, 'question.bookmark:save', failedPayload)
        .catch(() => {
          this.sendBookmarkFailedByHttpRequest(failedPayload)
        })
    },

    sendUnBookmarkFailedListByHttpRequest (failedUnBookmarksArray) {
      failedUnBookmarksArray.forEach(failedUnBookmark => {
        this.sendUnBookmarkFailedByHttpRequest(failedUnBookmark)
      })
    },
    sendUnBookmarkFailedByHttpRequest (failedPayload) {
      this.$axios.post(API_ADDRESS.exam.sendUnBookmark, failedPayload)
        .then(() => {
          this.$store.commit('Exam/removeFromBookmarkFailedList', failedPayload.question_id)
        })
    },
    sendUnBookmarkFailedListBySocket (socket, failedBookmarksArray) {
      failedBookmarksArray.forEach(failedBookmark => {
        this.sendUnBookmarkFailedBySocket(socket, failedBookmark)
      })
    },
    sendUnBookmarkFailedBySocket (socket, failedPayload) {
      this.sendDataBySocket(socket, 'question.bookmark:remove', failedPayload)
        .catch(() => {
          this.sendUnBookmarkFailedByHttpRequest(failedPayload)
        })
    },

    sendStatusFailedListByHttpRequest (failedStatusArray) {
      failedStatusArray.forEach(failedStatus => {
        this.sendStatusFailedByHttpRequest(failedStatus)
      })
    },
    sendStatusFailedByHttpRequest (failedPayload) {
      this.$axios.post(API_ADDRESS.exam.sendStatus, failedPayload)
        .then(() => {
          this.$store.commit('Exam/removeFromStatusFailedList', failedPayload.question_id)
        })
    },
    sendStatusFailedListBySocket (socket, failedStatusArray) {
      failedStatusArray.forEach(failedStatus => {
        this.sendStatusFailedBySocket(socket, failedStatus)
      })
    },
    sendStatusFailedBySocket (socket, failedPayload) {
      this.sendDataBySocket(socket, 'question.status:save', failedPayload)
        .catch(() => {
          this.sendStatusFailedByHttpRequest(failedPayload)
        })
    },

    sendByHttpRequest (type, address, payload) {
      return new Promise((resolve, reject) => {
        this.$axios.post(address, payload)
          .then(response => {
            this.sendFailedData()
            resolve(response)
          })
          .catch(error => {
            this.pushToFailedList(type, payload)
            reject(error)
          })
      })
    },
    sendBySocket (type, socket, address, channel, payload) {
      return new Promise((resolve, reject) => {
        this.sendDataBySocket(socket, channel, payload)
          .then(response => {
            this.sendFailedData(socket)
            resolve(response)
          })
          .catch(() => {
            this.sendByHttpRequest(type, address, payload)
              .then(response => {
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
          })
      })
    },

    getSendPayload (type, questionId) {
      const userExamId = this.quiz.user_exam_id
      const examUserId = this.quiz.user_exam_id
      const userExamData = this.userQuizListData[userExamId]
      if (!questionId || !userExamId || !examUserId || !userExamData) {
        return false
      }
      const userQuestionData = userExamData[questionId]
      if (!userQuestionData) {
        return false
      }

      switch (type) {
        case 'answer':
          if (typeof userQuestionData.answered_choice_id === 'undefined' || !userQuestionData.answered_at) {
            return false
          }
          return {
            exam_user_id: examUserId,
            questions: [{
              question_id: questionId,
              choice_id: userQuestionData.answered_choice_id,
              selected_at: userQuestionData.answered_at
            }]
          }
        case 'status':
          if (typeof userQuestionData.status === 'undefined' || !userQuestionData.change_status_at) {
            return false
          }
          return {
            exam_user_id: examUserId,
            question_id: questionId,
            status: userQuestionData.status,
            selected_at: userQuestionData.change_status_at
          }
        case 'bookmark':
          if (!userQuestionData.change_bookmarked_at) {
            return false
          }
          return {
            exam_user_id: examUserId,
            question_id: questionId,
            selected_at: userQuestionData.change_bookmarked_at
          }
        case 'unBookmark':
          if (!userQuestionData.change_bookmarked_at) {
            return false
          }
          return {
            exam_user_id: examUserId,
            question_id: questionId,
            selected_at: userQuestionData.change_bookmarked_at
          }
        default:
          return false
      }
    },

    sendUserActionToServer (type, userExamId, examUserId, dataToSendObject, questionId, socket) {
      const payload = this.getSendPayload(type, questionId)
      let address = null
      let channel = null
      if (type === 'answer') {
        address = API_ADDRESS.exam.sendAnswers
        channel = 'question.answer:save'
      } else if (type === 'bookmark') {
        address = API_ADDRESS.exam.sendBookmark
        channel = 'question.bookmark:save'
      } else if (type === 'unBookmark') {
        address = API_ADDRESS.exam.sendUnBookmark
        channel = 'question.bookmark:remove'
      } else if (type === 'status') {
        address = API_ADDRESS.exam.sendStatus
        channel = 'question.status:save'
      } else {
        return false
      }

      if (!payload) {
        return false
      }

      if (!socket) {
        return this.sendByHttpRequest(type, address, payload)
      } else {
        return this.sendBySocket(type, socket, address, channel, payload)
      }
    }
  }
}

export default mixinUserActionOnQuestion
