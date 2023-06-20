import { APIGateway } from 'src/api/APIGateway.js'

const getQuizData = {
  methods: {
    getExamData (examId) {
      return APIGateway.exam.showExam(examId)
    }
  }
}

export default getQuizData
