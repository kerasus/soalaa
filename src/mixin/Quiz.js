import {Quiz} from "@/models/Quiz";
// import 'katex/dist/katex.min.css';
import 'github-markdown-css/github-markdown.css';
import '@/assets/scss/markdownKatex.scss';

const mixinQuiz = {
  watch: {
    'currentQuestion.id' : function (newQuestionId, oldQuestionId) {
      console.log('currentQuestion.id changed: from ' + oldQuestionId + ' to ' + newQuestionId)

      // if (typeof oldQuestionId === 'undefined' || oldQuestionId === null) {
      //   return
      // }
      // this.$store.commit('reloadCurrentQuestionModel')
      // this.quiz.questions.getQuestionById(newQuestionId).enterQuestion()
      // this.quiz.questions.getQuestionById(oldQuestionId).leaveQuestion()
    }
  },
  computed: {
    isQuizPage() {
      return this.$route.name === 'onlineQuiz.quiz'
    },
    userAnswersOfOnlineQuiz() {
      return this.$store.getters.userAnswersOfOnlineQuiz
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
      return this.quiz.sub_categories.getItem('id', this.currentQuestion.sub_category.id)
    }
  },
  methods: {
    loadFirstQuestion () {
      this.loadQuestionByNumber(1)
    },
    loadQuestionByNumber (number) {
      let questionIndex = this.getQuestionIndexFromNumber(number)
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
    },
    changeState (question, newState) {
      if (this.currentQuestion.id !== question.id) {
        this.currentQuestion = question
      }
      this.$store.commit('reloadQuizModel')
      this.quiz.questions.getQuestionById(this.currentQuestion.id).changeState(newState)
    },
    loadQuiz () {
      this.quiz = new Quiz(this.quizData)
      this.quiz.loadSubcategoriesOfCategories()
      this.loadUserQuizData()
    },
    loadUserQuizData () {
      this.$store.commit('loadUserQuizData')
    },
    loadUserAnswers () {
      this.$store.commit('loadUserAnswers')
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
      this.$store.commit('loadUserAnswers')
      let question = this.quiz.questions.getNextQuestion(this.currentQuestion.id)
      if (!question) {
        return
      }
      this.changeQuestion(question.id)
    },
    goToPrevQuestion () {
      this.$store.commit('loadUserAnswers')
      let question = this.quiz.questions.getPrevQuestion(this.currentQuestion.id)
      if (!question) {
        return
      }
      this.changeQuestion(question.id)
    },
    changeQuestion(id) {
      if (parseInt(this.currentQuestion.id) === parseInt(id)) {
        return
      }

      const questIndex = this.quiz.questions.getQuestionIndexById(id),
          questNumber = this.getQuestionNumberFromIndex(questIndex)

      const currentQuestion = this.quiz.questions.getQuestionById(id)
      this.$store.commit('updateCurrentQuestion', currentQuestion)

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
