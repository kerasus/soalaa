<template>
  <div id="app">
    <v-container
      :fluid="true"
      class="pa-6"
    >
      <v-row>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="290"
        >
          <v-card>
            <v-card-title class="dialog-title">
              سوال را به کدام صورت درج می کنید؟
            </v-card-title>
            <v-card-text> لطفا انتخاب کنید که سوال را به کدام روش ثبت می کنید.</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="amber lighten-1"
                text
                @click="setQuestionTypeText"
              >
                تایپ سوال
              </v-btn>
              <v-spacer class="mx-10" />
              <v-btn
                color="amber lighten-1"
                text
                @click="setQuestionTypeImage"
              >
                آپلود فایل
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-col :cols="questionColsNumber">
          <nav-bar
            v-if="checkNavbarVisibility()"
            :question="currentQuestion"
            :edit-status="edit_status"
            :page-name="getPageStatus()"
            @create="navBarAction_create"
            @saveDraft="navBarAction_saveDraft"
            @save="navBarAction_save"
            @cancel="navBarAction_cancel"
            @edit="navBarAction_edit"
            @remove="navBarAction_remove"
          />
          <!-- -------------------------- upload file ---------------------->
          <UploadImg
              v-if="showImgComponentStatus()"
              v-model="currentQuestion"
              :edit-status="upload_img_status"
              @imgClicked="makeShowImgPanelVisible($event)"
          />

          <div v-if="showQuestionComponentStatus()">
            <question-layout
              v-if="!loading && this.questionType === 'typeText'"
              ref="qlayout"
              v-model="currentQuestion"
              :status="edit_status"
              @input="updateQuestion"
            />
            <v-col cols="4">
              <v-select
                v-if="getPageStatus() === 'create'"
                v-model="currentQuestion.author"
                label="طراحان"
                dense
                multiple
                disabled
                chips
                :items="currentQuestion.author"
                item-text="full_name"
                item-value="id"
                outlined
              />
            </v-col>
          </div>
            <!-- -------------------------- show exams  ---------------------->
          <attach_list
              v-if="showExamsListComponent"
              :status="edit_status"
              :attaches="selectedQuizzes"
              :exam-list="examList"
              :sub-categories="subCategoriesList"
              :loading="attachLoading"
              @detach="detachQuestion"
              @attach="attachQuestion"
          />
          <!-- -------------------------- status --------------------------->
          <div
            v-if="getPageStatus() === 'edit'"
            class="my-10"
          >
            <StatusComponent
              :statuses="questionStatuses"
              :loading="changeStatusLoading"
              @update="changeStatus"
            />
          </div>
        </v-col>
        <!-- -------------------------- show img---------------------------->
        <v-col
          v-if="uploadImgColsNumber.show"
          :cols="5"
        >
          <ShowImg
            :test="imgSrc"
            @closePanel="makeShowImgPanelInvisible"
          />
        </v-col>
        <!-- -------------------------- log --------------------------->
        <v-col
          v-if="currentQuestion.logs.list.length > 0 && !uploadImgColsNumber.show"
          :cols="3"
        >
          <LogListComponent
            :logs="currentQuestion.logs"
            @addComment="addComment"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from 'vue'
