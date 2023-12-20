import { ExamList } from 'src/models/Exam.js'
import { Question } from 'src/models/Question.js'
import { QuestionStatusList } from 'src/models/QuestionStatus.js'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory.js'
// eslint-disable-next-line no-unused-vars
import { QuestionType, TypeList } from 'src/models/QuestionType.js'
import { Log, LogList } from 'src/models/Log.js'
import { AttachedExamList } from 'src/models/AttachedExam.js'
import { QuestCategoryList } from 'src/models/QuestCategory.js'
import { Notify } from 'quasar'
import mixinTree from 'src/mixin/Tree.js'
import { APIGateway } from 'src/api/APIGateway'
const AdminActionOnQuestion = {
  mixins: [mixinTree],
  data() {
    return {
      typeIdLoading: false,
      optionQuestionId: '',
      questionStatusId_draft: null,
      questionStatusId_pending_to_type: null,
      allTypes: new TypeList(),
      gradesList: null,
      lessonGroupList: null,
      lessonsList: null,
      majorList: null,
      authorshipDatesList: null,
      questionAuthorsList: null,
      questionTargetList: null,
      examList: new ExamList(),
      subCategoriesList: new QuestSubcategoryList(),
      questionStatuses: new QuestionStatusList(),
      categoryList: new QuestCategoryList()
    }
  },
  computed: {
    loadingState() {
      return !!(this.totalLoading || this.examList.loading || this.subCategoriesList.loading || this.questionStatuses.loading)
    },
    totalLoading() {
      return this.examList?.loading || this.typeIdLoading || this.categoryList?.loading || this.subCategoriesList?.loading
    }
  },
  methods: {
    getPageReady() {
      this.getQuestionType(this.question)
      this.loadExamList()
      this.loadCategories()
      this.loadSubcategories()
      this.getQuestionStatus()
    },
    createQuestion(question) {
      // const that = this
      // Todo : for createImg
      // question.apiResource.sendType = 'form-data'
      // this.$store.dispatch('loading/overlayLoading', true)
      // this.$store.dispatch('loading/overlayLoading', false)
      // .loadApiResource()
      APIGateway.question.create(question)
        .then(questionInstance => {
          // console.log(response.data)
          this.$q.notify({
            message: 'ثبت با موفقیت انجام شد',
            color: 'green',
            icon: 'thumb_up'
          })
          // window.open('Admin.Question.Create', '_blank').focus()
          this.redirectToShowPage(questionInstance.id)
          // this.$store.dispatch('loading/overlayLoading', false)
        })
        .catch(er => {
          // this.$store.dispatch('loading/overlayLoading', false)
        })
    },
    getQuestionById(questionId, question, types) {
      const that = this
      APIGateway.question.getQuestion({
        questionId
      })
        .then(function (questionInstance) {
          that.question = new Question(questionInstance)
          that.setQuestionTypeBasedOnId(that.question, types)
          that.disableLoading()
        })
        .catch(() => {
          that.disableLoading()
        })
    },
    updateStatementPhoto() {
      if (this.question.added_statement_photos && this.question.added_statement_photos.length) {
        const formData = new FormData()
        this.question.added_statement_photos.forEach((item, key) => {
          formData.append('files[' + key + ']', item)
        })
        APIGateway.question.updatePhoto({
          type: 'statement_photo',
          questionId: this.question.id,
          data: formData
        })
          .then(question => {
            this.question = new Question(question)
            this.question.added_statement_photos = []
          })
      }
    },
    updateAnswerPhoto() {
      if (this.question.added_answer_photos && this.question.added_answer_photos.length) {
        const formData = new FormData()
        this.question.added_answer_photos.forEach((item, key) => {
          formData.append('files[' + key + ']', item)
        })
        APIGateway.question.updatePhoto({
          type: 'answer_photo',
          questionId: this.question.id,
          data: formData
        })
          .then(question => {
            this.question = new Question(question)
            this.question.added_answer_photos = []
          })
      }
    },
    setQuestionIdentifierData() {
      if (!this.$refs.questionIdentifier) {
        return
      }
      this.$refs.questionIdentifier.getIdentifierData(false)
    },
    updateQuestion(question) {
      const that = this
      // this.$store.dispatch('loading/overlayLoading', { loading: true, message: '' })
      // this.$refs.questionIdentifier.getIdentifierData(false)
      question = {
        ...question,
        level: (this.question.level) ? this.question.level : 1,
        // reference: [this.question.reference],
        // years: this.question.years,
        tags: this.question.tags.list.map(tag => tag.id),
        subject_tags: this.question.subject_tags.list.map(tag => tag.id),
        major: this.question.major
      }
      APIGateway.question.update(question)
        .then((exam) => {
          this.$q.notify({
            message: 'ویرایش با موفقیت انجام شد',
            color: 'green',
            icon: 'thumb_up'
          })
          that.redirectToShowPage(exam.id)
        })
    },
    changeStatus(newStatus) {
      const that = this
      APIGateway.question.changeQuestionStatus({
        questionId: this.$route.params.question_id,
        data: {
          status_id: newStatus.changeState.id,
          comment: newStatus.commentAdded
        }
      })
        .then((question) => {
          that.question.status = question.status
          that.getLogs(that.question.id)
        })
    },
    createQuestionImage(question) {
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
      this.$refs.questionIdentifier.getIdentifierData(false)
      formData.append('level', ((question.level) ? question.level : 1))
      question.author.forEach((item, key) => {
        formData.append('author[' + key + ']', item)
      })
      question.reference.forEach((item, key) => {
        formData.append('reference[' + key + ']', item)
      })
      question.years.forEach((item, key) => {
        formData.append('years[' + key + ']', item)
      })
      question.tags.list.forEach((item, key) => {
        formData.append('tags[' + key + ']', item.id)
      })
      question.subject_tags.list.forEach((item, key) => {
        formData.append('subject_tags[' + key + ']', item.id)
      })
      question.majors.forEach((item, key) => {
        formData.append('majors[' + key + ']', item)
      })
      question.years.forEach((item, key) => {
        formData.append('years[' + key + ']', item)
      })

      // const sendingQuestion = {
      //   ...formData,
      //   author: question.author,
      //   statement: question.statement,
      //   level: ,
      //   reference: question.reference,
      //   years: question.years,
      //   tags: ,
      //   majors: question.majors,
      //   sub_category_id: 1,
      //   recommended_time: 0,
      //   type_id: question.type_id
      // }
      APIGateway.question.createQuestion(formData)
        .then(question => {
          this.redirectToShowPage(question.id)
        })
    },
    setAllQuestionLoadings() {
      this.question.loading = true
      // this.question.type.loading = true
      // Todo : Temp
      // this.question.exams.loading = true
    },
    disableAllQuestionLoadings() {
      this.question.loading = false
    },
    redirectToShowPage(questionId) {
      const routeData = this.$router.resolve({ name: 'Admin.Question.Show', params: { question_id: questionId } })
      window.open(routeData.href, '_blank')
      window.location.reload()
    },
    redirectToEditPage() {
      this.$router.push({ name: 'Admin.Question.Edit', params: { question_id: this.$route.params.question_id } })
    },
    addComment(eventData) {
      APIGateway.exam.addComment({
        logId: eventData.logId,
        data: { comment: eventData.text }
      })
        .then(log => {
          // iterating over the array to find the log that has changed
          for (let i = 0; i < this.question.logs.list.length; i++) {
            if (this.question.logs.list[i].id === eventData.logId) {
              // setting the new log using Vue.set so that the component notices the change
              this.question.logs.list[i] = new Log(log)
              // Vue.set(this.question, 'logs', new LogList(this.question.logs))
            }
          }
        })
    },
    async getQuestionType(question) {
      const that = this
      this.typeIdLoading = true
      try {
        const optionList = await APIGateway.option.getOptions({
          type: 'question_type'
        })
        const types = new TypeList(optionList)
        const optionQuestion = optionList.find(item => (item.value === 'konkur'))
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
        this.typeIdLoading = false
      } catch (e) {
        this.typeIdLoading = false
        this.$q.notify({
          message: ' type id با مشکل مواجه شد!',
          color: 'negative'
        })
      }
    },
    // callTypeIdRequest() {
    //   return APIGateway.option.getOptions({
    //     type: 'question_type'
    //   })
    // },
    async getQuestionTypeForTypeId(question) {
      this.typeIdLoading = true
      try {
        const optionList = await APIGateway.option.getOptions({
          type: 'question_type'
        })
        const types = new TypeList(optionList)
        const optionQuestion = types.list.find(item => (item.value === 'konkur'))
        if (!optionQuestion) {
          return this.$q.notify({
            message: ' API با مشکل مواجه شد!',
            color: 'negative'
          })
        }
        this.getQuestionById(this.getCurrentQuestionId(), question, types)
        this.typeIdLoading = false
      } catch (e) {
        this.typeIdLoading = false
        this.$q.notify({
          message: ' type id با مشکل مواجه شد!',
          color: 'negative'
        })
      }
    },
    readRouteFullPath() {
      return this.$route.fullPath
    },
    readRouteName() {
      return this.$route.name
    },
    doesHaveQuestionMode() {
      return !!(this.readRouteFullPath().includes('text') || this.readRouteFullPath().includes('image'))
    },
    getCurrentQuestionType() {
      // const currentRouteName = this.readRouteName()
      const currentRouteFullPath = this.readRouteFullPath()
      let txtToRemove = '/admin/question/create/text/'
      if (this.getCurrentQuestionMode() === 'Image') {
        txtToRemove = '/admin/question/create/image/'
      }
      return currentRouteFullPath.replace(txtToRemove, '')
    },
    getCurrentQuestionId() {
      return this.$route.params.question_id
    },
    getCurrentQuestionMode() {
      if (this.readRouteName().includes('.Text')) {
        return 'Text'
      } else if (this.readRouteName().includes('.Image')) {
        return 'Image'
      }
    },
    setCurrentQuestionType(question, allTypes) {
      const currentType = this.getCurrentQuestionType()
      let currentValue = ''
      if (currentType === 'mbti') {
        currentValue = 'psychometric'
      } else if (currentType === 'descriptive') {
        currentValue = 'descriptive'
      } else if (currentType === 'multipleChoice') {
        currentValue = 'konkur'
      } else if (currentType === 'groupQuestion') {
        currentValue = 'group_question'
      }
      question.type = allTypes.list.find(item => (item.value === currentValue))
      question.type_id = question.type.id
    },
    setQuestionTypeBasedOnId(question, allTypes) {
      allTypes.list.forEach((item) => {
        if (item.value === question.type.value) {
          question.type.id = item.id
          question.type_id = item.id
        }
      })
      this.getLogs(question.id)
      // console.log('setQuestionTypeBasedOnId question', question)
    },
    getLogs(questionId) {
      const that = this
      APIGateway.question.getActivityLog(questionId)
        .then(function (logList) {
          that.question.logs = new LogList(logList)
        })
    },
    getQuestionStatus() {
      const that = this
      // const list = this.questionStatuses.list
      // that.questionStatuses

      return APIGateway.question.getQuestionStatuses()
        .then(function (questionStatusList) {
          that.questionStatuses = new QuestionStatusList(questionStatusList)
        })
    },
    loadSubcategories() {
      this.subCategoriesList.loading = true
      return APIGateway.questionSubcategory.get()
        .then((questionSubcategory) => {
          this.subCategoriesList = new QuestSubcategoryList(questionSubcategory)
          this.subCategoriesList.loading = false
        })
        .catch(() => {
          this.subCategoriesList.loading = false
        })
    },
    loadExamList() {
      this.examList.loading = true
      APIGateway.exam.getBase()
        .then((examList) => {
          this.examList = new ExamList(examList)
          this.examList.loading = false
        })
        .catch(() => {
          this.examList.loading = false
        })
    },
    loadCategories() {
      const that = this
      this.categoryList.loading = true
      APIGateway.questionCategory.get()
        .then((questionCategory) => {
          that.categoryList = new QuestCategoryList(questionCategory)
          that.categoryList.loading = false
        })
        .catch(() => {
          that.categoryList.loading = false
        })
    },
    attachExam(data) {
      APIGateway.question.attach({
        exam_id: data.exam.id,
        sub_category_id: data.sub_category.id,
        ...(this.question.id) && { question_id: this.question.id },
        order: data.order
      })
        .then(attachedExamList => {
          this.question.exams = new AttachedExamList(attachedExamList)
        })
        .catch((er) => {
          console.error(er)
        })
    },
    detachExam(data) {
      APIGateway.question.detach({
        questionId: this.question.id,
        data: {
          detaches: [data]
        }
      })
        .then(detachedExamList => {
          this.question.exams = new AttachedExamList(detachedExamList)
        })
    },
    openCloseImgPanel() {
      this.isPanelOpened = !this.isPanelOpened
      if (!this.isPanelOpened) {
        this.imgFloatMode = false
      }
    },
    setNodesList() { },
    getGradesList() {
      // console.log('getGradesList')
      this.getRootNode('test').then(gradesList => {
        this.gradesList = gradesList
      })
    },
    loadQuestionAuthors() {
      APIGateway.option.getOptions({
        type: 'reference_type'
      })
        .then((authorsList) => {
          this.questionAuthorsList = authorsList.list
        })
        .catch(() => { })
    },
    loadQuestionTargets() {
      APIGateway.option.getOptions({
        type: 'targets_type'
      })
        .then((TargetsList) => {
          this.questionTargetList = TargetsList.list
        })
        .catch(() => { })
    },
    loadAuthorshipDates() {
      APIGateway.option.getOptions({
        type: 'year_type'
      })
        .then((authorshipDates) => {
          this.authorshipDatesList = authorshipDates.list
        })
        .catch(() => { })
    },
    loadMajorList() {
      APIGateway.option.getOptions({
        type: 'major_type'
      })
        .then((majorList) => {
          this.majorList = majorList.list
        })
        .catch(() => { })
    },
    getLessonGroupList(item) {
      this.getNode(item.id).then(response => {
        this.lessonGroupList = response.data.data.children
      })
    },
    getLessonsList(item) {
      this.getNode(item.id).then(response => {
        this.lessonsList = response.data.data.children
        // console.log('getLessonsList', this.lessonsList)
      })
    },
    setTags(allTags) {
      APIGateway.question.setTags({
        questionId: this.question.id,
        data: allTags
      })
        .then(() => {
        })
    },
    setTagsOnCreate(allTags) {
      // this.question.tags = allTags
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
