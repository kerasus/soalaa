import API_ADDRESS from 'src/api/Addresses'
import axios from 'axios'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import { Question } from 'src/models/Question'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { TypeList } from 'src/models/QuestionType'
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
      question.apiResource.sendType = 'form-data'
      this.$axios.post(API_ADDRESS.question.create, question.loadApiResource())
        .then(response => {
          console.log(response.data)
        })
    },
    setAllQuestionLoadings () {
      this.question.loading = true
      // this.question.type.loading = true
      // Todo : Temp
      // this.question.exams.loading = true
    },
    addComment (eventData) {
      axios.post(API_ADDRESS.log.addComment(eventData.logId), { comment: eventData.text })
        .then(response => {
          // iterating over the array to find the log that has changed
          for (let i = 0; i < this.currentQuestion.logs.list.length; i++) {
            if (this.currentQuestion.logs.list[i].id === eventData.logId) {
              // setting the new log using Vue.set so that the component notices the change
              this.currentQuestion.logs.list[i] = new Log(response.data.data)
              Vue.set(this.currentQuestion, 'logs', new LogList(this.currentQuestion.logs))
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
          that.setCurrentQuestionType()
          that.qTabLoading = false
        })
        .catch(function (error) {
          console.log(error)
          that.qTabLoading = false
        })
    },
    readRouteName () {
      return this.$route.name
    },
    doesHaveQuestionType () {
      return !!(this.readRouteName().includes('.Text') || this.readRouteName().includes('.Image'))
    },
    getCurrentQuestionType () {
      const currentRoute = this.$route.name
      const txtToRemove = 'Admin.Question.Create.' + this.getCurrentQuestionMode() + '.'
      return currentRoute.replace(txtToRemove, '')
    },
    getCurrentQuestionMode () {
      if (this.readRouteName().includes('.Text')) {
        return 'Text'
      } else if (this.readRouteName().includes('.Image')) {
        return 'Image'
      }
    },
    setCurrentQuestionType () {
      if (this.doesHaveQuestionType()) {
        // console.log('this.getCurrentQuestionType()', this.getCurrentQuestionType())
        const currentType = this.getCurrentQuestionType()
        let cValue = ''
        if (currentType === 'MBTI') {
          cValue = 'psychometric'
        } else if (currentType === 'Descriptive') {
          cValue = 'descriptive'
        } else if (currentType === 'MultipleChoice') {
          cValue = 'konkur'
        }
        this.question.type = this.componentTabs.list.find(item => (item.value === cValue))
        // console.log('this.question.type before nav', this.question.type.componentName)
        // this.setInitialType()
      }
    },
    getQuestionStatus () {
      const that = this
      const list = this.questionStatuses.list
      return that.questionStatuses.fetch()
        .then((response) => {
          that.questionStatuses = new QuestionStatusList(response.data.data)
          that.questionStatusId_draft = list.find(item => item.title === 'draft').id
          that.questionStatusId_pending_to_type = list.find(item => item.title === 'pending_to_type').id
        })
        .catch(() => {
        })
    },
    loadCurrentQuestionData () {
      const that = this
      this.currentQuestion.show(null, API_ADDRESS.question.updateQuestion(this.$route.params.question_id))
        .then((response) => {
          if (response.data.data) {
            that.currentQuestion = new Question(response.data.data)
            if (that.currentQuestion.type.value === 'psychometric') {
              if (that.getPageStatus() === 'Edit') {
                that.$router.push({ name: 'question.mbti.edit', params: { question_id: that.$route.params.question_id } })
              } else if (that.getPageStatus() === 'Show') {
                that.$router.push({ name: 'question.mbti.show', params: { question_id: that.$route.params.question_id } })
              }
            }
            that.temp = that.currentQuestion
            that.checkTextCondition()
            that.getLogs()
            that.trueChoiceIndex = that.currentQuestion.choices.list.findIndex((item) => item.answer)
            that.updateAttachList(response.data.data.exams)
            this.loading = false
          }
        })
    },
    checkTextCondition () {
      return !!this.currentQuestion.statement
    },
    setInsertedQuestions () {
      this.$refs.qlayout.getContent()
      const currentQuestion = this.currentQuestion
      // set exams
      currentQuestion.exams = this.selectedQuizzes.map(item => {
        return {
          id: item.exam.id,
          sub_category_id: item.sub_category.id,
          order: item.order
        }
      })
      currentQuestion.type_id = this.optionQuestionId
      currentQuestion
        .create()
        .then((response) => {
          this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
          const questionId = response.data.data.id
          this.questionType = 'typeText'
          this.currentQuestion.statement = ''
          this.currentQuestion.choices.list.forEach((item) => {
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
