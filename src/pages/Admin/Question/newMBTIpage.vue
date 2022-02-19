<template>
  <div>
    <div class="fit q-pa-sm">
      <div class="row">
        <div class="col">
          <nav-bar
            v-if="this.checkNavbarVisibility()"
            :question="currentQuestion"
            :edit-status="edit_status"
            :page-name="this.getPageStatus()"
            @create="navBarAction_create"
            @saveDraft="navBarAction_saveDraft"
            @save="navBarAction_save"
            @cancel="navBarAction_cancel"
            @edit="navBarAction_edit"
            @remove="navBarAction_remove"
          />
          <div v-if="this.showQuestionComponentStatus()">
            <mbti-question-layout
              v-if="!loading"
              ref="mtbiQlayout"
              v-model="currentQuestion"
              :status="edit_status"
              @input="updateQuestion"
            />
            <!-- -------------------------- show exams  ---------------------->
            <attach_list
              :status="edit_status"
              :attaches="selectedQuizzes"
              :exam-list="examList"
              :sub-categories="subCategoriesList"
              :loading="attachLoading"
              @detach="detachQuestion"
              @attach="attachQuestion"
            />
          </div>
          <!-- -------------------------- upload file ---------------------->
<!--          ToDo : UploadImg -->
          <UploadImg
            v-if="this.showImgComponentStatus()"
            v-model="currentQuestion"
            :edit-status="upload_img_status"
            @imgClicked="makeShowImgPanelVisible($event)"
          />
          <!-- -------------------------- status --------------------------->
          <div
            v-if="this.getPageStatus() === 'edit'"
            class="my-10"
          >
            <StatusComponent
              :statuses="questionStatuses"
              :loading="changeStatusLoading"
              @update="changeStatus"
            />
          </div>
        </div>
        <!-- -------------------------- show img---------------------------->
        <div
          v-if="uploadImgColsNumber.show"
          class="col-5"
        >
          <ShowImg
            :test="imgSrc"
            @closePanel="makeShowImgPanelInvisible"
          />
        </div>
        <!-- -------------------------- log --------------------------->
        <div
          v-if="currentQuestion.logs.list.length > 0 && !uploadImgColsNumber.show"
          class="col-3"
        >
          <LogListComponent
            :logs="currentQuestion.logs"
            @addComment="addComment"
          />
        </div>
<!--        todo : v-overlay -->
<!--        <v-overlay :value="loading">-->
<!--          <v-progress-circular-->
<!--            :size="70"-->
<!--            :width="7"-->
<!--            indeterminate-->
<!--            color="white"-->
<!--          />-->
<!--        </v-overlay>-->
      </div>
      </div>
    </div>
</template>

<script>
// ToDo eslint
import navBar from 'components/QuestionBank/EditQuestion/NavBar/navBar'
import MbtiQuestionLayout from 'components/QuestionBank/EditQuestion/question-layout/mbti_question_layout'
// eslint-disable-next-line camelcase
import attach_list from 'components/QuestionBank/EditQuestion/Exams/exams'
import StatusComponent from 'components/QuestionBank/EditQuestion/StatusComponent/status'
import LogListComponent from 'components/QuestionBank/EditQuestion/Log/LogList'
import { Question } from 'src/models/Question'
import { Log, LogList } from 'src/models/Log'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import API_ADDRESS from 'src/api/Addresses'
import Assistant from 'src/plugins/assistant'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import axios from 'axios'

