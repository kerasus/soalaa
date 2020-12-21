const mixinQuiz = {
  computed: {
    mapOfQuestionDrawer: {
      get() {
        return this.$store.getters.mapOfQuestionsDrawer
      },
      set(newInfo) {
        this.$store.commit('updateMapOfQuestionsDrawer', newInfo)
      }
    },
    isQuizPage() {
      return this.$store.getters.isQuizPage
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
    }
  },
  methods: {
    getQuestionIndexFromNumber (index) {
      index = parseInt(index)
      return index + 1
    },
    toggleMapOfQuestionsDrawer() {
      this.$store.commit('updateMapOfQuestionsDrawer', !this.$store.getters.mapOfQuestionsDrawer)
    },
    changeQuestion(id) {
      const questIndex = this.quiz.questions.getQuestionIndexById(id),
          questNumber = this.getQuestionIndexFromNumber(questIndex)
      this.$router.push({ name: 'onlineQuiz.quiz', params: { quizId: this.quiz.id, questNumber } })
      this.currentQuestion = this.quiz.questions.getQuestionById(id)
    }
  }
}

export default mixinQuiz
