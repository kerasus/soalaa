const mixinQuiz = {
  computed: {
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
    },
    lessons () {
      const lessons = []
      for (let i = 0; i < this.questions.list.length; i++) {
        lessons.push(this.questions.list[i].lesson)
      }
      return lessons.filter(function(item, pos) {
        return lessons.indexOf(item) == pos;
      })
    }
  },
  methods: {
    getQuestionNumberFromIndex (index) {
      index = parseInt(index)
      return index + 1
    },
    getQuestionIndexFromNumber (number) {
      number = parseInt(number)
      return number - 1
    },
    changeQuestion(id) {
      if (parseInt(this.currentQuestion.id) === parseInt(id)) {
        return
      }

      const questIndex = this.quiz.questions.getQuestionIndexById(id),
          questNumber = this.getQuestionNumberFromIndex(questIndex)

      this.currentQuestion = this.quiz.questions.getQuestionById(id)

      if (parseInt(this.$route.params.questNumber) !== parseInt(questNumber)) {
        this.$router.push({ name: 'onlineQuiz.quiz', params: { quizId: this.quiz.id, questNumber } })
      }
    }
  }
}

export default mixinQuiz
