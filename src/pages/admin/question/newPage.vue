<template>
  <div id="app">
    <v-container class="pa-6">
      <v-row>
        <v-col :cols="questionColsNumber">
          <navBar
            :question="currentQuestion"
            :edit-status="edit_status"
            @save="submitQuestion"
          />
          <question-layout
            v-if="!loading"
            v-model="currentQuestion"
            :status="edit_status"
            @input="updateQuestion"
          />
          <!-- -------------------------- show exams  ---------------------->
          <Exams
            :attaches="selectedQuizzes"
            :exam-list="examList"
            :sub-categories="subCategoriesList"
            @detach="detachQuestion"
            @attach="attachQuestion"
          />
          <!-- -------------------------- upload file ---------------------->
          <UploadImg
            v-model="currentQuestion"
            :edit-status="edit_status"
            @imgClicked="openShowImgPanel"
          />
          <!-- -------------------------- status --------------------------->
          <div
            v-if="urlPathName === 'question.edit' || urlPathName === 'question.show' "
            class="my-10"
          >
            <StatusComponent
              :statuses="questionStatuses"
              @update="changeStatus"
            />
          </div>
        </v-col>
        <!-- -------------------------- show img---------------------------->
        <v-col
          :cols="uploadImgColsNumber"
          :class="displayEditQuestion ? '' : 'd-none'"
        >
          <ShowImg
            :test="imgSrc"
            @closePanel="closeShowImgPanel"
          />
        </v-col>
        <!-- -------------------------- log --------------------------->
        <v-col :cols="log_component_number">
          <div v-if="getPageStatus() !== 'create'">
            <v-card
              flat
              height="1856"
              class="rounded-card"
            >
              <LogListComponent :logs="currentQuestion.logs" />
            </v-card>
          </div>
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
import Exams from '@/components/QuestionBank/EditQuestion/Exams/exams';
import StatusComponent from '@/components/QuestionBank/EditQuestion/StatusComponent/status';
import ShowImg from '@/components/QuestionBank/EditQuestion/ShowImg/showImg';
import LogListComponent from '@/components/QuestionBank/EditQuestion/Log/LogList';
import { Question } from '@/models/Question'
import { LogList } from '@/models/Log'
import { ExamList } from "@/models/Exam";
import { QuestSubcategoryList } from "@/models/QuestSubcategory";
import API_ADDRESS from "@/api/Addresses";
import Assistant from "@/plugins/assistant";
import { QuestionStatusList } from "@/models/QuestionStatus";
import axios from 'axios'

