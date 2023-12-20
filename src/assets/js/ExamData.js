import { APIGateway } from 'src/api/APIGateway.js'
import Assistant from 'src/plugins/assistant'
import { Exam } from 'src/models/Exam'
import { QuestionList } from 'src/models/Question'
import { QuestCategoryList } from 'src/models/QuestCategory'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
// import { axios } from 'src/boot/axios'

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

  async run () {
    let rejectData = null
    for (const command of this.commands) {
      try {
        const promiseCommand = await command()
        if (promiseCommand.type === 'reject') {
          break
        }
      } catch (err) {
        rejectData = err
        break
      }
    }

    return new Promise((resolve, reject) => {
      if (rejectData) {
        reject(rejectData)
      } else {
        resolve()
      }
    })
  }

  loadQuestionsFromFile (questionsFileUrl) {
    const that = this
    this.commands.push(() => new Promise((resolve, reject) => {
      if (!that.questionsFileUrl && !that.exam) {
        Assistant.handleAxiosError('questionsFileUrl in loadQuestionsFromFile() is not set')
        reject({
          data: 'questionsFileUrl in loadQuestionsFromFile() is not set',
          message: 'مشکلی در گرفتن آدرس فایل سوالات رخ داده است.',
          type: 'reject'
        })
      }
      if (!that.questionsFileUrl && questionsFileUrl) {
        that.questionsFileUrl = questionsFileUrl
      } else if (!that.questionsFileUrl && !questionsFileUrl) {
        that.questionsFileUrl = that.exam.questions_file_url
      }
      that.$axios.get(that.questionsFileUrl, {
        transformRequest: (data, headers) => {
          if (headers.common && headers.common.Authorization) {
            delete headers.common.Authorization
          }
          if (headers.Authorization) {
            delete headers.Authorization
          }

          return data
        }
      })
        .then(response => {
          let questions = response.data
          if (that.exam.holding_config.randomize_questions) {
            questions = new ShuffleQuestions(questions).run()
          }
          that.exam.questions = new QuestionList(questions)
          resolve({
            data: response,
            type: 'resolve'
          })
        })
        .catch(error => {
          reject({
            data: error,
            message: 'مشکلی در دریافت فایل سوالات رخ داده است.',
            type: 'reject'
          })
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
        reject({
          data: 'userExamId in getUserExamWithCorrectAnswers() is not set',
          message: 'مشکلی در تشخیص شناسه آزمون جهت گرفتن پاسخ های کاربر رخ داده است.',
          type: 'reject'
        })
      }
      if (!userExamId) {
        userExamId = that.exam.user_exam_id
      }
      APIGateway.exam.getAnswerOfUserWithCorrect(userExamId)
        .then(exam => {
          that.exam = new Exam()
          if (examId) {
            that.exam.id = examId
          }
          that.exam.user_exam_id = Assistant.getId(userExamId)
          that.exam.title = exam.title
          that.exam.questions_file_url = exam.questions_file_url
          that.questionsFileUrl = exam.questions_file_url
          resolve({
            data: exam,
            type: 'resolve'
          })
        })
        .catch(error => {
          reject({
            data: error,
            message: 'مشکلی در دریافت پاسخ های کاربر رخ داده است.',
            type: 'reject'
          })
        })
    })
    )
    return this
  }

  getUserExamDataReport (userExamId, isAdmin = false) {
    const that = this
    this.commands.push(() => new Promise((resolve, reject) => {
      if (!userExamId && !that.exam) {
        Assistant.handleAxiosError('userExamId in getUserExamDataReport() is not set')
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          data: 'userExamId in getUserExamDataReport() is not set',
          message: 'مشکلی در تشخیص شناسه کاربر جهت گرفتن کارنامه رخ داده است.',
          type: 'reject'
        })
      }
      if (!userExamId) {
        userExamId = that.exam.user_exam_id
      }
      if (isAdmin) {
        const params = {
          user_exam_id: userExamId
        }
        APIGateway.exam.adminGetReport({ params })
          .then(report => {
            that.studentReport = report
            resolve(report)
          })
          .catch(error => {
            reject(error)
          })
      } else {
        APIGateway.exam.getReport(userExamId)
          .then(report => {
            that.studentReport = report
            resolve(report)
          })
          .catch(error => {
            reject(error)
          })
      }
    })
    )
    return this
  }

  getUserExamData (userExamId) {
    const that = this
    this.commands.push(() => new Promise((resolve, reject) => {
      if (!userExamId && !that.exam) {
        Assistant.handleAxiosError('userExamId in getUserExamData() is not set')
        reject({
          data: 'userExamId in getUserExamData() is not set',
          message: 'مشکلی در تشخیص شناسه آزمون جهت گرفتن پاسخ های کاربر رخ داده است.',
          type: 'reject'
        })
      }
      if (!userExamId) {
        userExamId = that.exam.user_exam_id
      }
      // if (navigator.onLine) {
      APIGateway.exam.getAllAnswerOfUser(userExamId)
        .then(userExamData => {
          that.userExamData = userExamData
          resolve({
            data: userExamData,
            type: 'resolve'
          })
        })
        .catch(error => {
          reject({
            data: error,
            message: 'مشکلی در دریافت پاسخ های کاربر رخ داده است.',
            type: 'reject'
          })
        })
      // }
    })
    )
    return this
  }

  getExamDataAndParticipate (examId, retake, personal) {
    const that = this
    this.commands.push(() => new Promise((resolve, reject) => {
      if (!examId && !that.exam) {
        Assistant.handleAxiosError('exam_id in getExamDataAndParticipate() is not set')
        reject({
          data: 'exam_id in getExamDataAndParticipate() is not set',
          message: 'مشکلی در تشخیص شناسه آزمون جهت گرفتن پاسخ های کاربر رخ داده است.',
          type: 'reject'
        })
      }
      if (!examId) {
        examId = that.exam.id
      }
      const data = { exam_id: examId }
      if (retake) {
        data.retake = true
      }
      const participateData = {
        data,
        personal,
        examId
      }
      APIGateway.exam.participate(participateData)
        .then(userExamData => {
          that.exam = new Exam()
          // ToDo: attention on user_exam_id and exam_id
          that.exam.id = Assistant.getId(userExamData.exam_id)
          that.exam.title = Assistant.getId(userExamData.exam_title)
          that.exam.user_exam_id = Assistant.getId(userExamData.id)
          that.exam.created_at = userExamData.created_at
          that.exam.accept_at = userExamData.accept_at
          that.exam.questions_file_url = userExamData.questions_file_url
          that.exam.categories = new QuestCategoryList(userExamData.categories)
          that.exam.sub_categories = new QuestSubcategoryList(userExamData.sub_categories)
          that.exam.holding_config = userExamData.holding_config
          that.userExamData = userExamData
          resolve({
            data: userExamData,
            type: 'resolve'
          })
        })
        .catch(error => {
          reject({
            data: error,
            type: 'reject'
          })
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
        reject({
          data: 'exam_id in getExamData() is not set',
          type: 'reject'
        })
      }
      if (!examId) {
        examId = that.exam.id
      }
      APIGateway.exam.examUserAfterExam(examId)
        .then(userExamData => {
          that.exam = new Exam()
          // ToDo: attention on user_exam_id and exam_id
          that.exam.id = Assistant.getId(userExamData.exam_id)
          that.exam.title = Assistant.getId(userExamData.exam_title)
          // that.exam.user_exam_id = Assistant.getId(userExamData.id)
          that.exam.created_at = userExamData.created_at
          // that.exam.accept_at = userExamData.accept_at
          // that.exam.questions_file_url = userExamData.questions_file_url
          that.exam.categories = new QuestCategoryList(userExamData.categories)
          that.exam.sub_categories = new QuestSubcategoryList(userExamData.sub_categories)
          that.exam.holding_config = userExamData.holding_config
          // that.userExamData = userExamData
          resolve({
            data: userExamData,
            type: 'resolve'
          })
        })
        .catch(error => {
          reject({
            data: error,
            type: 'reject'
          })
        })
    })
    )
    return this
  }
}

export default ExamData
