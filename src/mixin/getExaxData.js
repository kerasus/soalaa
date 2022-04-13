import API_ADDRESS from 'src/api/Addresses'

const getQuizData = {
  methods: {
    getQuizData (quizId) {
      return this.$axios.get(API_ADDRESS.exam.showExam(quizId))
    }
  }
}

export default getQuizData
