import API_ADDRESS from 'src/api/Addresses'

const getQuizData = {
  methods: {
    getExamData (examId) {
      return this.$axios.get(API_ADDRESS.exam.showExam(examId))
    }
  }
}

export default getQuizData
