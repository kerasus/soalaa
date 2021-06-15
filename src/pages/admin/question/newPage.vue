<template>
  <div id="app">
    <v-container class="pa-6">
      <v-row>
        <v-col :cols="questionColsNumber">
          <navBar :status="urlPathName" />
          <QuestionAnswer
            v-if="!loading"
            v-model="currentQuestion"
            :status="edit_status"
            @input="updateQuestion"
          />
          <div>
            <v-row>
              <!-- -------------------------- show exams  ---------------------->
              <v-col cols="12">
                <Exams
                  :exams="currentQuestion.exams"
                  :exam-list="examList.list"
                  :sub-categories="subCategoriesList.list"
                  @detach="detachQuestion"
                  @atach="attachQuestion"
                />
              </v-col>
              <!-- -------------------------- upload file ---------------------->
              <v-col cols="12">
                <UploadImg
                  v-model="currentQuestion"
                  :edit-status="edit_status"
                  @imgClicked="openShowImgPanel"
                />
              </v-col>
            </v-row>
          </div>
          <!-- -------------------------- status --------------------------->
          <div
            v-if="urlPathName === 'question.edit' || urlPathName === 'question.show' "
            class="my-10"
          >
            <StatusComponent :statuses="questionStatuses" />
          </div>
          <!-- -------------------------- save change--------------------------->
          <SaveChange />
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
          <div v-if="urlPathName === 'question.edit' || urlPathName === 'question.show'">
            <v-card
              flat
              height="1856"
              class="rounded-card"
            >
              <LogList />
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import navBar from '@/components/QuestionBank/EditQuestion/NavBar/navBar.vue';
import QuestionAnswer from '@/components/QuestionBank/EditQuestion/question-layout/question_layout';
import UploadImg from '@/components/QuestionBank/EditQuestion/UploadImgs/uploadImg';
import Exams from '@/components/QuestionBank/EditQuestion/Exams/exams';
import StatusComponent from '@/components/QuestionBank/EditQuestion/StatusComponent/status';
import ShowImg from '@/components/QuestionBank/EditQuestion/ShowImg/showImg';
import SaveChange from '@/components/QuestionBank/EditQuestion/SaveChange/saveChange'
import LogList from '@/components/QuestionBank/EditQuestion/Log/LogList';
import { Question } from '@/models/Question'
import {ExamList} from "@/models/Exam";
import {QuestSubcategoryList} from "@/models/QuestSubcategory";
import API_ADDRESS from "@/api/Addresses";
import Assistant from "@/plugins/assistant";
import {QuestionStatusList} from "@/models/QuestionStatus";
import axios from "axios";

