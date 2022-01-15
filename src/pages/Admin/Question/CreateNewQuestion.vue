<template>
  <div class="row q-pa-md">
    <q-dialog persistent v-model="dialog" class="new-question-dialog">
      <q-card class=" bg-grey-1">
        <q-card-section>
          <div class="text-grey-10" style="font-size: 16px;"> سوال را به کدام صورت درج می کنید؟ </div>
          <div class="text-grey-7" style="padding-top: 10px;">لطفا انتخاب کنید که سوال را به کدام روش ثبت می کنید.</div>
        </q-card-section>
        <q-card-actions align="between">
          <q-btn color="amber-4" flat @click="setQuestionTypeText">تایپ سوال</q-btn>
          <q-btn color="amber-4" flat @click="setQuestionTypeImage">آپلود فایل</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="col"
         :class="calcQuestionColsNumber"
    >
      <nav-bar
        v-if="checkNavbarVisibility()"
        :question="currentQuestion"
        :editStatus="edit_status"
        :page-name="getPageStatus()"
        @create="navBarAction_create"
        @saveDraft="navBarAction_saveDraft"
        @save="navBarAction_save"
        @cancel="navBarAction_cancel"
        @edit="navBarAction_edit"
        @remove="navBarAction_remove"
      />
      <div v-if="showQuestionComponentStatus()">
        <question-layout
          v-if="!loading"
          ref="qlayout"
          v-model="currentQuestion"
          :cq="currentQuestion"
          :status="edit_status"
          @updateQuestion="updateQuestion"
        />
        <div class="col-4">
          <q-select
            v-if="getPageStatus() === 'create'"
            v-model="currentQuestion.author"
            label="طراحان"
            dense
            outlined
            rounded
            :options="currentQuestion.author"
            option-label="full_name"
            item-value="id"
            multiple
            disabled
            use-chips
          >
          </q-select>
        </div>
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
      <UploadImg
        v-if="showImgComponentStatus()"
        v-model="currentQuestion"
        :edit-status="upload_img_status"
        @imgClicked="makeShowImgPanelVisible($event)"
      />
      <!-- -------------------------- status --------------------------->
      <div
        v-if="getPageStatus() === 'edit'"
        class="q-my-10"
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
      v-if="currentQuestion.logs && currentQuestion.logs.list && currentQuestion.logs.list.length > 0 && !uploadImgColsNumber.show"
      class="col-3"
    >
      <LogListComponent
        :logs="currentQuestion.logs"
        @addComment="addComment"
      />
    </div>
  </div>
