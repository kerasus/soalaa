import API_ADDRESS from 'src/api/Addresses'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import { Question } from 'src/models/Question'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
// eslint-disable-next-line no-unused-vars
import { QuestionType, TypeList } from 'src/models/QuestionType'
import { Log, LogList } from 'src/models/Log'
import { AttachedExamList } from 'src/models/AttachedExam'
import { QuestCategoryList } from 'src/models/QuestCategory'
import { Notify } from 'quasar'
const AdminActionOnQuestion = {
  data () {
    return {
      optionQuestionId: '',
      questionStatusId_draft: null,
      questionStatusId_pending_to_type: null,
      allTypes: new TypeList(),
      gradesList: null,
      lessonGroupList: null,
      lessonsList: null,
      majorList: null,
      authorshipDatesList: null,
      questionAuthorsList: null
    }
  },
  computed: {
    loadingState () {
      return !!(this.totalLoading || this.examList.loading || this.subCategoriesList.loading || this.questionStatuses.loading)
    }
  },
  methods: {
    getPageReady () {
      this.getQuestionType(this.question)
      this.loadExamList()
      this.loadCategories()
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
      this.$axios.post(API_ADDRESS.question.base, question)
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
    getQuestionById (questionId, question, types) {
      const that = this
      this.$axios.get(API_ADDRESS.question.show(questionId))
        .then(function (response) {
          that.question = new Question(response.data.data)
          that.setQuestionTypeBasedOnId(that.question, types)
          that.disableLoading()
        })
        .catch(function (error) {
          console.log(error)
          that.disableLoading()
        })
    },
    updateStatementPhoto () {
      if (this.question.added_statement_photos && this.question.added_statement_photos.length) {
        const formData = new FormData()
        this.question.added_statement_photos.forEach((item, key) => {
          formData.append('files[' + key + ']', item)
        })
        this.$axios.post(API_ADDRESS.question.photo('statement_photo', this.question.id), formData)
          .then(res => {
            this.question = new Question(res.data.data)
            this.question.added_statement_photos = []
          })
      }
    },
    updateAnswerPhoto () {
      if (this.question.added_answer_photos && this.question.added_answer_photos.length) {
        const formData = new FormData()
        this.currentQuestion.added_answer_photos.forEach((item, key) => {
          formData.append('files[' + key + ']', item)
        })
        this.$axios.post(API_ADDRESS.question.photo('statement_photo', this.question.id), formData)
          .then(res => {
            this.question = new Question(res.data.data)
            this.question.added_answer_photos = []
          })
      }
    },
    updateQuestion (question) {
      const that = this
      // this.$store.dispatch('loading/overlayLoading', { loading: true, message: '' })
      this.$refs.questionIdentifier.getIdentifierData(false)
      question = {
        ...question,
        level: (this.question.level) ? this.question.level : 1,
        reference: [this.question.reference],
        years: [this.question.years],
        tags: this.question.tags,
        major: this.question.major
      }
      this.$axios.put(API_ADDRESS.question.update(question.id), question)
        .then((response) => {
          this.$q.notify({
            message: 'ویرایش با موفقیت انجام شد',
            color: 'green',
            icon: 'thumb_up'
          })
          that.redirectToShowPage(response.data.data.id)
        })
    },
    changeStatus (newStatus) {
      const that = this
      this.$axios.post(API_ADDRESS.question.status.changeStatus(this.$route.params.question_id), {
        status_id: newStatus.changeState.id,
        comment: newStatus.commentAdded
      })
        .then((response) => {
          that.question.status = response.data.data.status
          that.getLogs(that.question.id)
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
        formData.append('exams[' + key + '][id]', item.exam_id)
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
    disableAllQuestionLoadings () {
      this.question.loading = false
    },
    redirectToShowPage (questionId) {
      this.$router.push({ name: 'Admin.Question.Show', params: { question_id: questionId } })
    },
    redirectToEditPage () {
      this.$router.push({ name: 'Admin.Question.Edit', params: { question_id: this.$route.params.question_id } })
    },
    addComment (eventData) {
      this.$axios.post(API_ADDRESS.log.addComment(eventData.logId), { comment: eventData.text })
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
      this.$axios.get(API_ADDRESS.option.base + '?type=question_type')
        .then(function (response) {
          const types = new TypeList(response.data.data)
          const optionQuestion = response.data.data.find(item => (item.value === 'konkur'))
          if (!optionQuestion) {
            return this.$q.notify({
              message: ' API با مشکل مواجه شد!',
              color: 'negative'
            })
          }
          if (that.doesHaveQuestionMode()) {
            that.setCurrentQuestionType(question, types)
          } else {
            that.allTypes = types
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getQuestionTypeForTypeId (question) {
      const that = this
      this.$axios.get(API_ADDRESS.option.base + '?type=question_type')
        .then(function (response) {
          const types = new TypeList(response.data.data)
          const optionQuestion = response.data.data.find(item => (item.value === 'konkur'))
          if (!optionQuestion) {
            return this.$q.notify({
              message: ' API با مشکل مواجه شد!',
              color: 'negative'
            })
          }
          that.getQuestionById(that.getCurrentQuestionId(), question, types)
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
      return this.$route.params.question_id
    },
    getCurrentQuestionMode () {
      if (this.readRouteName().includes('.Text')) {
        return 'Text'
      } else if (this.readRouteName().includes('.Image')) {
        return 'Image'
      }
    },
    setCurrentQuestionType (question, allTypes) {
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
    },
    setQuestionTypeBasedOnId (question, allTypes) {
      allTypes.list.forEach((item) => {
        if (item.value === question.type.value) {
          question.type.id = item.id
          question.type_id = item.id
        }
      })
      this.getLogs(question.id)
      // console.log('setQuestionTypeBasedOnId question', question)
    },
    getLogs (questionId) {
      const that = this
      this.$axios.get(API_ADDRESS.question.log.base(questionId))
        .then(function (response) {
          that.question.logs = new LogList(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
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
          }
        })
        .catch((er) => {
          console.log(er)
        })
    },
    loadSubcategories () {
      this.subCategoriesList.loading = true
      return this.$axios.get(API_ADDRESS.questionSubcategory.base)
        .then((response) => {
          this.subCategoriesList = new QuestSubcategoryList(response.data.data)
          this.subCategoriesList.loading = false
        })
        .catch(() => {
          this.subCategoriesList.loading = false
        })
    },
    loadExamList () {
      this.examList.loading = true
      this.$axios.get(API_ADDRESS.exam.base())
        .then((response) => {
          this.examList = new ExamList(response.data.data)
          this.examList.loading = false
        })
        .catch(() => {
          this.examList.loading = false
        })
    },
    loadCategories () {
      const that = this
      this.categoryList.loading = true
      this.$axios.get(API_ADDRESS.questionCategory.base)
        .then((response) => {
          that.categoryList = new QuestCategoryList(response.data.data)
          that.categoryList.loading = false
        })
        .catch(() => {
          that.categoryList.loading = false
        })
    },
    attachExam (data) {
      this.$axios.post(API_ADDRESS.question.attach, {
        exam_id: data.exam.id,
        sub_category_id: data.sub_category.id,
        ...(this.question.id) && { question_id: this.question.id },
        order: data.order
      })
        .then(response => {
          this.question.exams = new AttachedExamList(response.data.data.exams)
        })
        .catch((er) => {
          console.log(er)
        })
    },
    detachExam (data) {
      this.$axios.post(API_ADDRESS.question.detach(this.question.id), {
        detaches: [data]
      })
        .then(response => {
          this.question.exams = new AttachedExamList(response.data.data.exams)
        })
        .catch((er) => {
          console.log(er)
        })
    },
    openCloseImgPanel () {
      this.isPanelOpened = !this.isPanelOpened
      if (!this.isPanelOpened) {
        this.imgFloatMode = false
      }
    },
    setNodesList () {},
    getGradesList () {
      // console.log('getGradesList')
      this.getRootNode('test').then(response => {
        this.gradesList = response.data.data.children
      })
    },
    loadQuestionAuthors () {
      this.$axios.get(API_ADDRESS.option.base + '?type=reference_type')
        .then((response) => {
          this.questionAuthorsList = response.data.data
        })
    },
    loadAuthorshipDates () {
      this.$axios.get(API_ADDRESS.option.base + '?type=year_type')
        .then((response) => {
          this.authorshipDatesList = response.data.data
        })
    },
    loadMajorList () {
      this.$axios.get(API_ADDRESS.option.base + '?type=major_type')
        .then((response) => {
          this.majorList = response.data.data
        })
    },
    getLessonGroupList (item) {
      this.getNode(item.id).then(response => {
        this.lessonGroupList = response.data.data.children
      })
    },
    getLessonsList (item) {
      this.getNode(item.id).then(response => {
        this.lessonsList = response.data.data.children
        // console.log('getLessonsList', this.lessonsList)
      })
    },
    setTags (allTags) {
      this.$axios.put(API_ADDRESS.tags.setTags(this.question.id), allTags)
        .then(response => {
          console.log(response.data.data)
        })
        .catch((er) => {
          console.log(er)
        })
    },
    setTagsOnCreate (allTags) {
      this.question.tags = allTags
      if (allTags && allTags.length > 0) {
        Notify.create({
          message: 'ثبت با موفقیت انجام شد',
          color: 'green',
          icon: 'thumb_up'
        })
      } else {
        Notify.create({
          type: 'negative',
          message: 'مشکلی در ثبت بوجود آمده است',
          position: 'top'
        })
      }
      // console.log('this.question', this.question)
    }
  }
}

export default AdminActionOnQuestion