export default {
  name: "NewPage",
  components: {
    navBar,
    QuestionAnswer,
    UploadImg,
    Exams,
    ShowImg,
    StatusComponent,
    LogList,
    SaveChange
  },
  data() {
    return {
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
    this.getUrl()
    this.checkUrl()
    this.getStatus()
  },
  methods: {
    attachQuestionOnEditMode () {
      this.attachLoading = true
      axios.post(API_ADDRESS.question.attach, {
        order: this.attachOrder,
        exam_id: this.attachExamID,
        question_id: this.$route.params.id,
        sub_category_id: this.attachSubcategoryID
      })
      .then( response => {
        this.updateAttachList(response.data.data.exams)
        console.log('response', response)
        this.attachLoading = false
        this.dialog = false
      })
      .catch( () => {
        this.attachLoading = false
        this.dialog = false
      })
    },
    attachQuestionOnCreateMode () {
      const targetExamIndex = this.totalExams.findIndex(examItem => Assistant.getId(examItem.id) === Assistant.getId(this.attachExamID))
      const targetSubCategoryIndex = this.subCategoriesList.list.findIndex(subCategoryItem => Assistant.getId(subCategoryItem.id) === Assistant.getId(this.attachSubcategoryID))
      this.totalExams[targetExamIndex].order = this.attachOrder
      this.totalExams[targetExamIndex].sub_category_id = this.attachSubcategoryID
      this.totalExams[targetExamIndex].sub_category_title = this.subCategoriesList.list[targetSubCategoryIndex].title
      this.selectedQuizzes.push(JSON.parse(JSON.stringify(this.totalExams[targetExamIndex])))
      this.dialog = false
      this.updateSelectedQuizzes()
    },
    attachQuestion () {
      if (this.urlPathName === 'question.edit' || this.urlPathName === 'question.show') {
        this.attachQuestionOnEditMode()
      } else {
        this.attachQuestionOnCreateMode()
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
          if (that.urlPathName === 'question.edit' || that.urlPathName === 'question.show') {
            that.detachQuestionOnEditMode(item)
          } else {
            that.detachQuestionOnCreateMode(item)
          }
        }
      })
    },
    detachQuestionOnEditMode(item) {
      this.attachLoading = true
      axios.post(API_ADDRESS.question.detach(this.$route.params.id), {
        detaches: [{
          exam_id: item.id,
          order: item.order,
          sub_category_id: item.sub_category_id
        }]
      })
      .then((response) => {
        console.log('response', response)
        this.selectedQuizzes = []
        response.data.data.exams.forEach(item => {
          this.selectedQuizzes.push({
            id: item.exam.id,
            order: item.order,
            sub_category_id: item.sub_category.id,
            sub_category_title: item.sub_category.title,
            title: item.exam.title
          })
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
    getUrl () {
      this.urlPathName = this.$route.name
    },
    doesQuestionAlreadyExist () {
      return this.urlPathName === 'question.show' || this.urlPathName === 'question.edit'
    },
    checkUrl () {
      this.edit_status = this.urlPathName === 'question.create' || this.urlPathName === 'question.edit';
      if(this.urlPathName === 'question.show' || this.urlPathName === 'question.edit'){
        this.questionColsNumber = 9
        this.log_component_number = 3
      }

      if (this.doesQuestionAlreadyExist()) {
        console.log('in too')
        const loanExamListPromise = this.loanExamList()
        const loadSubcategoriesPromise = this.loadSubcategories()
        Promise.all([loanExamListPromise, loadSubcategoriesPromise])
        .then(() => {
          this.loadCurrentQuestionData()
          this.setNullKeys()
          this.loading = false
        })
      } else {
        this.currentQuestion = new Question(this.questionData)
        console.log('currentQuestion', this.questionData, new Question(this.questionData))
        this.setNullKeys()
        this.loading = false
      }
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
          that.totalExams = []
          that.examList.list.forEach(item => {
            that.totalExams.push({
              order: 0,
              sub_category_id: null,
              sub_category_title: '',
              title: item.title,
              id: item.id
            })
          })
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
    loadCurrentQuestionData () {
      let that = this
      console.log('ooooooooooo')
      console.log(this.currentQuestion)
      this.currentQuestion.show(null, API_ADDRESS.question.updateQuestion(this.$route.params.question_id))
          .then((response) => {
            console.log('ooooooooooo')
            console.log('response', response)
            that.currentQuestion = new Question(response.data.data)
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
      let that = this
      this.selectedQuizzes = []
      exams.forEach( item => {
        const targetExamIndex = that.totalExams.findIndex(examItem => Assistant.getId(examItem.id) === Assistant.getId(item.exam_id))
        that.totalExams[targetExamIndex].order = item.order
        that.totalExams[targetExamIndex].sub_category_id = item.sub_category.id
        that.totalExams[targetExamIndex].sub_category_title = item.sub_category.title
        that.selectedQuizzes.push(JSON.parse(JSON.stringify(that.totalExams[targetExamIndex])))
      })
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
      if(this.urlPathName === 'question.show' || this.urlPathName === 'question.edit'){
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
