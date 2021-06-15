<template>
  <div id="app">
    <v-container class="pa-6">
      <v-row>
        <v-col :cols="questionColsNumber">
          <navBar :status="urlPathName" />
          <QuestionAnswer
            :status="edit_status"
            :question_data="currentQuestion"
          />
          <!-- -------------------------- upload file ---------------------->
          <div>
            <v-row>
              <v-col cols="5">
                <UploadImg @imgClicked="openShowImgPanel" />
              </v-col>
              <!-- -------------------------- show exams  ---------------------->
              <v-col cols="7">
                <Exams />
              </v-col>
            </v-row>
          </div>
          <!-- -------------------------- status --------------------------->
          <div
            v-if="urlPathName === 'question.edit' || urlPathName === 'question.show' "
            class="my-10"
          >
            <StatusComponent />
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
              <Log />
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import navBar from '@/components/QuestionBank/EditQuestion/NavBar/navBar.vue';
import QuestionAnswer from '@/components/QuestionBank/EditQuestion/question-layout/call_question_field';
import UploadImg from '@/components/QuestionBank/EditQuestion/UploadImgs/uploadImg';
import Exams from '@/components/QuestionBank/EditQuestion/Exams/exams';
import StatusComponent from '@/components/QuestionBank/EditQuestion/StatusComponent/stsatus';
import ShowImg from '@/components/QuestionBank/EditQuestion/ShowImg/showImg';
import SaveChange from '@/components/QuestionBank/EditQuestion/SaveChange/saveChange'
import Log from '@/components/QuestionBank/EditQuestion/Log/Log';
import { Question } from '@/models/Question'
import {ExamList} from "@/models/Exam";
import {QuestSubcategoryList} from "@/models/QuestSubcategory";
import API_ADDRESS from "@/api/Addresses";

export default {
  name: "NewPage",
  components: {
    navBar,
    QuestionAnswer ,
    UploadImg,
    Exams,
    ShowImg,
    StatusComponent,
    Log,
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
      ubCategoriesList: new QuestSubcategoryList(),
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
    }
  },
  created() {
    this.getUrl()
    this.checkUrl()
  },
  methods: {
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
        const loanExamListPromise = this.loanExamList()
        const loadSubcategoriesPromise = this.loadSubcategories()
        Promise.all([loanExamListPromise, loadSubcategoriesPromise])
        .then(() => {
          this.loadnCurrentQuestionData()
        })
      } else {
        this.currentQuestion = new Question(this.questionData)
      }
    },
    loanExamList () {
      let that = this
      return new Promise(function(resolve, reject) {
        new ExamList().fetch()
        .then((response) => {
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
          that.subCategoriesList = new QuestSubcategoryList(response.data.data)
          resolve()
        })
        .catch( () => {
                  reject()
                })
      })
    },
    loadnCurrentQuestionData () {
      let that = this
      this.currentQuestion.show(null, API_ADDRESS.question.updateQuestion(this.$route.params.question_id))
          .then((response) => {
            console.log('response', response)
            this.currentQuestion = new Question(response.data.data)
            this.trueChoiceIndex = this.currentQuestion.choices.list.findIndex((item) => item.answer )
            that.updateAttachList(response.data.data.exams)
            that.updateRendered()
          })
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
