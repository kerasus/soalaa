import API_ADDRESS from 'src/api/Addresses'
import Assistant from 'src/plugins/assistant'
import { Exam } from 'src/models/Exam'
import { QuestionList } from 'src/models/Question'
import { QuestCategoryList } from 'src/models/QuestCategory'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'

class ShuffleQuestions {
  constructor (questionList) {
    this.questionList = questionList
  }

  run () {
    const questionsBySubcategory = {}
    this.questionList.forEach(item => {
      if (!questionsBySubcategory[item.sub_category.id]) {
        questionsBySubcategory[item.sub_category.id] = []
      }
      questionsBySubcategory[item.sub_category.id].push(item)
    })
    Object.keys(questionsBySubcategory).forEach((item) => {
      questionsBySubcategory[item] = this.shuffle(questionsBySubcategory[item])
    })
    const newArr = []
    Object.keys(questionsBySubcategory).forEach(item => {
      questionsBySubcategory[item].forEach(arrItem => {
        newArr.push(arrItem)
      })
    })
    newArr.forEach((item, index) => {
      item.order = index + 1
    })
    return newArr
  }

  shuffle (array) {
    let currentIndex = array.length; let randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]]
    }

    return array
  }
}

class ExamData {
  constructor (axios) {
    this.$axios = axios
    this.commands = []
    this.questionsFileUrl = null
    this.exam = null
    this.studentReport = null
    this.userExamData = null
  }

  run () {
    let result = Promise.resolve()
    // let reject = Promise.reject(new Error('fail'))
    this.commands.forEach(function (promiseLike) {
      result = result.then(promiseLike)
      result = result.catch(promiseLike)
    })
    return new Promise((resolve, reject) => {
      result.then(resolve)
      result.catch(reject)
    })
  }

  loadQuestionsFromFile (questionsFileUrl) {
    const that = this
    this.commands.push(() => new Promise((resolve, reject) => {
      if (!that.questionsFileUrl && !that.exam) {
        Assistant.handleAxiosError('questionsFileUrl in loadQuestionsFromFile() is not set')
        reject('questionsFileUrl in loadQuestionsFromFile() is not set')
      }
      if (!that.questionsFileUrl && questionsFileUrl) {
        that.questionsFileUrl = questionsFileUrl
      } else if (!that.questionsFileUrl && !questionsFileUrl) {
        that.questionsFileUrl = that.exam.questions_file_url
      }
      this.$axios.get(that.questionsFileUrl, {
        transformRequest: (data, headers) => {
          delete headers.common.Authorization
          return data
        }
      })
        .then(response => {
          let questions = response.data
          if (that.exam.holding_config.randomize_questions) {
            questions = new ShuffleQuestions(questions).run()
          }
          that.exam.questions = new QuestionList(questions)
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
    )
    return this
    // https://node3.alaatv.com/aaa/questionFiles/3a_1400_ensani_final_202104150852_withAnswer.json
  }

  getUserExamWithCorrectAnswers (userExamId, examId) {
    const that = this
    this.commands.push(() => new Promise((resolve, reject) => {
      if (!userExamId && !that.exam) {
        Assistant.handleAxiosError('userExamId in getUserExamWithCorrectAnswers() is not set')
        reject('userExamId in getUserExamWithCorrectAnswers() is not set')
      }
      if (!userExamId) {
        userExamId = that.exam.user_exam_id
      }
      this.$axios.get(API_ADDRESS.exam.getAnswerOfUserWithCorrect(userExamId))
        .then(response => {
          that.exam = new Exam()
          if (examId) {
            that.exam.id = examId
          }
          that.exam.user_exam_id = Assistant.getId(userExamId)
          that.exam.title = response.data.data.exam.title
          that.exam.questions_file_url = response.data.data.exam.questions_file_url
          that.questionsFileUrl = response.data.data.exam.questions_file_url
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
    )
    return this
  }

  getUserExamDataReport (userExamId) {
    const that = this
    this.commands.push(() => new Promise((resolve, reject) => {
      if (!userExamId && !that.exam) {
        Assistant.handleAxiosError('userExamId in getUserExamDataReport() is not set')
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('userExamId in getUserExamDataReport() is not set')
      }
      if (!userExamId) {
        userExamId = that.exam.user_exam_id
      }
      this.$axios.get(API_ADDRESS.exam.report.getReport(userExamId))
        .then(response => {
          that.studentReport = response.data.data
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
    )
    return this
  }

  getUserExamData (userExamId) {
    const that = this
    this.commands.push(() => new Promise((resolve, reject) => {
      if (!userExamId && !that.exam) {
        Assistant.handleAxiosError('userExamId in getUserExamData() is not set')
        reject('userExamId in getUserExamData() is not set')
      }
      if (!userExamId) {
        userExamId = that.exam.user_exam_id
      }
      // if (navigator.onLine) {
      this.$axios.get(API_ADDRESS.exam.getAllAnswerOfUser(userExamId))
        .then(response => {
          that.userExamData = response.data
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      // }
    })
    )
    return this
  }

  getExamDataAndParticipate (examId) {
    const that = this
    this.commands.push(() => new Promise((resolve, reject) => {
      if (!examId && !that.exam) {
        Assistant.handleAxiosError('exam_id in getExamDataAndParticipate() is not set')
        reject('exam_id in getExamDataAndParticipate() is not set')
      }
      if (!examId) {
        examId = that.exam.id
      }
      this.$axios.post(API_ADDRESS.exam.examUser, { exam_id: examId })
        .then(response => {
          that.exam = new Exam()
          // ToDo: attention on user_exam_id and exam_id
          that.exam.id = Assistant.getId(response.data.data.exam_id)
          that.exam.title = Assistant.getId(response.data.data.exam_title)
          that.exam.user_exam_id = Assistant.getId(response.data.data.id)
          that.exam.created_at = response.data.data.created_at
          that.exam.accept_at = response.data.data.accept_at
          that.exam.questions_file_url = response.data.data.questions_file_url
          that.exam.categories = new QuestCategoryList(response.data.data.categories)
          that.exam.sub_categories = new QuestSubcategoryList(response.data.data.sub_categories)
          that.exam.holding_config = response.data.data.holding_config
          that.userExamData = response.data
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
    )
    return this
  }

  getExamData (examId) {
    const that = this
    this.commands.push(() => new Promise((resolve, reject) => {
      if (!examId && !that.exam) {
        Assistant.handleAxiosError('exam_id in getExamData() is not set')
        reject('exam_id in getExamData() is not set')
      }
      if (!examId) {
        examId = that.exam.id
      }
      this.$axios.get(API_ADDRESS.exam.examUserAfterExam + '?exam_id=' + examId)
        .then(response => {
          that.exam = new Exam()
          // ToDo: attention on user_exam_id and exam_id
          that.exam.id = Assistant.getId(response.data.data.exam_id)
          that.exam.title = Assistant.getId(response.data.data.exam_title)
          that.exam.user_exam_id = Assistant.getId(response.data.data.id)
          that.exam.created_at = response.data.data.created_at
          that.exam.accept_at = response.data.data.accept_at
          that.exam.questions_file_url = response.data.data.questions_file_url
          that.exam.categories = new QuestCategoryList(response.data.data.categories)
          that.exam.sub_categories = new QuestSubcategoryList(response.data.data.sub_categories)
          that.exam.holding_config = response.data.data.holding_config
          that.userExamData = response.data
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
    )
    return this
  }
}

export default ExamData
