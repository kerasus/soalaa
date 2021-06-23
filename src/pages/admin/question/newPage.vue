<template>
  <div id="app">
    <v-container class="pa-6">
      <v-row>
        <v-col :cols="questionColsNumber">
          <nav-bar
            :question="currentQuestion"
            :edit-status="edit_status"
            @create="navBarAction_create"
            @saveDraft="navBarAction_saveDraft"
            @save="navBarAction_save"
            @cancel="navBarAction_cancel"
            @edit="navBarAction_edit"
            @remove="navBarAction_remove"
          />
          <question-layout
            v-if="!loading"
            v-model="currentQuestion"
            :status="edit_status"
            @input="updateQuestion"
          />
          <!-- -------------------------- show exams  ---------------------->
          <attach_list
            :attaches="selectedQuizzes"
            :exam-list="examList"
            :sub-categories="subCategoriesList"
            :loading="attachLoading"
            @detach="detachQuestion"
            @attach="attachQuestion"
          />
          <!-- -------------------------- upload file ---------------------->
          <UploadImg
            v-model="currentQuestion"
            :edit-status="upload_img_status"
            @imgClicked="openShowImgPanel"
          />
          <!-- -------------------------- status --------------------------->
          <div
            v-if="getPageStatus() !== 'create'"
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
            @closePanel="closeShowImgPanel"
          />
        </v-col>
        <!-- -------------------------- log --------------------------->
        <v-col
          v-if="currentQuestion.logs.list.length > 0 && !uploadImgColsNumber.show"
          :cols="3"
        >
          <LogListComponent :logs="currentQuestion.logs" />
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
import {mixinMarkdownAndKatex} from "@/mixin/Mixins"
import {Question} from '@/models/Question'
import {LogList} from '@/models/Log'
import {ExamList} from "@/models/Exam";
import {QuestSubcategoryList} from "@/models/QuestSubcategory";
import API_ADDRESS from "@/api/Addresses";
import Assistant from "@/plugins/assistant";
import {QuestionStatusList} from "@/models/QuestionStatus";
import axios from 'axios'
import {ChoiceList} from "@/models/Choice";

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
  mixins: [mixinMarkdownAndKatex],
  data() {
    return {
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
      questionColsNumber: 12,
      uploadImgColsNumber: {
        cols: 0,
        show: false
      },
      currentQuestion: new Question(),
      examList: new ExamList(),
      subCategoriesList: new QuestSubcategoryList(),
      totalExams: [],
      trueChoiceIndex: 0,
      questionStatuses: new QuestionStatusList(),
      loading: true,
      attachLoading: false,
      changeStatusLoading: false,
      questionStatusId_draft: null,
      questionStatusId_pending_to_type: null
    }
  },
  created() {
    this.initData()
  },
  methods: {
    createNewQuestionChoices(status_id){
      this.currentQuestion.choices.list.forEach((item) => {
        item.answer = false
      })
      this.currentQuestion.choices.list[this.trueChoiceIndex].answer = true
      this.currentQuestion.status_id = status_id

    },
    createNewQuestionExams(){
      this.currentQuestion.exams = this.selectedQuizzes.map(item => {
        return {
          id: item.exam.id,
          sub_category_id: item.sub_category.id,
          order: item.order
        }
      })
    },
    navBarAction_create(statusId) {
      if (!statusId) {
        statusId = this.questionStatusId_draft
      }
      this.createNewQuestionChoices(statusId),
      this.createNewQuestionExams()
      
      let that = this
      if (this.currentQuestion.statement_photo !== null) {
        let formData = new FormData();
        formData.append('status_id', statusId);
        formData.append('statement_photo', this.currentQuestion.statement_photo);
        this.currentQuestion.answer_photos.forEach((item, key) => {
          formData.append('answer_photos[' + key + ']', item);
        })
        axios.post(API_ADDRESS.question.create, formData)
            .then((response) => {
              const questionId = response.data.data.id
              that.$router.push({name: 'question.show', params: {question_id: questionId}})
              // this.currentQuestion.statement = ''
              // this.currentQuestion.choices.list.forEach((item) => { item.title = '' })
              // this.$notify({
              //   group: 'notifs',
              //   title: 'توجه',
              //   text: 'ثبت با موفقیت انجام شد',
              //   type: 'success'
              // })
            })

        return
      }
      this.currentQuestion.create()
          .then(() => {
            // this.currentQuestion.statement = ''
            // this.currentQuestion.choices.list.forEach((item) => { item.title = '' })
            // this.$notify({
            //   group: 'notifs',
            //   title: 'توجه',
            //   text: 'ثبت با موفقیت انجام شد',
            //   type: 'success'
            // })
          })
    },
    navBarAction_saveDraft() {
      this.navBarAction_create(this.questionStatusId_pending_to_type)
    },
    navBarAction_save() {
      this.currentQuestion.choices.list.forEach((item) => {
        item.answer = false
      })
      this.currentQuestion.choices.list[this.trueChoiceIndex].answer = true
      this.currentQuestion.update(API_ADDRESS.question.updateQuestion(this.currentQuestion.id))
          .then(() => {
            this.$notify({
              group: 'notifs',
              title: 'توجه',
              text: 'ویرایش با موفقیت انجام شد',
              type: 'success'
            })
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

    initData() {
      this.setPageStatus()
      this.setEditStatus()
      this.setUploadImgStatus()

      // load exams and subcategories
      // load question
      let that = this
      const loanExamListPromise = this.loanExamList()
      const loadSubcategoriesPromise = this.loadSubcategories()
      const promiseArray = [loanExamListPromise, loadSubcategoriesPromise]
      if (that.getPageStatus() === 'create') {
        const getQuestionStatusesPromise = this.getQuestionStatuses()
        promiseArray.push(getQuestionStatusesPromise)
      }
      Promise.all(promiseArray)
          .then(() => {
            this.loadQuestion()
            that.loading = false
          })
    },
    getPageStatus() {
      const target = this.pageStatuses.find(item => item.state)
      return (target) ? target.title : false
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
    attachQuestionOnEditMode(item) {
      this.attachLoading = true
      axios.post(API_ADDRESS.question.attach, {
        order: item.order,
        exam_id: item.exam.id,
        question_id: this.$route.params.question_id,
        sub_category_id: item.sub_category.id
      })
          .then(response => {
            // this.updateAttachList(response.data.data.exams)
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
      // const targetSubCategoryIndex = this.subCategoriesList.list.findIndex(subCategoryItem => Assistant.getId(subCategoryItem.id) === Assistant.getId(item.sub_category.id))
      let selectedQuizzes = this.selectedQuizzes
      this.totalExams[targetExamIndex] = item
      // this.totalExams[targetExamIndex].sub_category = item.sub_category
      // this.totalExams[targetExamIndex].sub_category_title = this.subCategoriesList.list[targetSubCategoryIndex].title
      selectedQuizzes.push(JSON.parse(JSON.stringify(this.totalExams[targetExamIndex])))

      Vue.set(this, 'selectedQuizzes', selectedQuizzes)
      this.dialog = false
      this.updateSelectedQuizzes()
    },
    updateSelectedQuizzes() {
      let selectedQuizzes = JSON.parse(JSON.stringify(this.selectedQuizzes))
      selectedQuizzes.forEach((item, i) => {
        selectedQuizzes[i].subId = i + 1;
      })
      this.selectedQuizzes = selectedQuizzes
    },
    attachQuestion(item) {
      if (this.getPageStatus() === 'creat') {
        this.attachQuestionOnCreateMode(item)
      } else {
        this.attachQuestionOnEditMode(item)
      }
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
          if (this.getPageStatus() === 'edit' || this.getPageStatus() === 'show') {
            that.detachQuestionOnEditMode(item)
          } else {
            that.detachQuestionOnCreateMode(item)
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
            // response.data.data.exams.forEach(item => {
            // this.selectedQuizzes.push({
            //   id: item.exam.id,
            //   order: item.order,
            //   sub_category_id: item.sub_category.id,
            //   sub_category_title: item.sub_category.title,
            //   title: item.exam.title
            // })
            this.currentQuestion.exams = []
            response.data.data.exams.forEach(item => {
              this.currentQuestion.exams.push(item)
            })
            this.updateSelectedQuizzes()
            // this.currentQuestion = new question-layout(responseData)
            // this.trueChoiceIndex = this.currentQuestion.choices.list.findIndex((item) => item.answer )
            // this.updateAttachList(response.data.data)
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
    updateQuestion(eventData) {
      this.currentQuestion = new Question(eventData)
    },



    loadQuestion() {
      let that = this
      if (that.getPageStatus() === 'create') {
        that.loadEmptyQuestion()
      } else {
        that.loadQuestionFromServer()
      }
      // ToDo: must remove
      that.convertNullToEmptyString()
    },
    loadEmptyQuestion () {
      this.currentQuestion = new Question({
        // statement: '',
        // category_id: '',
        // sub_category_id: 1,
        // order: [],
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
      })
    },
    loadQuestionFromServer () {
      let that = this
      this.currentQuestion.show(null, API_ADDRESS.question.updateQuestion(this.$route.params.question_id))
          .then((response) => {
            that.currentQuestion = new Question(response.data.data)
            that.trueChoiceIndex = that.currentQuestion.choices.list.findIndex((item) => item.answer)

            that.getLogs()
            that.updateAttachList(response.data.data.exams)
          })
    },
    setPageStatus() {
      let that = this
      const title = that.$route.name.replace('question.', '')
      this.pageStatuses.forEach(item => {
        if (item.title === title) {
          item.state = true
        } else {
          item.state = false
        }
      })
    },
    setEditStatus() {
      this.edit_status = (this.getPageStatus() === 'create' || this.getPageStatus() === 'edit');
    },
    setUploadImgStatus() {
      this.upload_img_status = (this.getPageStatus() === 'create');
    },
    setQuestionColsNumber() {
      if (this.currentQuestion.logs.list.length > 0) {
        this.questionColsNumber = 9
      } else {
        this.questionColsNumber = 12

      }
    },
    //------------------------------------------
    loanExamList() {
      let that = this
      return new Promise(function (resolve, reject) {
        new ExamList().fetch()
            .then((response) => {
              that.examList = new ExamList(response.data.data)
              // that.totalExams = []
              // that.examList.list.forEach(item => {
              //   that.totalExams.push({
              //     order: 0,
              //     sub_category_id: null,
              //     sub_category_title: '',
              //     title: item.title,
              //     id: item.id
              //   })
              // })
              resolve()
            })
            .catch(() => {
              reject()
            })
      })
    },
    loadSubcategories() {
      let that = this
      return new Promise(function (resolve, reject) {
        that.subCategoriesList.fetch()
            .then((response) => {
              that.subCategoriesList = new QuestSubcategoryList(response.data.data)
              resolve()
            })
            .catch(() => {
              reject()
            })
      })
    },
    convertNullToEmptyString() {
      if (!this.currentQuestion.statement) {
        this.currentQuestion.statement = ''
      }
      this.currentQuestion.choices.list.forEach((item) => {
        if (!item.title) {
          item.title = ''
        }
      })
      if (!this.currentQuestion.descriptive_answer) {
        this.currentQuestion.descriptive_answer = ''
      }
    },
    getQuestionStatuses() {
      let that = this
      return new Promise(function (resolve, reject) {
        that.questionStatuses.fetch()
            .then((response) => {
              that.questionStatuses = new QuestionStatusList(response.data.data)
              that.questionStatusId_draft = that.questionStatuses.list.find(item => item.title === 'draft').id
              that.questionStatusId_pending_to_type = that.questionStatuses.list.find(item => item.title === 'pending_to_type').id
              resolve()
            })
            .catch(() => {
              reject()
            })
      })
    },
    updateAttachList(exams) {
      // let that = this
      this.selectedQuizzes = exams
      // exams.forEach( item => {
      //   const targetExamIndex = that.totalExams.findIndex(examItem => Assistant.getId(examItem.id) === Assistant.getId(item.exam_id))
      //   that.totalExams[targetExamIndex].order = item.order
      //   that.totalExams[targetExamIndex].sub_category_id = item.sub_category.id
      //   that.totalExams[targetExamIndex].sub_category_title = item.sub_category.title
      //   that.selectedQuizzes.push(JSON.parse(JSON.stringify(that.totalExams[targetExamIndex])))
      // })
      this.updateSelectedQuizzes()
    },
    getLogs() {
      this.currentQuestion.logs.fetch(null, API_ADDRESS.question.log.base(this.$route.params.question_id))
          .then((response) => {
            this.currentQuestion.logs = new LogList(response.data.data)
            // set questionColsNumber
            this.setQuestionColsNumber()
          })
    },

    openShowImgPanel(src) {
      this.imgSrc = src
      this.questionColsNumber = 7
      this.uploadImgColsNumber.show = true
      this.$store.commit('AppLayout/updateDrawer', false)
    },
    closeShowImgPanel() {
      this.uploadImgColsNumber.show = false
      this.$store.commit('AppLayout/updateDrawer', true)
      if (this.currentQuestion.logs.list.length > 0) {
        this.questionColsNumber = 9
      } else {
        this.questionColsNumber = 12
      }
    },
  }
}
</script>

<style scoped>

</style>
