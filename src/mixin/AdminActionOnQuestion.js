import API_ADDRESS from 'src/api/Addresses'
import axios from 'axios'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import { Question } from 'src/models/Question'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
// eslint-disable-next-line no-unused-vars
import { QuestionType, TypeList } from 'src/models/QuestionType'
import { Log } from 'src/models/Log'
const AdminActionOnQuestion = {
  data () {
    return {
      optionQuestionId: '',
      questionStatusId_draft: null,
      questionStatusId_pending_to_type: null
    }
  },
  methods: {
    getPageReady () {
      this.getQuestionType(this.question)
      this.loadExamList()
      this.loadSubcategories()
      this.getQuestionStatus()
    },
    createQuestion (question) {
      // const that = this
      // Todo : for createImg
      // question.apiResource.sendType = 'form-data'
      this.$store.dispatch('loading/overlayLoading', true)
      this.$store.dispatch('loading/overlayLoading', false)
      // .loadApiResource()
      axios.post(API_ADDRESS.question.base, question)
        .then(response => {
          // console.log(response.data)
          this.$q.notify({
            message: 'ثبت با موفقیت انجام شد',
            color: 'green',
            icon: 'thumb_up'
          })
          // window.open('Admin.Question.Create', '_blank').focus()
          this.redirectToShowPage(response.data.data.id)
          this.$store.dispatch('loading/overlayLoading', false)
        })
        .catch(er => {
          console.log(er.message)
          this.$store.dispatch('loading/overlayLoading', false)
        })
    },
    getQuestionById (questionId) {
      const that = this
      axios.get(API_ADDRESS.question.show(questionId))
        .then(function (response) {
          that.question = new Question(response.data.data)
          // const types = new TypeList(response.data.data)
          // const optionQuestion = response.data.data.find(item => (item.value === 'konkur'))
          // if (!optionQuestion) {
          //   return this.$q.notify({
          //     message: ' API با مشکل مواجه شد!',
          //     color: 'negative'
          //   })
          // }
          // that.setCurrentQuestionType(question, types)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    saveQuestion () {
      const that = this
      this.$store.dispatch('loading/overlayLoading', { loading: true, message: '' })
      const currentQuestion = this.currentQuestion
      this.question.type_id = this.optionQuestionId
      currentQuestion.update(API_ADDRESS.question.updateQuestion(currentQuestion.id))
        .then(() => {
          this.$q.notify({
            message: 'ویرایش با موفقیت انجام شد',
            color: 'green',
            icon: 'thumb_up'
          })
          that.$store.dispatch('loading/overlayLoading', { loading: true, message: '' })
          this.$router.push({ name: 'Admin.Question.Show', params: { question_id: this.$route.params.question_id } })
        })
    },
    createQuestionImage (question) {
      const formData = new FormData()
      // formData.append('status_id', statusId);
      question.statement_photo.forEach((item, key) => {
        formData.append('statement_photo[' + key + ']', item)
      })
      question.answer_photos.forEach((item, key) => {
        formData.append('answer_photos[' + key + ']', item)
      })
      question.exams.list.forEach((item, key) => {
        formData.append('exams[' + key + '][id]', item.id)
        formData.append('exams[' + key + '][order]', item.order)
        formData.append('exams[' + key + '][sub_category_id]', item.sub_category_id)
      })
      formData.append('type_id', question.type_id)
      this.$axios.post(API_ADDRESS.question.create, formData)
        .then(response => {
          this.redirectToShowPage(response.data.data.id)
        })
    },
    setAllQuestionLoadings () {
      this.question.loading = true
      // this.question.type.loading = true
      // Todo : Temp
      // this.question.exams.loading = true
    },
    detachUnsavedExam (exam) {
      this.question.exams.list = this.question.exams.list.filter(item => item.id !== exam.id && item.sub_category_id === exam.sub_category_id)
    },
    detachSavedExam (exam) {
      this.$axios.post(API_ADDRESS.question.detach(this.question.id), {
        detaches: [{
          exam_id: exam.exam.id,
          order: exam.order,
          sub_category_id: exam.sub_category.id
        }]
      })
        .then(response => {
          this.question = new Question(response.data.data)
        })
    },
    disableAllQuestionLoadings () {
      this.question.loading = false
    },
    redirectToShowPage (questionId) {
      this.$router.push({ name: 'Admin.Question.Show', params: { question_id: questionId } })
    },
    addComment (eventData) {
      axios.post(API_ADDRESS.log.addComment(eventData.logId), { comment: eventData.text })
        .then(response => {
          // iterating over the array to find the log that has changed
          for (let i = 0; i < this.question.logs.list.length; i++) {
            if (this.question.logs.list[i].id === eventData.logId) {
              // setting the new log using Vue.set so that the component notices the change
              this.question.logs.list[i] = new Log(response.data.data)
              // Vue.set(this.question, 'logs', new LogList(this.question.logs))
            }
          }
        })
    },
    getQuestionType (question) {
      const that = this
      axios.get(API_ADDRESS.option.base + '?type=question_type')
        .then(function (response) {
          const types = new TypeList(response.data.data)
          const optionQuestion = response.data.data.find(item => (item.value === 'konkur'))
          if (!optionQuestion) {
            return this.$q.notify({
              message: ' API با مشکل مواجه شد!',
              color: 'negative'
            })
          }
          that.setCurrentQuestionType(question, types)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    readRouteFullPath () {
      return this.$route.fullPath
    },
    readRouteName () {
      return this.$route.name
    },
    doesHaveQuestionMode () {
      return !!(this.readRouteFullPath().includes('text') || this.readRouteFullPath().includes('image'))
    },
    getCurrentQuestionType () {
      // const currentRouteName = this.readRouteName()
      const currentRouteFullPath = this.readRouteFullPath()
      let txtToRemove = '/question/create/text/'
      if (this.getCurrentQuestionMode() === 'Image') {
        txtToRemove = '/question/create/image/'
      }
      return currentRouteFullPath.replace(txtToRemove, '')
    },
    getCurrentQuestionId () {
      const currentRouteFullPath = this.readRouteFullPath()
      const txtToRemove = '/question/'
      if (currentRouteFullPath.includes('edit')) {
        currentRouteFullPath.replace('edit', '')
      }
      return currentRouteFullPath.replace(txtToRemove, '')
    },
    getCurrentQuestionMode () {
      if (this.readRouteName().includes('.Text')) {
        return 'Text'
      } else if (this.readRouteName().includes('.Image')) {
        return 'Image'
      }
    },
    setCurrentQuestionType (question, allTypes) {
      if (this.doesHaveQuestionMode()) {
        const currentType = this.getCurrentQuestionType()
        let currentValue = ''
        if (currentType === 'mbti') {
          currentValue = 'psychometric'
        } else if (currentType === 'descriptive') {
          currentValue = 'descriptive'
        } else if (currentType === 'multipleChoice') {
          currentValue = 'konkur'
        }
        question.type = allTypes.list.find(item => (item.value === currentValue))
        question.type_id = question.type.id
      }
    },
    getQuestionStatus () {
      const that = this
      // const list = this.questionStatuses.list
      // that.questionStatuses
      return this.$axios.get(API_ADDRESS.question.status.base)
        .then(function (response) {
          that.questionStatuses = new QuestionStatusList(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    loadQuestionData () {
      const that = this
      this.question.show(null, API_ADDRESS.question.updateQuestion(this.$route.params.question_id))
        .then((response) => {
          if (response.data.data) {
            that.question = new Question(response.data.data)
            // that.checkTextCondition()
            // that.getLogs()
            // that.trueChoiceIndex = that.question.choices.list.findIndex((item) => item.answer)
            // that.updateAttachList(response.data.data.exams)
          }
        })
        .catch((er) => {
          console.log(er)
        })
    },
    checkTextCondition () {
      return !!this.question.statement
    },
    setInsertedQuestions () {
      this.$refs.qlayout.getContent()
      const question = this.question
      // set exams
      question.exams = this.selectedQuizzes.map(item => {
        return {
          id: item.exam.id,
          sub_category_id: item.sub_category.id,
          order: item.order
        }
      })
      question.type_id = this.optionQuestionId
      question
        .create()
        .then((response) => {
          this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
          const questionId = response.data.data.id
          this.questionType = 'typeText'
          this.question.statement = ''
          this.question.choices.list.forEach((item) => {
            item.title = ''
          })
          this.$q.notify({
            message: 'ثبت با موفقیت انجام شد',
            color: 'green',
            icon: 'thumb_up'
          })
          // window.open('Admin.Question.Create', '_blank').focus()
          this.$router.push({ name: 'Admin.Question.Show', params: { question_id: questionId } })
        })
    },
    loadSubcategories () {
      const that = this
      return this.$axios.get(API_ADDRESS.questionSubcategory.base)
        .then((response) => {
          that.subCategoriesList = new QuestSubcategoryList(response.data.data)
          // console.log('this.subCategoriesList', this.subCategoriesList)
        })
        .catch(() => {
        })
    },
    loadExamList () {
      // const that = this
      this.$axios.get(API_ADDRESS.exam.base())
        .then((response) => {
          this.examList = new ExamList(response.data.data)
          // console.log('that.examList', that.examList)
        })
        .catch(() => {
        })
    }
  }
}

export default AdminActionOnQuestion