import navBar from '@/components/QuestionBank/EditQuestion/NavBar/navBar.vue';
import QuestionLayout from '@/components/QuestionBank/EditQuestion/question-layout/question_layout';
import UploadImg from '@/components/QuestionBank/EditQuestion/UploadImgs/uploadImg';
import attach_list from '@/components/QuestionBank/EditQuestion/Exams/exams';
import StatusComponent from '@/components/QuestionBank/EditQuestion/StatusComponent/status';
import ShowImg from '@/components/QuestionBank/EditQuestion/ShowImg/showImg';
import LogListComponent from '@/components/QuestionBank/EditQuestion/Log/LogList';
import {Question} from '@/models/Question'
import {Log, LogList} from '@/models/Log'
import {ExamList} from "@/models/Exam";
import {QuestSubcategoryList} from "@/models/QuestSubcategory";
import API_ADDRESS from "@/api/Addresses";
import Assistant from "@/plugins/assistant";
import {QuestionStatusList} from "@/models/QuestionStatus";
import axios from 'axios'

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
  data() {
    return {
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
      NavbarVisibilityOnCreatPage:false,
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
      optionQuestionId: null
    }
  },
  destroyed() {
    window.onbeforeunload = null
  },
  // beforeRouteLeave (to, from, next) {
  //   console.log(to, from, next)
  // },
  created() {
    window.onbeforeunload = function() {
      return "Do you really want to leave our brilliant application?";
    };

    let that = this
    axios.get(API_ADDRESS.option.base + '?type=question_type')
        .then(function (response) {
          const optionQuestion = response.data.data.find(item => (item.value==='konkur'))
          if (!optionQuestion) {
            // beterek
            return this.$notify({
              group: 'notifs',
              text: ' API با مشکل مواجه شد!',
              type: 'error'
            })
          }
          that.optionQuestionId = optionQuestion.id
          that.loading = false
        })
        .catch(function (error) {
          console.log(error);
        })

    this.setPageStatus()
    this.checkUrl()
    this.getQuestionStatus()
    if (this.getPageStatus() === 'create') {
      this.showPageDialog() //یاس
    } else {
      this.setMainChoicesInOtherModes()
    }
    this.setUploadImgStatus()
  },
  methods: {
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
    navBarAction_create(statusId) {
      // set status_id
      if (!statusId) {
        statusId = this.questionStatusId_draft
      }
      this.currentQuestion.status_id = statusId
      this.selectedAuthors.forEach(author => {
        this.currentQuestion.author.push(this.authors.find(item => item.id === author))
      })

      // set choices
      this.setMainChoicesInCreateMode(statusId)   //یاس
    },

    navBarAction_saveDraft() {
      var IdPendingToType = this.questionStatusId_pending_to_type
      this.navBarAction_create(IdPendingToType)
    },

    navBarAction_save() {
      this.$refs.qlayout.getContent()
      var currentQuestion = this.currentQuestion
      currentQuestion.type_id = this.optionQuestionId
      currentQuestion.update(API_ADDRESS.question.updateQuestion(currentQuestion.id))
        .then(() => {
          this.$notify({
            group: 'notifs',
            title: 'توجه',
            text: 'ویرایش با موفقیت انجام شد',
            type: 'success'
          })
          this.$router.push({name: 'question.show', params: {question_id: this.$route.params.question_id}})
        })
    },

    navBarAction_cancel() {
      this.$router.push({name: 'question.show', params: {question_id: this.$route.params.question_id}})
    },

    navBarAction_edit() {
      this.$router.push({name: 'question.edit', params: {question_id: this.$route.params.question_id}})
    },

    navBarAction_remove() {
      let that = this
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
                that.$router.push({name: 'question.list'})
              })
        }
      })
    },

    setQuestionPhotos(statusId) {
      // let question = this.currentQuestion
      this.currentQuestion.exams = this.selectedQuizzes.map(item => {
        return {
          id: item.exam.id,
          sub_category_id: item.sub_category.id,
          order: item.order
        }
      })
     this.$store.commit('AppLayout/updateOverlay', {show: true, loading: true, text: 'کمی صبر کنید...'})
      let formData = new FormData();
      formData.append('status_id', statusId);
      formData.append('statement_photo', this.currentQuestion.statement_photo);
      this.currentQuestion.answer_photos.forEach((item, key) => {
        formData.append('answer_photos[' + key + ']', item)
      })
      formData.append('type_id', this.optionQuestionId)
      formData.append('exams', JSON.stringify(this.currentQuestion.exams))
      // this.currentQuestion.exams.forEach((item ,key) => {
      //   formData.append('exams[' + key + ']', item);
      // })
      axios.post(API_ADDRESS.question.create, formData)
          .then((response) => {
           const questionId = response.data.data.id
            this.$router.push({name: 'question.show', params: {question_id: questionId}})
            this.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
          }).catch(() => {
        this.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
      });
    },

    setPageStatus() {
      const title = this.$route.name.replace('question.', '')
      this.pageStatuses.forEach(item => {
        if (item.title === title) {
          item.state = true
        } else {
          item.state = false
        }
      })
    },

    getPageStatus() {
      const target = this.pageStatuses.find(item => item.state)
      return (target) ? target.title : false
    },

    getQuestionStatus() {
      let that = this
      var list = this.questionStatuses.list
      return that.questionStatuses.fetch()
          .then((response) => {
            that.questionStatuses = new QuestionStatusList(response.data.data)
            that.questionStatusId_draft = list.find(item => item.title === 'draft').id
            that.questionStatusId_pending_to_type = list.find(item => item.title === 'pending_to_type').id

          })
          .catch(() => {
          })
    },

    checkUrl() {
      this.edit_status = (this.getPageStatus() === 'create' || this.getPageStatus() === 'edit');
      let that = this
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

    changeStatus(newStatus) {
      let that = this
      axios.post(API_ADDRESS.question.status.changeStatus(this.$route.params.question_id), {
        status_id: newStatus.changeState,
        comment: newStatus.commentAdded
      })
          .then((response) => {
            that.currentQuestion.status = response.data.data.status
            that.getLogs()
          })
    },

    attachQuestion(item) {
      if (this.getPageStatus() === 'create') {
        this.attachQuestionOnCreateMode(item)
      } else {
        this.attachQuestionOnEditMode(item)
      }
    },

    attachQuestionOnEditMode(item) {
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

    attachQuestionOnCreateMode(item) {
      const targetExamIndex = this.totalExams.findIndex(examItem => Assistant.getId(examItem.id) === Assistant.getId(item.exam.id))
      let selectedQuizzes = this.selectedQuizzes
      this.totalExams[targetExamIndex] = item
      selectedQuizzes.push(JSON.parse(JSON.stringify(this.totalExams[targetExamIndex])))

      Vue.set(this, 'selectedQuizzes', selectedQuizzes)
      this.dialog = false
      this.updateSelectedQuizzes()
    },

    detachQuestion(item) {
      let that = this
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

    detachQuestionOnEditMode(item) {
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

    detachQuestionOnCreateMode(item) {
      const detachedExamIndex = this.selectedQuizzes.indexOf(item)
      this.selectedQuizzes.splice(detachedExamIndex, 1)
      this.dialog = false
      this.updateSelectedQuizzes()
    },

    showImgComponentStatus() {

      if (this.getPageStatus() === 'create') {
        return this.questionType === 'typeImage';
      }
      return  this.doesPhotosExist()
    },

    showQuestionComponentStatus() {
      if (this.getPageStatus() === 'create') {
        return this.questionType === 'typeText' || this.questionType === 'typeImage';

      }
      else if (this.getPageStatus() === 'show') {
        return this.checkTextCondition()
      }
      // in edit page
      return true
    },
    showExamsListComponent(){
      if (this.getPageStatus() === 'create') {
        return this.questionType === 'typeText' || this.questionType === 'typeImage';

      }
      return true
    },
    loadCurrentQuestionData() {
      let that = this
      this.loading = true
      this.currentQuestion.show(null, API_ADDRESS.question.updateQuestion(this.$route.params.question_id))
          .then((response) => {
            that.currentQuestion = new Question(response.data.data)
            if (that.currentQuestion.type.value === 'psychometric') {
              if (that.getPageStatus() === 'edit') {
                that.$router.push({name: 'question.mbti.edit', params: {question_id: that.$route.params.question_id}})
              } else if (that.getPageStatus() === 'show') {
                that.$router.push({name: 'question.mbti.show', params: {question_id: that.$route.params.question_id}})
              }
            }
            that.temp = that.currentQuestion
            that.checkTextCondition()
            that.getLogs()
            that.trueChoiceIndex = that.currentQuestion.choices.list.findIndex((item) => item.answer)
            that.updateAttachList(response.data.data.exams)
            this.loading = false
          })
    },

    getLogs() {
      this.currentQuestion.logs.fetch(null, API_ADDRESS.question.log.base(this.$route.params.question_id))
          .then((response) => {
            // this.currentQuestion.logs = new LogList(response.data.data)
            Vue.set(this.currentQuestion, 'logs', new LogList(response.data.data))
            this.setQuestionLayoutCols()
          })
    },

    updateQuestion(eventData) {
      // this.currentQuestion = new Question(eventData)
      Vue.set(this, 'currentQuestion', new Question(eventData))
    },

    updateAttachList(exams) {
      this.selectedQuizzes = exams
      this.updateSelectedQuizzes()
    },

    updateSelectedQuizzes() {
      let selectedQuizzes = JSON.parse(JSON.stringify(this.selectedQuizzes))
      selectedQuizzes.forEach((item, i) => {
        selectedQuizzes[i].subId = i + 1;
      })

      this.selectedQuizzes = selectedQuizzes
    },

    setNullKeys() {
      var currentQuestion = this.currentQuestion
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

    loadExamList() {
      let that = this
      return new ExamList().fetch()
          .then((response) => {
            that.examList = new ExamList(response.data.data)
          })
          .catch(() => {
          })
    },

    loadSubcategories() {
      return this.subCategoriesList.fetch()
          .then((response) => {
            this.subCategoriesList = new QuestSubcategoryList(response.data.data)
          })
          .catch(() => {
          })
    },

    makeShowImgPanelVisible(src) {
      this.imgSrc = src
      this.questionColsNumber = 7
      this.uploadImgColsNumber.show = true
      this.$store.commit('AppLayout/updateDrawer', false)
    },

    makeShowImgPanelInvisible() {
      this.uploadImgColsNumber.show = false
      this.$store.commit('AppLayout/updateDrawer', true)
      if (this.currentQuestion.logs.list.length > 0) {
        this.questionColsNumber = 9
      } else {
        this.questionColsNumber = 12
      }
    },

    setQuestionLayoutCols(){
     if(this.currentQuestion.logs.list.length >0 ){
        this.questionColsNumber=9

     }
    },
    showPageDialog() {  //یاس
      this.dialog = true
    },
    setQuestionTypeText() {
      this.questionType = 'typeText'
      this.dialog = false
      this.checkNavbarVisibilityOnCreatPage()
    },

    setQuestionTypeImage() {
      this.questionType = 'typeImage'
      this.dialog = false
      this.checkNavbarVisibilityOnCreatPage()
    },

    setInsertedQuestions() {  //یاس
      this.$refs.qlayout.getContent()
      var currentQuestion = this.currentQuestion
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
            this.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
            const questionId = response.data.data.id
            this.questionType = 'typeText'
            this.currentQuestion.statement = ''
            this.currentQuestion.choices.list.forEach((item) => {
              item.title = ''
            })
            this.$notify({
              group: 'notifs',
              title: 'توجه',
              text: 'ثبت با موفقیت انجام شد',
              type: 'success'
            })
            if(window.open('/question/create', '_blank')) window.open('/question/create', '_blank').focus()
            this.$router.push({name: 'question.show', params: {question_id: questionId}})
          })
    },

    doesPhotosExist() {
      if(this.currentQuestion.answer_photos){
       if (this.currentQuestion.answer_photos.length>0) {
         return true
       }
      }
      if(this.currentQuestion.statement_photo ){
        if (this.currentQuestion.statement_photo.length>0){
          return true
        }
      }
      return false
    },

    setUploadImgStatus() {
      this.upload_img_status = (this.getPageStatus() === 'create');
    },

    setMainChoicesInCreateMode(statusId) {
      if (this.questionType === 'typeText') {
        this.setInsertedQuestions()
      } else if (this.questionType === 'typeImage') {
        if (this.doesPhotosExist()) {
          this.setQuestionPhotos(statusId)
        }
      }
    },

    setMainChoicesInOtherModes() {
      if (this.doesPhotosExist()) {
        this.setQuestionTypeImage()
      } else {
        this.setQuestionTypeText()
      }
    },

    checkTextCondition() {
      return !!this.currentQuestion.statement;
    },

    checkNavbarVisibility(){
      if (this.getPageStatus() === 'create'){
        return this.NavbarVisibilityOnCreatPage
      }
      return true
    },
    checkNavbarVisibilityOnCreatPage(){
      this.NavbarVisibilityOnCreatPage = true
      if (this.$route.name === 'question.create') {
        this.currentQuestion.author.push({full_name: this.$store.getters['Auth/user'].full_name, id: this.$store.getters['Auth/user'].id})
      }
    }
  },
}
</script>

<style scoped>
.v-dialog .v-card .v-card__title {
  font-family: 'IRANSans';
  font-size: 16px;
}
</style>