</template>
<script>
import API_ADDRESS from 'src/api/Addresses'
import Assistant from 'src/plugins/assistant'
import navBar from 'components/QuestionBank/EditQuestion/NavBar/navBar.vue'
import QuestionLayout from 'components/QuestionBank/EditQuestion/question-layout/question_layout'
import UploadImg from 'components/QuestionBank/EditQuestion/UploadImgs/uploadImg'
// ToDo eslint
// eslint-disable-next-line camelcase
import attach_list from 'components/QuestionBank/EditQuestion/Exams/exams'
import StatusComponent from 'components/QuestionBank/EditQuestion/StatusComponent/status'
import ShowImg from 'components/QuestionBank/EditQuestion/ShowImg/showImg'
import LogListComponent from 'components/QuestionBank/EditQuestion/Log/LogList'
import { Question } from 'src/models/Question'
import { Log, LogList } from 'src/models/Log'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { QuestionStatusList } from 'src/models/QuestionStatus'
//   ToDo : axios
import axios from 'axios'
// ToDo : remember import ref for set up mode
// import { ref } from 'vue'
export default {
  name: 'NewPage',
  components: {
    navBar,
    QuestionLayout,
    UploadImg,
    attach_list,
    ShowImg,
    StatusComponent,
    LogListComponent
  },
  data () {
    return {
      fucking: '',
      selectedAuthors: [],
      authors: [
        {
          full_name: 'محمد اسماعیلی',
          id: 123
        },
        {
          full_name: 'مصطفی کاظمی',
          id: 1222
        }
      ],
      temp: null,
      pageStatuses: [
        {
          title: 'show',
          state: false
        },
        {
          title: 'create',
          state: false
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
      choiceRendered: ['', '', '', ''],
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
          },
          {
            title: '',
            order: 3,
            answer: false
          },
          {
            title: '',
            order: 4,
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
      questionType: '',
      optionQuestionId: null,
      // ------------------------------test ------------------
      mode: ''
    }
  },
  updated () {

  },
  unmounted () {
    window.onbeforeunload = null
  },
  // beforeRouteLeave (to, from, next) {
  //   console.log(to, from, next)
  // },

  // ToDo : set up mode as an example
  // ---------------------------------------------- USING SET UP MODE (TEMPORARY RIGHT NOW)-----------------------------------------
  // setup () {
  //   const currentQuestion = ref(new Question())
  //   function addComment (eventData) {
  //     axios.post(API_ADDRESS.log.addComment(eventData.logId), { comment: eventData.text })
  //       .then(response => {
  //         // iterating over the array to find the log that has changed
  //         if (currentQuestion.value.logs && currentQuestion.value.logs.list) {
  //           for (let i = 0; i < currentQuestion.value.logs.list.length; i++) {
  //             if (currentQuestion.value.logs.list[i].id === eventData.logId) {
  //               currentQuestion.value.logs.list[i] = new Log(response.data.data)
  //             }
  //           }
  //         }
  //       })
  //   }
  //   return {
  //     currentQuestion,
  //     addComment
  //   }
  // },
  created () {
    console.log('currentQuestion :', this.currentQuestion)
    window.onbeforeunload = function () {
      return 'Do you really want to leave our brilliant application?'
    }
    this.getQuestionType()
    this.setPageStatus()
    this.checkUrl()
    this.getQuestionStatus()
    if (this.getPageStatus() === 'create') {
      this.showPageDialog()
    } else {
      this.setMainChoicesInOtherModes()
    }
    this.setUploadImgStatus()
  },
  computed: {
    calcQuestionColsNumber () {
      return 'col-' + this.questionColsNumber
    }
  },
  methods: {
    getQuestionType () {
      const that = this
      console.log(API_ADDRESS.option.base)
      axios.get(API_ADDRESS.option.base + '?type=question_type')
        .then(function (response) {
          const optionQuestion = response.data.data.find(item => (item.value === 'konkur'))
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
    },

    addComment (eventData) {
      axios.post(API_ADDRESS.log.addComment(eventData.logId), { comment: eventData.text })
        .then(response => {
          // iterating over the array to find the log that has changed
          if (this.currentQuestion.logs && this.currentQuestion.logs.list) {
            for (let i = 0; i < this.currentQuestion.logs.list.length; i++) {
              if (this.currentQuestion.logs.list[i].id === eventData.logId) {
                // setting the new log using Vue.set so that the component notices the change
                // this.currentQuestion.logs.list[i] = new Log(response.data.data)
                // ToDo : app.set sth used instead
                // window.app.set(this.currentQuestion, 'logs', new LogList(this.currentQuestion.logs))
                this.currentQuestion.logs.list[i].push(new Log(response.data.data))
              }
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
      this.selectedAuthors.forEach(author => {
        this.currentQuestion.author.push(this.authors.find(item => item.id === author))
      })

      // set choices
      this.setMainChoicesInCreateMode(statusId)
    },

    navBarAction_saveDraft () {
      const IdPendingToType = this.questionStatusId_pending_to_type
      this.navBarAction_create(IdPendingToType)
    },

    navBarAction_save () {
      console.log('navBarAction_save is run', this.$refs.qlayout.getContent())
      this.$refs.qlayout.getContent()
      const currentQuestion = this.currentQuestion
      currentQuestion.type_id = this.optionQuestionId
      console.log('currentQuestion :', currentQuestion)
      // currentQuestion.update(API_ADDRESS.question.updateQuestion(currentQuestion.id))
      //   .then((res) => {
      //     console.log('res in navbar save action ', res)
      //     this.$q.notify({
      //       message: 'ویرایش با موفقیت انجام شد',
      //       color: 'green',
      //       icon: 'thumb_up'
      //     })
      //     this.$router.push({ name: 'question.show', params: { question_id: this.$route.params.question_id } })
      //   })
    },

    navBarAction_cancel () {
      this.$router.push({ name: 'question.show', params: { question_id: this.$route.params.question_id } })
    },

    navBarAction_edit () {
      this.$router.push({ name: 'question.edit', params: { question_id: this.$route.params.question_id } })
      this.setPageStatus()
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
      this.$store.commit('AppLayout/updateOverlay', { show: true, loading: true, text: 'کمی صبر کنید...' })
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
          this.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: '' })
        }).catch(() => {
          this.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: '' })
        })
    },

    setPageStatus () {
      const title = this.$route.name.replace('question.', '')
      console.log('setPageStatus :', title)
      this.pageStatuses.forEach(item => {
        item.state = item.title === title
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
          if (that.getPageStatus() === 'create') {
            console.log('questionData :', that.questionData)
            that.currentQuestion = new Question(that.questionData)
            console.log('Question :', that.currentQuestion)
            that.loading = false
            // if (that.currentQuestion.choices === null) {
            //   // that.currentQuestion.choices
            // }
          } else {
            that.loadCurrentQuestionData()
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

    fakeQuestion () {
      return {
        id: '5ffdd0d35590063ba07fad39',
        statement: '<p>«إذا أرَدتَ أن تفوز في عملک فَقُم به وحیداً و لا تـتوکّل علی النّاس!»</p>\n',
        choices: [
          {
            title: '<p>هرگاه خواستی که در کارَت موفق شوی به تنهایی به آن بپرداز و بر مردم تکیه نکن!</p>\n',
            order: 1,
            answer: true,
            id: 1
          },
          {
            title: '<p>اگر اراده‌ات بر موفق شدن در کارهایت است به تنهایی آنها را انجام بده و به مردم اعتماد نکن!</p>\n',
            order: 2,
            answer: false,
            id: 2
          },
          {
            title: '<p>چنانچه قصد داری که در کار خویش به نتیجه برسی به تنهایی به پاخیز و به مردم توکّل نکن!</p>\n',
            order: 3,
            answer: false,
            id: 3
          },
          {
            title: '<p>هر زمان که خواستی در کار خود موفق باشی باید به تنهایی انجامش دهی و به مردم تکیه نکنی!</p>\n',
            order: 4,
            answer: false,
            id: 4
          }
        ],
        exams: [],
        level: 1,
        photos: [
          'https://nodes.alaatv.com/aaa/questionPhotos/Screenshot%20from%202021-06-24%2016-21-18-3532494.png'
        ],
        author: [],
        confirmers: [],
        confirmed: false,
        descriptive_answer: null,
        statement_photo: null,
        answer_photos: [],
        status: {
          id: '60c7102418e65826bc7da378',
          title: 'typed',
          display_title: 'تایپ شده',
          updated_at: '2021-06-14 12:45:32',
          created_at: '2021-06-14 12:45:32'
        },
        type: {
          value: 'konkur'
        },
        updated_at: '2021-11-17 11:17:36',
        created_at: '2021-01-12 20:09:47'
      }
    },

    attachQuestionOnCreateMode (item) {
      const targetExamIndex = this.totalExams.findIndex(examItem => Assistant.getId(examItem.id) === Assistant.getId(item.exam.id))
      const selectedQuizzes = this.selectedQuizzes
      this.totalExams[targetExamIndex] = item
      selectedQuizzes.push(JSON.parse(JSON.stringify(this.totalExams[targetExamIndex])))
      // ToDo : app.set
      // window.app.set(this, 'selectedQuizzes', selectedQuizzes)
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
      console.log('loadCurrentQuestionData is run')
      const that = this
      this.loading = true
      this.currentQuestion.show(null, API_ADDRESS.question.updateQuestion(this.$route.params.question_id))
        .then((response) => {
          console.log('load current question ************ : ', response.data.data)
          if (response.data.data) {
            that.currentQuestion = new Question(response.data.data)
            that.fucking = 'new text'
            console.log('fucking currentQuestion question &&&&&&&&&&&&&&&&&&&&&&&&&&&&& :', that.currentQuestion)
            if (that.currentQuestion.type.value === 'psychometric') {
              if (that.getPageStatus() === 'edit') {
                that.$router.push({ name: 'question.mbti.edit', params: { question_id: that.$route.params.question_id } })
              } else if (that.getPageStatus() === 'show') {
                that.$router.push({ name: 'question.mbti.show', params: { question_id: that.$route.params.question_id } })
              }
            }
            that.temp = that.currentQuestion
            that.testMitra = 'hi babe'
            that.checkTextCondition()
            that.getLogs()
            that.trueChoiceIndex = that.currentQuestion.choices.list.findIndex((item) => item.answer)
            that.updateAttachList(response.data.data.exams)
            this.loading = false
          }
        })
    },

    getLogs () {
    //  console.log('getLogs this.currentQuestion :', this.currentQuestion)
      /// console.log('getLogs logs :', this.currentQuestion.logs)
      this.currentQuestion.logs.fetch(null, API_ADDRESS.question.log.base(this.$route.params.question_id))
        .then((response) => {
          this.currentQuestion.logs = new LogList(response.data.data)
          // console.log('cur que log in response :', response.data.data)
          // window.app.set(this.currentQuestion, 'logs', new LogList(response.data.data))
          this.setQuestionLayoutCols()
        })
    },

    updateQuestion (eventData) {
      this.currentQuestion = new Question(eventData)
      console.log('updateQuestion new info in new page *************************** :', this.currentQuestion)
    //  window.app.set(this, 'currentQuestion', new Question(eventData))
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
      if (this.currentQuestion.logs.list && this.currentQuestion.logs.list.length > 0) {
        this.questionColsNumber = 9
      } else {
        this.questionColsNumber = 12
      }
    },

    setQuestionLayoutCols () {
      if (this.currentQuestion.logs.list && this.currentQuestion.logs.list.length > 0) {
        this.questionColsNumber = 9
      }
    },

    showPageDialog () {
      this.dialog = true
    },

    setQuestionTypeText () {
      this.questionType = 'typeText'
      this.dialog = false
      this.checkNavbarVisibilityOnCreatPage()
    },

    setQuestionTypeImage () {
      this.questionType = 'typeImage'
      this.dialog = false
      this.checkNavbarVisibilityOnCreatPage()
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
          this.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: '' })
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
          window.open('/question/create', '_blank').focus()
          this.$router.push({ name: 'question.show', params: { question_id: questionId } })
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

    setMainChoicesInOtherModes () {
      if (this.doesPhotosExist()) {
        this.setQuestionTypeImage()
      } else {
        this.setQuestionTypeText()
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
      if (this.$route.name === 'question.create') {
        this.currentQuestion.author.push({ full_name: this.$store.getters['Auth/user'].full_name, id: this.$store.getters['Auth/user'].id })
        console.log(this.currentQuestion.author)
      }
    },
    // ------------------ test methods -----------------
    setMode (mode) {
      this.mode = mode
      this.dialog = false
    }
  }
}
</script>
<style scoped lang="scss">
.new-question-dialog {
  .q-card__section--vert {
    padding: 24px 24px 14px;
  }
  .q-dialog__inner--minimized > div {
    max-width: 290px;
    max-height: 210px;
  }
  .q-card__actions {
    padding: 0 16px 16px;
  }
}
</style>
