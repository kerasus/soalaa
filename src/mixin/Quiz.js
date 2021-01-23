// import 'katex/dist/katex.min.css';
import 'github-markdown-css/github-markdown.css';
import '@/assets/scss/markdownKatex.scss';
// import {QuestSubcategory} from "@/models/QuestSubcategory";
import Assistant from "@/plugins/assistant";
import {Question} from "@/models/Question";
import Time from "@/plugins/time";
import {QuestSubcategory} from "@/models/QuestSubcategory";

const mixinQuiz = {
  computed: {
    isQuizPage() {
      return this.$route.name === 'onlineQuiz.quiz'
    },
    user: {
      get () {
        return this.$store.getters.user
      },
      set (newInfo) {
        this.$store.commit('updateUser', newInfo)
      }
    },
    quiz: {
      get () {
        return this.$store.getters.quiz
      },
      set (newInfo) {
        this.$store.commit('updateQuiz', newInfo)
      }
    },
    userQuizListData() {
      return this.$store.getters.userQuizListData
    },
    currentQuestion: {
      get () {
        return this.$store.getters.currentQuestion
      },
      set (newInfo) {
        this.$store.commit('updateCurrentQuestion', newInfo)
      }
    },
    currentLesson () {
      // this.$store.commit('reloadQuizModel')
      // let currentLesson = new QuestSubcategory()
      if (!this.currentQuestion || !this.currentQuestion.sub_category) {
        return new QuestSubcategory()
      }
      let currentSubCategoryId = this.currentQuestion.sub_category.id
      return this.quiz.sub_categories.list.find( (item) => Assistant.getId(item.id) === Assistant.getId(currentSubCategoryId))
      // if (!this.currentQuestion.sub_category) {
      //   this.loadFirstQuestion()
      // }

      // if (this.getCurrentExam().questions.list.length > 0 && this.currentQuestion.sub_category) {
      //   let subCategoryId = Assistant.getId(this.currentQuestion.sub_category.id)
      //   currentLesson = this.getCurrentExam().sub_categories.getItem('id', subCategoryId)
      // }

      // return currentLesson
    }
  },
  methods: {
    getCurrentExam () {
      return this.$store.getters.quiz
    },
    getCurrentExamQuestionIndexes () {
      return JSON.parse(window.localStorage.getItem('currentExamQuestionIndexes'))
    },
    setCurrentExamQuestionIndexes (currentExamQuestionIndexes) {
      window.localStorage.setItem('currentExamQuestionIndexes', JSON.stringify(currentExamQuestionIndexes))
    },
    getCurrentExamQuestions () {
      return JSON.parse(window.localStorage.getItem('currentExamQuestions'))
    },
    setCurrentExamQuestions (currentExamQuestions) {
      window.localStorage.setItem('currentExamQuestions', JSON.stringify(currentExamQuestions))
    },
    startExam (examId, viewType) {
      if (!Assistant.getId(examId)) {
        return
      }
      let that = this
      that.$store.commit('updateOverlay', true)
      return new Promise(function(resolve, reject) {
        if (that.needToLoadQuiaData() && examId) {
          that.participateExam(examId, viewType)
              .then(() => {
                resolve()
              })
              .catch( (error) => {
                that.$store.commit('updateOverlay', false)
                Assistant.reportErrors({location: 'mixin/Quiz.js -> participateExam()'})
                reject(error)
              })
        } else {
          that.loadExam()
          that.$store.commit('updateOverlay', false)
          resolve()
        }
      })
    },
    participateExam (examId, viewType) {
      let that = this
      return new Promise(function(resolve, reject) {
        that.user.participateExam(examId)
            .then(({userExamForParticipate}) => {
              that.loadExam(userExamForParticipate, viewType)
                  .then(() => {
                    resolve()
                  })
                  .catch( (error) => {
                    Assistant.reportErrors({location: 'mixin/Quiz.js -> loadExam()'})
                    reject(error)
                  })
            })
            .catch( (error) => {
              that.$router.push({ name: 'user.exam.list' })
              Assistant.reportErrors({location: 'mixin/Quiz.js -> participateExam()'})
              reject(error)
            })
      })
    },
    saveCurrentExamQuestions (questionsList) {
      let currentExamQuestions = {}
      let currentExamQuestionIndexes = {}
      questionsList.forEach( (item, index) => {
        item.index = index
        currentExamQuestions[item.id.toString()] = item
        currentExamQuestionIndexes[index.toString()] = item.id
      })
      this.setCurrentExamQuestionIndexes(currentExamQuestionIndexes)
      this.setCurrentExamQuestions(currentExamQuestions)
    },
    loadExam (examDataWithQuestions, viewType) {
      let that = this
      return new Promise(function(resolve, reject) {
        if (examDataWithQuestions) {
          // save questions in localStorage
          that.saveCurrentExamQuestions(examDataWithQuestions.questions.list)
          // save exam info in vuex store (remove questions of exam then save in store)
          that.$store.commit('updateQuiz', examDataWithQuestions)
        }
        that.loadExamExtraData(that.quiz)
        that.loadCurrentQuestion(viewType)
        if (examDataWithQuestions) {
          that.quiz.getAnswerOfUserInExam()
              .then((response) => {
                that.$store.commit('mergeDbAnswersIntoLocalstorage', {
                  dbAnswers: response.data.data,
                  exam_id: that.quiz.id
                })
                // that.quiz.mergeDbAnswerToLocalstorage(response.data.data)
                // that.$store.commit('updateQuiz', that.quiz)
                resolve()
              })
              .catch((error) => {
                Assistant.reportErrors({location: 'mixin/Quiz.js -> loadExam()'})
                reject(error)
              })
        } else {
          resolve()
        }
      })
    },
    loadExamExtraData (quiz) {
      let currentExamQuestions = this.getCurrentExamQuestions()
      this.quiz.loadSubcategoriesOfCategories()
      Time.setStateOfExamCategories(quiz.categories)
      Time.setStateOfQuestionsBasedOnActiveCategory(quiz, currentExamQuestions)
      this.setCurrentExamQuestions(currentExamQuestions)
      this.$store.commit('updateQuiz', quiz)
    },
    loadCurrentQuestion (viewType) {
      let questNumber = this.$route.params.questNumber
      if (!questNumber) {
        questNumber = 1
      }
      this.loadQuestionByNumber(questNumber, viewType)
    },
    loadFirstQuestion () {
      this.loadQuestionByNumber(1)
    },
    loadQuestionByNumber (number, viewType) {
      const questionIndex = this.getQuestionIndexFromNumber(number)
      const questionId = this.getCurrentExamQuestionIndexes()[questionIndex]
      if (questionIndex < 0 || !questionId) {
        return
      }
      this.changeQuestion(questionId, viewType)
    },
    sendQuestionData (data, actionType) {
      // find quiz
      let userQuizData = this.userQuizListData.find( (item) => {
        return Assistant.getId(item.examId) === Assistant.getId(this.quiz.id)
      })
      if (!userQuizData || !this.currentQuestion || !Assistant.getId(this.currentQuestion.id)) {
        return
      }

      // find question
      let question = new Question()
      let userQuestionData = userQuizData.examData.find((questionData)=> Assistant.getId(questionData.questionId) === Assistant.getId(this.currentQuestion.id))

      // set default data
      let dataToSendAnswer = {question_id: data.question_id, choice_id: data.choice_id, selected_at: Time.now()}
      let dataToSendStatus = {question_id: data.question_id, status: data.status}
      let dataToSendBookmark = data.questionId

      // set data from localstorage of user
      if (userQuestionData) {
        dataToSendAnswer.selected_at = userQuestionData.answered_at
        dataToSendStatus.status = userQuestionData.state
      }

      // do action
      if (actionType === 'sendAnswer') {
        question.sendAnswer(this.quiz.user_exam_id, dataToSendAnswer)
      }
      if (actionType === 'sendBookmark') {
        if (data.bookmarked) {
          question.sendBookmark(data.exam_user_id, dataToSendBookmark)
        } else {
          question.sendUnBookmark(data.exam_user_id, dataToSendBookmark)
        }
      }
      if (actionType === 'sendStatus') {
        question.sendStatus(this.quiz.user_exam_id, dataToSendStatus)
      }
    },
    answerClicked (data) {
      this.quiz.questions.getQuestionById(data.questionId).selectChoice(data.choiceId)
      this.currentQuestion.selectChoice(data.choiceId)
      this.$store.commit('updateQuiz', this.quiz)
      this.$store.commit('setCurrentQuestion', this.currentQuestion)
      this.$store.commit('refreshUserQuizListData')
      this.sendQuestionData({question_id: data.questionId, choice_id: data.choiceId}, 'sendAnswer')
    },
    bookmark (question) {
      if (this.currentQuestion.id !== question.id) {
        this.currentQuestion = question
      }
      this.$store.commit('reloadQuizModel')
      this.quiz.questions.getQuestionById(this.currentQuestion.id).bookmark()
      this.$store.commit('updateQuiz', this.quiz)
      this.currentQuestion.bookmark()
      this.$store.commit('setCurrentQuestion', this.currentQuestion)
      this.$store.commit('refreshUserQuizListData')
      this.sendQuestionData({ exam_user_id: this.quiz.user_exam_id, questionId: question.id, bookmarked: this.currentQuestion.bookmarked}, 'sendBookmark')
    },
    changeState (question, newState) {
      if (this.currentQuestion.id !== question.id) {
        this.currentQuestion = question
      }
      this.$store.commit('reloadQuizModel')
      this.quiz.questions.getQuestionById(this.currentQuestion.id).changeState(newState)
      this.$store.commit('updateQuiz', this.quiz)
      this.currentQuestion.changeState(newState)
      this.$store.commit('setCurrentQuestion', this.currentQuestion)
      this.$store.commit('refreshUserQuizListData')
      this.sendQuestionData({ exam_user_id: this.quiz.user_exam_id, question_id: question.id, status: this.currentQuestion.state }, 'sendStatus')
    },
    needToLoadQuiaData () {
      return (!this.quiz.id || Assistant.getId(this.$route.params.quizId) !== Assistant.getId(this.quiz.id))
    },
    getQuestionNumberFromIndex (index) {
      index = parseInt(index)
      return index + 1
    },
    getQuestionNumberFromId (id) {
      let currentExamQuestions = this.getCurrentExamQuestions()
      let targetQuestion = currentExamQuestions[id]
      if (!targetQuestion) {
        return 1
      }
      const questionIndex =  targetQuestion.index
      return this.getQuestionNumberFromIndex(questionIndex)
    },
    getQuestionIndexFromNumber (number) {
      number = parseInt(number)
      return number - 1
    },
    getCategoryActiveStatus (categoryId) {
      const category = this.quiz.categories.list.find((item) => Assistant.getId(item.id) === Assistant.getId(categoryId))
      return !category || category.is_active;
    },
    getQuestionIndexById (questionId) {
      let currentExamQuestionIndexes = this.getCurrentExamQuestionIndexes()
      for(let index in currentExamQuestionIndexes) {
        if(currentExamQuestionIndexes[index] === questionId) {
          return index
        }
      }
    },
    getQuestionByIndex (questionIndex) {
      let question = this.getCurrentExamQuestions()[this.getCurrentExamQuestionIndexes()[questionIndex]]
      if (question) {
        return question
      } else {
        return false
      }
    },
    getNextQuestion (questionId) {
      let currentIndex = this.getQuestionIndexById(questionId),
          nextIndex = ++currentIndex
      return this.getQuestionByIndex(nextIndex)
    },
    getPrevQuestion (questionId) {
      let currentIndex = this.getQuestionIndexById(questionId),
          prevIndex = --currentIndex
      return this.getQuestionByIndex(prevIndex)
    },
    goToCategory (categoryId) {
      const nextCategoryQuestion = this.quiz.questions.list.find((item) => Assistant.getId(item.category_id) === Assistant.getId(categoryId))
      if (nextCategoryQuestion) {
        this.changeQuestion(nextCategoryQuestion.id)
      }
    },
    goToNextQuestion () {
      this.$store.commit('loadUserQuizListData')
      let question = this.getNextQuestion(this.currentQuestion.id)
      if (!question) {
        return
      }
      this.changeQuestion(question.id)
    },
    goToPrevQuestion () {
      this.$store.commit('loadUserQuizListData')
      let question = this.getPrevQuestion(this.currentQuestion.id)
      if (!question) {
        return
      }
      this.changeQuestion(question.id)
    },
    changeQuestion(id, viewType) {
      if (Assistant.getId(this.currentQuestion.id) === Assistant.getId(id)) {
        return
      }

      const questIndex = this.getQuestionIndexById(id),
          questNumber = this.getQuestionNumberFromIndex(questIndex)


      let currentQuestion = this.getCurrentExamQuestions()[id]
      const currentQuestionCategoryActiveStatus = this.getCategoryActiveStatus(currentQuestion.sub_category.category_id)

      if (!currentQuestionCategoryActiveStatus) {
        return
      }

      this.$store.commit('updateCurrentQuestion', currentQuestion)
      if (parseInt(this.$route.params.questNumber) !== parseInt(questNumber) && this.$route.name !== 'onlineQuiz.konkoorView' && this.$route.name !== 'onlineQuiz.bubblesheet-view') {
        this.loadExamPageByViewType(this.quiz.id, questNumber, viewType)
      }
    },
    loadExamPageByViewType (examId, questNumber, viewType) {
      if (!viewType) {
        viewType = 'onlineQuiz.alaaView'
      }
      this.$router.push({ name: viewType, params: { quizId: examId, questNumber } })
    },
    // ToDo: change argument (type, questNumber)
    changeView (type) {
      if (type === 'alaa') {
        const questionNumber = this.quiz.questions.getQuestionIndexById(this.currentQuestion.id) + 1
        this.$router.push({ name: 'onlineQuiz.alaaView', params: { quizId: this.quiz.id, questNumber: questionNumber } })
      }
      if (type === 'konkoor') {
        this.$router.push({ name: 'onlineQuiz.konkoorView', params: { quizId: this.quiz.id } })
      }
    },
  }
}

export default mixinQuiz
