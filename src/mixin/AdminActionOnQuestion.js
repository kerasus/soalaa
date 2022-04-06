import API_ADDRESS from 'src/api/Addresses'
import axios from 'axios'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import { Question } from 'src/models/Question'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
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
    createQuestion (question) {
      console.log('createQuestion', question)
      // const that = this
      // Todo : for createImg
      // question.apiResource.sendType = 'form-data'
      this.$store.dispatch('loading/overlayLoading', true)
      this.$store.dispatch('loading/overlayLoading', false)
      // .loadApiResource()
      axios.post(API_ADDRESS.question.base, question)
        .then(response => {
          console.log(response.data)
          this.$store.dispatch('loading/overlayLoading', false)
        })
        .catch(er => {
          console.log(er)
          this.$store.dispatch('loading/overlayLoading', false)
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
    setAllQuestionLoadings () {
      this.question.loading = true
      // this.question.type.loading = true
      // Todo : Temp
      // this.question.exams.loading = true
    },
    disableAllQuestionLoadings () {
      this.question.loading = false
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
    getQuestionType () {
      const that = this
      axios.get(API_ADDRESS.option.base + '?type=question_type')
        .then(function (response) {
          that.componentTabs = new TypeList(response.data.data)
          const optionQuestion = response.data.data.find(item => (item.value === 'konkur'))
          if (!optionQuestion) {
            return this.$q.notify({
              message: ' API با مشکل مواجه شد!',
              color: 'negative'
            })
          }
          that.setCurrentQuestionType(that.componentTabs)
          that.qTabLoading = false
        })
        .catch(function (error) {
          console.log(error)
          that.qTabLoading = false
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
      const currentRouteName = this.readRouteName()
      const currentRouteFullPath = this.readRouteFullPath()
      if (this.getCurrentQuestionMode() === 'Text') {
        const txtToRemove = 'Admin.Question.Create.Text.'
        return currentRouteName.replace(txtToRemove, '')
      } else {
        const txtToRemove = '/question/create/image/'
        return currentRouteFullPath.replace(txtToRemove, '')
      }
    },
    getCurrentQuestionMode () {
      if (this.readRouteName().includes('.Text')) {
        return 'Text'
      } else if (this.readRouteName().includes('.Image')) {
        return 'Image'
      }
    },
    setCurrentQuestionType (componentTabs) {
      if (this.doesHaveQuestionMode()) {
        // console.log('this.getCurrentQuestionType()')
        const currentType = this.getCurrentQuestionType()
        let cValue = ''
        if (currentType === 'MBTI') {
          cValue = 'psychometric'
        } else if (currentType === 'Descriptive') {
          cValue = 'descriptive'
        } else if (currentType === 'MultipleChoice') {
          cValue = 'konkur'
        }
        if (componentTabs) {
          this.question.type = componentTabs.list.find(item => (item.value === cValue))
        } else {
          this.question.type = new QuestionType({
            value: cValue
          })
        }
        this.question.type_id = this.question.type.id
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
          window.open('Admin.Question.Create', '_blank').focus()
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
      const that = this
      this.$axios.get(API_ADDRESS.exam.base())
        .then((response) => {
          that.examList = new ExamList(response.data.data)
          // console.log('that.examList', that.examList)
        })
        .catch(() => {
        })
    }
  }
}

export default AdminActionOnQuestion
