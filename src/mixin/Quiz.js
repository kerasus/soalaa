// import 'katex/dist/katex.min.css';
import 'github-markdown-css/github-markdown.css';
import '@/assets/scss/markdownKatex.scss';
import {QuestSubcategory} from "@/models/QuestSubcategory";
import Assistant from "@/plugins/assistant";
import {Question} from "@/models/Question";
import Time from "@/plugins/time";

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
    currentLessons () {
      this.$store.commit('reloadQuizModel')
      let currentLessons = new QuestSubcategory()
      if (!this.currentQuestion.sub_category) {
        this.loadFirstQuestion()
      }

      if (this.quiz.questions.list.length > 0) {
        let subCategoryId = Assistant.getId(this.currentQuestion.sub_category.id)
        currentLessons = this.quiz.sub_categories.getItem('id', subCategoryId)
      }

      return currentLessons
    },
    daftarche: {
      get () {
        return 'دفترچه سؤالات عمومی'
      }
    }
  },
  methods: {
    startExam () {
      this.$store.commit('updateOverlay', true)
      if (this.needToLoadQuiaData() && this.$route.params.quizId) {
        this.participateExam(this.$route.params.quizId)
      } else {
        this.loadUserQuizDataFromStorage()
      }
    },
    participateExam (examId) {
      this.user.participateExam(examId)
          .then(({userExamForParticipate}) => {
            this.loadQuiz(userExamForParticipate)
          })
          .catch( () => {
            this.$store.commit('updateOverlay', false)
            this.$router.push({ name: 'user.onlineQuiz.list' })
          })
    },
    loadQuiz (userExamForParticipate) {
      this.$store.commit('updateQuiz', userExamForParticipate)
      this.quiz.loadSubcategoriesOfCategories()
      Time.setStateOfExamCategories(this.quiz.categories)
      this.$store.commit('updateQuiz', this.quiz)
      this.loadUserQuizDataFromStorage(this.quiz)
    },
    loadUserQuizDataFromStorage () {
      let questNumber = this.$route.params.questNumber
      if (!questNumber) {
        questNumber = 1
      }
      this.$store.commit('loadUserQuizListData')
      this.loadQuestionByNumber(questNumber)
      this.$store.commit('updateOverlay', false)
    },
    loadFirstQuestion () {
      this.loadQuestionByNumber(1)
    },
    loadQuestionByNumber (number) {
      let questionIndex = this.getQuestionIndexFromNumber(number)
      if (this.quiz.questions.list.length === 0 || questionIndex < 0) {
        return
      }
      this.changeQuestion(this.quiz.questions.list[questionIndex].id)
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
      let dataToSendAnswer = {question_id: data.question_id, choice_id: data.choiceId, selected_at: Time.now()}
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
      const questionIndex = this.quiz.questions.getIndex('id', id)
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
    goToCategory (categoryId) {
      const nextCategoryQuestion = this.quiz.questions.list.find((item) => Assistant.getId(item.category_id) === Assistant.getId(categoryId))
      if (nextCategoryQuestion) {
        this.changeQuestion(nextCategoryQuestion.id)
      }
    },
    goToNextQuestion () {
      this.$store.commit('loadUserQuizListData')
      let question = this.quiz.questions.getNextQuestion(this.currentQuestion.id)
      if (!question) {
        return
      }
      this.changeQuestion(question.id)
    },
    goToPrevQuestion () {
      this.$store.commit('loadUserQuizListData')
      let question = this.quiz.questions.getPrevQuestion(this.currentQuestion.id)
      if (!question) {
        return
      }
      this.changeQuestion(question.id)
    },
    changeQuestion(id) {
      console.log('mixin quiz/ changeQuestion')
      if (Assistant.getId(this.currentQuestion.id) === Assistant.getId(id)) {
        return
      }
      console.log('assistanto radid')
      // if (this.currentQuestion.id !== null) {
      //     this.quiz.questions.getQuestionById(this.currentQuestion.id).leaveQuestion()
      // }

      const questIndex = this.quiz.questions.getQuestionIndexById(id),
          questNumber = this.getQuestionNumberFromIndex(questIndex)

      const currentQuestion = this.quiz.questions.getQuestionById(id)
      const categoryActiveStatus = this.getCategoryActiveStatus(currentQuestion.sub_category.category_id)

      if (!categoryActiveStatus) {
        return
      }

      this.$store.commit('updateCurrentQuestion', currentQuestion)
      // this.quiz.questions.getQuestionById(this.currentQuestion.id).enterQuestion()
      if (parseInt(this.$route.params.questNumber) !== parseInt(questNumber) && this.$route.name !== 'onlineQuiz.konkoorView' && this.$route.name !== 'onlineQuiz.bubblesheet-view') {
          this.$router.push({ name: 'onlineQuiz.alaaView', params: { quizId: this.quiz.id, questNumber } })
      }
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
