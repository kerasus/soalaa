// import 'katex/dist/katex.min.css';
import 'github-markdown-css/github-markdown.css';
import '@/assets/scss/markdownKatex.scss';
import {QuestSubcategory} from "@/models/QuestSubcategory";
import Assistant from "@/plugins/assistant";

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
    answerClicked (data) {
      this.quiz.questions.getQuestionById(data.questionId).selectChoice(data.choiceId)
      this.currentQuestion.selectChoice(data.choiceId)
      this.$store.commit('refreshUserQuizData')
    },
    bookmark (question) {
      if (this.currentQuestion.id !== question.id) {
        this.currentQuestion = question
      }
      this.$store.commit('reloadQuizModel')
      this.quiz.questions.getQuestionById(this.currentQuestion.id).bookmark()
      this.currentQuestion.bookmark()
      this.$store.commit('refreshUserQuizData')

    },
    changeState (question, newState) {
      if (this.currentQuestion.id !== question.id) {
        this.currentQuestion = question
      }
      this.$store.commit('reloadQuizModel')
      this.quiz.questions.getQuestionById(this.currentQuestion.id).changeState(newState)
      this.currentQuestion.changeState(newState)
      this.$store.commit('refreshUserQuizData')
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
      // if (this.currentQuestion.id !== null) {
      //     this.quiz.questions.getQuestionById(this.currentQuestion.id).leaveQuestion()
      // }

      const questIndex = this.quiz.questions.getQuestionIndexById(id),
          questNumber = this.getQuestionNumberFromIndex(questIndex)

      const currentQuestion = this.quiz.questions.getQuestionById(id)
      this.$store.commit('updateCurrentQuestion', currentQuestion)
      // this.quiz.questions.getQuestionById(this.currentQuestion.id).enterQuestion()
      if (parseInt(this.$route.params.questNumber) !== parseInt(questNumber) && this.$route.name !== 'onlineQuiz.konkoorView') {
          this.$router.push({ name: 'onlineQuiz.alaaView', params: { quizId: this.quiz.id, questNumber } })
      }
    },
    // ToDo: change argument (type, questNumber)
    changeView (type) {
      if (type === 'alaa') {
        const questNumber = this.getFirstInViewQuestionNumber()
        this.$router.push({ name: 'onlineQuiz.alaaView', params: { quizId: this.quiz.id, questNumber } })
      }
      if (type === 'konkoor') {
        this.$router.push({ name: 'onlineQuiz.konkoorView', params: { quizId: this.quiz.id } })
      }
    },
  }
}

export default mixinQuiz