export default {
  name: "NewPage",
  components: {
    navBar,
    QuestionLayout,
    UploadImg,
    Exams,
    ShowImg,
    StatusComponent,
    LogListComponent
  },
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
      imgSrc:'',
      urlPathName:'',
      edit_status:true,
      questionColsNumber: 12,
      uploadImgColsNumber: 0,
      log_component_number:0,
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
    }
  },
  created() {
    this.setPageStatus()
    this.checkUrl()
    this.getStatus()
  },
  methods: {
    submitQuestion () {
      if (this.urlPathName === 'question.edit') {
        this.currentQuestion.update(API_ADDRESS.question.updateQuestion(this.currentQuestion.id))
            .then(() => {
              this.$notify({
                group: 'notifs',
                title: 'توجه',
                text: 'ویرایش با موفقیت انجام شد',
                type: 'success'
              })
            })
        return
      }
      this.currentQuestion.choices.list.forEach((item) => { item.answer = false })
      this.currentQuestion.choices.list[this.trueChoiceIndex].answer = true
      this.currentQuestion.exams = this.selectedQuizzes
      this.currentQuestion.create()
          .then(() => {
            this.currentQuestion.statement = ''
            this.currentQuestion.choices.list.forEach((item) => { item.title = '' })
            this.$notify({
              group: 'notifs',
              title: 'توجه',
              text: 'ثبت با موفقیت انجام شد',
              type: 'success'
            })
          })

    },
    setPageStatus () {
      let that = this
      const title = that.$route.name.replace('question.', '')
      this.pageStatuses.forEach( item => {
        if (item.title === title) {
          item.state = true
        } else {
          item.state = false
        }
      })
    },
    getPageStatus () {
      const target = this.pageStatuses.find( item => item.state)
      return (target) ? target.title : false
    },
    changeStatus (newStatus) {
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
    attachQuestionOnEditMode (item) {
      this.attachLoading = true
      axios.post(API_ADDRESS.question.attach, {
        order: item.order,
        exam_id: item.exam.id,
        question_id: this.$route.params.question_id,
        sub_category_id: item.sub_category.id
      })
      .then( response => {
        // this.updateAttachList(response.data.data.exams)
        this.selectedQuizzes = response.data.data.exams
        this.attachLoading = false
        this.dialog = false
      })
      .catch( () => {
        this.attachLoading = false
        this.dialog = false
      })
    },
    attachQuestionOnCreateMode (item) {
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
    updateSelectedQuizzes () {
      let selectedQuizzes = JSON.parse(JSON.stringify(this.selectedQuizzes))
      selectedQuizzes.forEach((item, i) => {
        selectedQuizzes[i].subId = i + 1;
      })

      this.selectedQuizzes = selectedQuizzes
    },
    attachQuestion (item) {
      if (this.getPageStatus() === 'edit' || this.getPageStatus() === 'show') {
        this.attachQuestionOnEditMode(item)
      } else {
        this.attachQuestionOnCreateMode(item)
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
      console.log('item', item)
      axios.post(API_ADDRESS.question.detach(this.$route.params.question_id), {
        detaches: [{
          exam_id: item.exam.id,
          order: item.order,
          sub_category_id: item.sub_category.id
        }]
      })
      .then((response) => {
        console.log('response', response)
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
      .catch( () => {
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
    updateQuestion (eventData) {
      this.currentQuestion = new Question(eventData)
    },
    getStatus () {
      this.questionStatuses.fetch()
      .then((response) => {
        this.questionStatuses = new QuestionStatusList(response.data.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
    },
    checkUrl () {
      // set edit_status
      this.edit_status = (this.getPageStatus() === 'create' || this.getPageStatus() === 'edit');

      if(this.getPageStatus() !== 'create') {
        this.questionColsNumber = 9
        this.log_component_number = 3
      }

      let that = this
      const loanExamListPromise = this.loanExamList()
      const loadSubcategoriesPromise = this.loadSubcategories()
      Promise.all([loanExamListPromise, loadSubcategoriesPromise])
             .then(() => {
               if(that.getPageStatus() !== 'create') {
                 that.loadCurrentQuestionData()
               } else {
                 that.currentQuestion = new Question(that.questionData)
               }

               that.setNullKeys()
               that.loading = false
             })
    },
    setNullKeys () {
      console.log('test', this.currentQuestion.statement)
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
    loanExamList () {
      let that = this
      return new Promise(function(resolve, reject) {
        new ExamList().fetch()
        .then((response) => {
          console.log('responseExam', response)
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
        .catch( () => {
          reject()
        })
      })
    },
    loadSubcategories () {
      let that = this
      return new Promise(function(resolve, reject) {
        that.subCategoriesList.fetch()
        .then((response) => {
          console.log('responseSub', response)
          that.subCategoriesList = new QuestSubcategoryList(response.data.data)
          resolve()
        })
        .catch( () => {
          console.log('error')
          reject()
        })
      })
    },
    getLogs () {
      this.currentQuestion.logs.fetch(null, API_ADDRESS.question.log.base(this.$route.params.question_id))
        .then((response) => {
          this.currentQuestion.logs = new LogList(response.data.data)
        })
    },
    loadCurrentQuestionData () {
      let that = this
      console.log(this.currentQuestion)
      this.currentQuestion.show(null, API_ADDRESS.question.updateQuestion(this.$route.params.question_id))
          .then((response) => {
            console.log('response', response)
            that.currentQuestion = new Question(response.data.data)
            that.getLogs()
            that.trueChoiceIndex = that.currentQuestion.choices.list.findIndex((item) => item.answer )
            that.updateAttachList(response.data.data.exams)
            that.updateRendered()
          })
    },
    updateRendered () {
      this.replaceNimFasele()
      this.replaceExtraSpaceAroundDollarSign()
      this.questRendered = this.markdown.render(this.currentQuestion.statement.toString());
      for (let i = 0; i < 4; i++) {
        const title = (typeof this.currentQuestion.choices.list[i] !== 'undefined') ? this.currentQuestion.choices.list[i].title : null
        if (title) {
          this.choiceRendered[i] = this.markdown.render(title.toString())
        }
      }
      this.replaceNimFasele()
    },
    replaceExtraSpaceAroundDollarSign () {
      if (this.selectedField === 0) {
        if (!this.currentQuestion.statement) {
          this.currentQuestion.statement = ''
        }
        while (this.currentQuestion.statement.indexOf('$$') !== -1) {
          this.currentQuestion.statement = this.currentQuestion.statement.replace('$$', '$')
        }
        let dollarSignCounter = 0
        for (let i = 0; i < this.currentQuestion.statement.length; i++) {
          if (this.currentQuestion.statement[i] === '$') {
            dollarSignCounter++
            if (dollarSignCounter % 2 === 1 && this.currentQuestion.statement[i + 1] === ' ') {
              this.currentQuestion.statement = this.currentQuestion.statement.slice(0, i + 1) + this.currentQuestion.statement.slice(i + 2)
              if (this.currentQuestion.statement[i + 1] === ' ') {
                i--
                dollarSignCounter--
              }
            }
            else if (dollarSignCounter % 2 === 0 && this.currentQuestion.statement[i - 1] === ' ') {
              this.currentQuestion.statement = this.currentQuestion.statement.slice(0, i - 1) + this.currentQuestion.statement.slice(i)
              if (this.currentQuestion.statement[i - 2] === ' ') {
                i = i - 2
                dollarSignCounter--
              }
            }
          }
        }
      } else {
        if (!this.currentQuestion.choices.list[this.selectedField - 1].title) {
          this.currentQuestion.choices.list[this.selectedField - 1].title = ''
        }
        while (this.currentQuestion.choices.list[this.selectedField - 1].title.indexOf('$$') !== -1) {
          this.currentQuestion.choices.list[this.selectedField - 1].title = this.currentQuestion.choices.list[this.selectedField - 1].title.replace('$$', '$')
        }
        let dollarSignCounter = 0
        for (let i = 0; i < this.currentQuestion.choices.list[this.selectedField - 1].title.length; i++) {
          if (this.currentQuestion.choices.list[this.selectedField - 1].title[i] === '$') {
            dollarSignCounter++
            if (dollarSignCounter % 2 === 1 && this.currentQuestion.choices.list[this.selectedField - 1].title[i + 1] === ' ') {
              this.currentQuestion.choices.list[this.selectedField - 1].title = this.currentQuestion.choices.list[this.selectedField - 1].title.slice(0, i + 1) + this.currentQuestion.choices.list[this.selectedField - 1].title.slice(i + 2)
              if (this.currentQuestion.choices.list[this.selectedField - 1].title[i + 1] === ' ') {
                i--
                dollarSignCounter--
              }
            }
            else if (dollarSignCounter % 2 === 0 && this.currentQuestion.choices.list[this.selectedField - 1].title[i - 1] === ' ') {
              this.currentQuestion.choices.list[this.selectedField - 1].title = this.currentQuestion.choices.list[this.selectedField - 1].title.slice(0, i - 1) + this.currentQuestion.choices.list[this.selectedField - 1].title.slice(i)
              if (this.currentQuestion.choices.list[this.selectedField - 1].title[i - 2] === ' ') {
                i = i - 2
                dollarSignCounter--
              }
            }
          }
        }
      }
    },
    replaceNimFasele () {
      if (!this.currentQuestion.statement) {
        this.currentQuestion.statement = ''
      }
      this.currentQuestion.statement = this.currentQuestion.statement.replace('¬', '‌')
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
    openShowImgPanel (src) {
       this.imgSrc = src
       this.displayEditQuestion = true
       this.questionColsNumber = 7
       this.log_component_number= 0
       this.uploadImgColsNumber = 5
       this.$store.commit('AppLayout/updateDrawer', false)

    },
    closeShowImgPanel() {
      this.displayEditQuestion = false
      this.$store.commit('AppLayout/updateDrawer', true)
      if(this.$route.name === 'question.show' || this.$route.name === 'question.edit'){
        this.questionColsNumber = 9
        this.log_component_number= 3
      }else {
        this.questionColsNumber = 12
        this.uploadImgColsNumber = 0
      }
    },
  }
}
</script>

<style scoped>
.rounded-card{
  border-radius: 10px;
}
</style>