export default {
  name: 'NewMBTIPage',
  components: {
    navBar,
    MbtiQuestionLayout,
    StatusComponent,
    LogListComponent,
    attach_list
  },
  data () {
    return {
      optionQuestionId: null,
      temp: null,
      pageStatuses: [
        {
          title: 'show',
          state: false
        },
        {
          title: 'create',
          state: true
        },
        {
          title: 'edit',
          state: false
        }
      ],
      selectedQuizzes: [],
      imgSrc: '',
      urlPathName: '',
      edit_status: true,
      upload_img_status: true,
      NavbarVisibilityOnCreatPage: false,
      selectedField: 0,
      questionColsNumber: 12,
      uploadImgColsNumber: {
        show: false
      },
      choiceRendered: ['', ''],
      displayEditQuestion: false,
      currentQuestion: new Question(),
      examList: new ExamList(),
      subCategoriesList: new QuestSubcategoryList(),
      questionData: {
        statement: '',
        category_id: '',
        sub_category_id: 1,
        order: [],
        choices: [
          {
            title: '',
            order: 1,
            answer: false
          },
          {
            title: '',
            order: 2,
            answer: false
          }
        ]
      },
      totalExams: [],
      trueChoiceIndex: 0,
      questionStatuses: new QuestionStatusList(),
      loading: true,
      attachLoading: false,
      changeStatusLoading: false,
      questionStatusId_draft: null,
      questionStatusId_pending_to_type: null,
      dialog: false,
      questionType: ''
    }
  },
  created () {
    const that = this
    axios.get(API_ADDRESS.option.base + '?type=question_type')
      .then(function (response) {
        const optionQuestion = response.data.data.find(item => (item.value === 'psychometric'))
        if (!optionQuestion) {
          // beterek
          return this.$q.notify({
            message: ' API با مشکل مواجه شد!',
            color: 'negative'
          })
        }

        that.optionQuestionId = optionQuestion.id
        that.loading = false
      })
      .catch(function (error) {
        console.log(error)
      })
    this.setPageStatus()
    this.checkUrl()
    this.getQuestionStatus()
    if (this.getPageStatus() === 'create') {
      // this.showPageDialog() //یاس
      this.setQuestionTypeText()
    } else {
      this.setMainChoicesInOtherModes()
    }
    this.setUploadImgStatus()
  },
  methods: {
    setQuestionTypeText () {
      this.questionType = 'typeText'
      this.dialog = false
      this.checkNavbarVisibilityOnCreatPage()
    },
    addComment (eventData) {
      axios.post(API_ADDRESS.log.addComment(eventData.logId), { comment: eventData.text })
        .then(response => {
          // iterating over the array to find the log that has changed
          for (let i = 0; i < this.currentQuestion.logs.list.length; i++) {
            if (this.currentQuestion.logs.list[i].id === eventData.logId) {
              // setting the new log using Vue.set so that the component notices the change
              this.currentQuestion.logs.list[i] = new Log(response.data.data)
              // ToDo : app.set sth used instead
              // window.app.set(this.currentQuestion, 'logs', new LogList(this.currentQuestion.logs))
              this.currentQuestion.logs.list[i].push(new Log(response.data.data))
            }
          }
        })
    },
    navBarAction_create (statusId) {
      // set status_id
      if (!statusId) {
        statusId = this.questionStatusId_draft
      }
      this.currentQuestion.status_id = statusId

      // set choices
      this.setMainChoicesInCreateMode(statusId) // یاس
    },

    navBarAction_saveDraft () {
      const IdPendingToType = this.questionStatusId_pending_to_type
      this.navBarAction_create(IdPendingToType)
    },

    navBarAction_save () {
      const currentQuestion = this.currentQuestion
      this.$refs.mtbiQlayout.getContent()
      currentQuestion.type_id = this.optionQuestionId
      currentQuestion.update(API_ADDRESS.question.updateQuestion(currentQuestion.id))
        .then(() => {
          this.$q.notify({
            message: 'ویرایش با موفقیت انجام شد',
            color: 'green',
            icon: 'thumb_up'
          })
          this.$router.push({ name: 'question.show', params: { question_id: this.$route.params.question_id } })
        })
    },

    navBarAction_cancel () {
      this.$router.push({ name: 'question.show', params: { question_id: this.$route.params.question_id } })
    },

    navBarAction_edit () {
      this.$router.push({ name: 'question.mbti.edit', params: { question_id: this.$route.params.question_id } })
    },

    navBarAction_remove () {
      const that = this
      this.$store.commit('AppLayout/showConfirmDialog', {
        message: 'از حذف کامل سوال از پایگاه داده و حذف از تمامی آزمون ها اطمینان دارید؟',
        button: {
          no: 'خیر',
          yes: 'بله'
        },
        callback: (confirm) => {
          if (!confirm) {
            return
          }
          axios.delete(API_ADDRESS.question.delete(this.$route.params.question_id))
            .then(() => {
              that.$router.push({ name: 'question.list' })
            })
        }
      })
    },

    setQuestionPhotos (statusId) { // یاس
      this.$store.dispatch('loading/overlayLoading', { loading: true, message: 'کمی صبر کنید...' })
      const formData = new FormData()
      formData.append('status_id', statusId)
      formData.append('statement_photo', this.currentQuestion.statement_photo)
      this.currentQuestion.answer_photos.forEach((item, key) => {
        formData.append('answer_photos[' + key + ']', item)
      })
      axios.post(API_ADDRESS.question.create, formData)
        .then((response) => {
          const questionId = response.data.data.id
          this.$router.push({ name: 'question.show', params: { question_id: questionId } })
          this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
        }).catch(() => {
          this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
        })
    },

    setPageStatus () {
      const title = this.$route.name.replace('question.mbti.', '')
      this.pageStatuses.forEach(item => {
        if (item.title === title) {
          item.state = true
        } else {
          item.state = false
        }
      })
    },

    getPageStatus () {
      const target = this.pageStatuses.find(item => item.state)
      return (target) ? target.title : false
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

    checkUrl () {
      this.edit_status = (this.getPageStatus() === 'create' || this.getPageStatus() === 'edit')
      const that = this
      const loadExamListPromise = this.loadExamList()
      const loadSubcategoriesPromise = this.loadSubcategories()
      Promise.all([loadExamListPromise, loadSubcategoriesPromise])
        .then(() => {
          if (that.getPageStatus() !== 'create') {
            that.loadCurrentQuestionData()
          } else {
            if (that.currentQuestion.choices === null) {
              // that.currentQuestion.choices
            }
            that.currentQuestion = new Question(that.questionData)
            that.loading = false
          }
          that.setNullKeys()
        })
    },

    changeStatus (newStatus) {
      const that = this
      axios.post(API_ADDRESS.question.status.changeStatus(this.$route.params.question_id), {
        status_id: newStatus.changeState,
        comment: newStatus.commentAdded
      })
        .then((response) => {
          that.currentQuestion.status = response.data.data.status
          that.getLogs()
        })
    },

    attachQuestion (item) {
      if (this.getPageStatus() === 'create') {
        this.attachQuestionOnCreateMode(item)
      } else {
        this.attachQuestionOnEditMode(item)
      }
    },

    attachQuestionOnEditMode (item) {
      this.attachLoading = true
      axios.post(API_ADDRESS.question.attach, {
        order: item.order,
        exam_id: item.exam.id,
        question_id: this.$route.params.question_id,
        sub_category_id: item.sub_category.id
      })
        .then(response => {
          this.selectedQuizzes = response.data.data.exams
          this.attachLoading = false
          this.dialog = false
        })
        .catch(() => {
          this.attachLoading = false
          this.dialog = false
        })
    },

    attachQuestionOnCreateMode (item) {
      const targetExamIndex = this.totalExams.findIndex(examItem => Assistant.getId(examItem.id) === Assistant.getId(item.exam.id))
      const selectedQuizzes = this.selectedQuizzes
      this.totalExams[targetExamIndex] = item
      selectedQuizzes.push(JSON.parse(JSON.stringify(this.totalExams[targetExamIndex])))
      window.app.set(this, 'selectedQuizzes', selectedQuizzes)
      this.dialog = false
      this.updateSelectedQuizzes()
    },

    detachQuestion (item) {
      const that = this
      this.$store.commit('AppLayout/showConfirmDialog', {
        message: 'از حذف سوال از آزمون اطمینان دارید؟',
        button: {
          no: 'خیر',
          yes: 'بله'
        },
        callback: (confirm) => {
          if (!confirm) {
            return
          }
          if (this.getPageStatus() === 'create') {
            that.detachQuestionOnCreateMode(item)
          } else {
            that.detachQuestionOnEditMode(item)
          }
        }
      })
    },

    detachQuestionOnEditMode (item) {
      this.attachLoading = true
      axios.post(API_ADDRESS.question.detach(this.$route.params.question_id), {
        detaches: [{
          exam_id: item.exam.id,
          order: item.order,
          sub_category_id: item.sub_category.id
        }]
      })
        .then((response) => {
          this.selectedQuizzes = []
          this.currentQuestion.exams = []
          response.data.data.exams.forEach(item => {
            this.currentQuestion.exams.push(item)
          })
          this.updateSelectedQuizzes()
          this.attachLoading = false
          this.dialog = false
        })
        .catch(() => {
          this.attachLoading = false
          this.dialog = false
        })
    },

    detachQuestionOnCreateMode (item) {
      const detachedExamIndex = this.selectedQuizzes.indexOf(item)
      this.selectedQuizzes.splice(detachedExamIndex, 1)
      this.dialog = false
      this.updateSelectedQuizzes()
    },

    showImgComponentStatus () {
      if (this.getPageStatus() === 'create') {
        return this.questionType === 'typeImage'
      }
      return this.doesPhotosExist()
    },

    showQuestionComponentStatus () {
      if (this.getPageStatus() === 'create') {
        return this.questionType === 'typeText'
      } else if (this.getPageStatus() === 'show') {
        return this.checkTextCondition()
      }
      // in edit page
      return true
    },

    loadCurrentQuestionData () {
      const that = this
      this.loading = true
      this.currentQuestion.show(null, API_ADDRESS.question.updateQuestion(this.$route.params.question_id))
        .then((response) => {
          that.currentQuestion = new Question(response.data.data)
          that.temp = that.currentQuestion
          that.checkTextCondition()
          that.getLogs()
          that.trueChoiceIndex = that.currentQuestion.choices.list.findIndex((item) => item.answer)
          that.updateAttachList(response.data.data.exams)
          this.loading = false
        })
    },

    getLogs () {
      this.currentQuestion.logs.fetch(null, API_ADDRESS.question.log.base(this.$route.params.question_id))
        .then((response) => {
          this.currentQuestion.logs = new LogList(response.data.data)
          window.app.set(this.currentQuestion, 'logs', new LogList(response.data.data))
          this.setQuestionLayoutCols()
        })
    },

    updateQuestion (eventData) {
      this.currentQuestion = new Question(eventData)
      window.app.set(this, 'currentQuestion', new Question(eventData))
    },

    updateAttachList (exams) {
      this.selectedQuizzes = exams
      this.updateSelectedQuizzes()
    },

    updateSelectedQuizzes () {
      const selectedQuizzes = JSON.parse(JSON.stringify(this.selectedQuizzes))
      selectedQuizzes.forEach((item, i) => {
        selectedQuizzes[i].subId = i + 1
      })

      this.selectedQuizzes = selectedQuizzes
    },

    setNullKeys () {
      const currentQuestion = this.currentQuestion
      if (!currentQuestion.statement) {
        currentQuestion.statement = ''
      }
      currentQuestion.choices.list.forEach((item) => {
        if (!item.title) {
          item.title = ''
        }
      })
      if (!currentQuestion.descriptive_answer) {
        currentQuestion.descriptive_answer = ''
      }
    },
    loadExamList () {
      const that = this
      return new ExamList().fetch()
        .then((response) => {
          that.examList = new ExamList(response.data.data)
        })
        .catch(() => {
        })
    },

    loadSubcategories () {
      return this.subCategoriesList.fetch()
        .then((response) => {
          this.subCategoriesList = new QuestSubcategoryList(response.data.data)
        })
        .catch(() => {
        })
    },

    makeShowImgPanelVisible (src) {
      this.imgSrc = src
      this.questionColsNumber = 7
      this.uploadImgColsNumber.show = true
      this.$store.commit('AppLayout/updateDrawer', false)
    },

    makeShowImgPanelInvisible () {
      this.uploadImgColsNumber.show = false
      this.$store.commit('AppLayout/updateDrawer', true)
      if (this.currentQuestion.logs.list.length > 0) {
        this.questionColsNumber = 9
      } else {
        this.questionColsNumber = 12
      }
    },

    setQuestionLayoutCols () {
      if (this.currentQuestion.logs.list.length > 0) {
        this.questionColsNumber = 9
      }
    },

    setInsertedQuestions () { // یاس
      const currentQuestion = this.currentQuestion
      // set exams
      this.$refs.mtbiQlayout.getContent()
      // currentQuestion.descriptive_answer = ""

      currentQuestion.exams = this.selectedQuizzes.map(item => {
        return {
          id: item.exam.id,
          sub_category_id: item.sub_category.id,
          order: item.order
        }
      })
      currentQuestion.type_id = this.optionQuestionId
      currentQuestion
        .create(null, API_ADDRESS.question.createAndAttach())
        .then((response) => {
          this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
          const questionId = response.data.data.id
          this.$router.push({ name: 'question.mbti.show', params: { question_id: questionId } })
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
        })
    },

    doesPhotosExist () {
      if (this.currentQuestion.answer_photos) {
        if (this.currentQuestion.answer_photos.length > 0) {
          return true
        }
      }
      if (this.currentQuestion.statement_photo) {
        if (this.currentQuestion.statement_photo.length > 0) {
          return true
        }
      }
      return false
    },

    setUploadImgStatus () {
      this.upload_img_status = (this.getPageStatus() === 'create')
    },

    setMainChoicesInCreateMode (statusId) {
      if (this.questionType === 'typeText') {
        this.setInsertedQuestions()
      } else if (this.questionType === 'typeImage') {
        if (this.doesPhotosExist()) {
          this.setQuestionPhotos(statusId)
        }
      }
    },

    checkTextCondition () {
      return !!this.currentQuestion.statement
    },

    checkNavbarVisibility () {
      if (this.getPageStatus() === 'create') {
        return this.NavbarVisibilityOnCreatPage
      }
      return true
    },

    checkNavbarVisibilityOnCreatPage () {
      this.NavbarVisibilityOnCreatPage = true
    }
  }
}
</script>
