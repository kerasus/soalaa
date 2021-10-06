<template>
  <v-container
    class="konkoor-view"
    :style="{ height: '100%', background: 'rgb(244, 244, 244)' }"
  >
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        class="chart-dialog "
        width="1200"
      >
        <v-card-title class="text-h5 grey lighten-2">
          <v-btn
            color="red"
            icon
            @click="dialog = false"
          >
            <v-icon :size="24">
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card>
          <highcharts
            :options="chartOptions"
          />
          <v-card-actions>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-toolbar class="mb-5">
      <v-btn-toggle
        v-model="questionFilterMethod"
        mandatory
      >
        <v-btn value="not-filtered">
          نمایش همه
        </v-btn>
        <v-btn value="not-confirmed-at-all">
          کلا تایید نشده
        </v-btn>
        <v-btn value="not-confirmed-by-me">
          من تایید نکردم
        </v-btn>
        <v-btn
          value=""
          @click="dialog=true"
        >
          نمایش نمودار
        </v-btn>
      </v-btn-toggle>
      <v-spacer />
      <v-btn
        icon
        @click="reload"
      >
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </v-toolbar>
    <div
      id="questions"
      class="questions"
    >
      <DynamicScroller
        ref="scroller"
        :items="filteredQuestions"
        :min-item-size="70"
        class="scroller questionss"
        :emit-update="true"
        @update="onScroll"
      >
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
            :item="item"
            :active="active"
            :data-index="index"
          />
          <Item
            :source="item"
            :consider-active-category="false"
            :questions-column="$refs.questionsColumn"
            :exam-id="$route.params.quizId"
            :sub-category="quizData.sub_categories"
            @inView="test"
          >
            <template
              v-slot:chartDetail
            >
              <div class="answer-detail">
                <div class="d-flex ml-3">
                  <p>تعداد پاسخ صحیح :</p> 15   (40%)
                </div>
                <div class="d-flex">
                  <p>تعداد پاسخ غلط :</p> 7 (28%)
                </div>
                <div class="d-flex">
                  <p>پاسخ داده نشده :</p> 3 (12%)
                </div>
              </div>
            </template>
          </Item>
        </template>
        <v-divider />
      </DynamicScroller>
    </div>
  </v-container>
</template>

<script>
import { mixinAuth, mixinQuiz, mixinWindowSize } from '@/mixin/Mixins'
import API_ADDRESS from "@/api/Addresses";
import {QuestionList} from "@/models/Question";
import axios from "axios";
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import {DynamicScroller, DynamicScrollerItem} from 'vue-virtual-scroller'
import Item from '@/components/QuizEditor/Question'
import {Exam} from "@/models/Exam";
import {QuestSubcategoryList} from "@/models/QuestSubcategory";
import {Chart} from 'highcharts-vue'

export default {
  name: "Karnama",
  components: {
    DynamicScroller,
    DynamicScrollerItem,
    Item,
    highcharts: Chart
  },
  mixins: [mixinAuth, mixinQuiz, mixinWindowSize],
  data: () => ({

    chartOptions: {
      chart: {
        type: 'column'
      },
      title: {
        text: 'سؤالات'
      },
      xAxis: {
        categories: [],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text:'نتایج بر حسب درصد هستند'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:12px">{point.key} سؤال</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} % </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'پاسخ صحیح',
        color: '#0ec975',
        data: []
      }, {
        name: 'پاسخ غلط',
        color: '#ff4952',
        data: []
      }, {
        name: 'نزده',
        color: '#6aaeee',
        data: []
      }]
    },









    questionFilterMethod: 'not-filtered',
    bubbleSheet:800,
    dialog: false,
    dragging: false,
    quizData: new Exam(),
    subCategoriesList: new QuestSubcategoryList(),
    item: Item,
    lastTimeScrollRange: { start: 0, end: 29 },
    scrollState: 'not scrolling',
    timePassedSinceLastScroll: 0,
    setIntervalCallback: null,
    renderedQuestions: { startIndex: 0, endIndex: 0 },
    items: [
      'خارج از بودجه بندی آزمون ',
      'خارج از چارچوب کتاب درسی',
      'دارای غلط تایپی'
    ],
    inView: [],
    windowVisible: true
  }),
  computed: {
    filteredQuestions () {
     // console.log('this.questionFilterMethod in computed--------------- :',this.questionFilterMethod)
     // console.log(' this.quizData.questions.list in computed--------------- :',this.quizData.questions.list)
      if (this.questionFilterMethod === 'not-confirmed-at-all') {
        return this.quizData.questions.list.filter(item => item.confirmers.length === 0)
      } else if (this.questionFilterMethod === 'not-confirmed-by-me') {
        return this.quizData.questions.list.filter(item => item.confirmed === false)
      } else {
        return this.quizData.questions.list
      }
    }
  },
  created() {
    this.loadQuizDataAndSubCategories()

  },
  methods: {
    reload () {
      this.loadQuizDataAndSubCategories(true)
    },
    updateLtr() {
      setTimeout(() => {
        document.querySelectorAll('.katex:not([dir="ltr"])').forEach(item => {
          item.setAttribute('dir', 'ltr')
        })
      }, 1000)
    },
    questionListHeight() {
      const boxSize = this.$refs.bubbleSheet.clientWidth - 24
      // each group width is 140px
      const horizontalGroupAmounts = Math.floor(boxSize / 140)
      const verticalGroupAmount = Math.ceil(this.questionsInGroups.length / horizontalGroupAmounts)
      return verticalGroupAmount * 182 + 20
    },
    startResize(e) {
      e.preventDefault();
      this.dragging = true;
    },
    changeAppBarAndDrawer (state) {
      this.$store.commit('AppLayout/updateAppBarAndDrawer', state)
    },
    changeCurrentQuestionIfScrollingIsDone () {
      if (this.timePassedSinceLastScroll >= 1000) {
       // this.changeCurrentQuestionToFirstQuestionInView()
        this.timePassedSinceLastScroll = 0
        this.scrollState = 'not scrolling'
        clearInterval(this.setIntervalCallback)
        this.setIntervalCallback = null
      }
      this.timePassedSinceLastScroll += 250
    },
    scrollTo (questionId) {
      const questionIndex = this.getQuestionIndexById(questionId)
      this.$refs.scroller.scrollToItem(questionIndex)
      for (let i = 1; i < 4; i++) {
        setTimeout(() => {
              this.$refs.scroller.scrollToItem(questionIndex)
            },
            333 * i)
      }
    },
    choiceClicked (questionId) {
      this.scrollTo(questionId)
    },
    test (payload) {
      console.log(payload.number)
    },
    onScroll(startIndex, endIndex) {
      this.updateLtr()
      this.renderedQuestions = {startIndex, endIndex}
      if (this.scrollState === 'not scrolling') {
        this.setIntervalCallback = setInterval(() => {
          this.changeCurrentQuestionIfScrollingIsDone()
        }, 250)
        this.scrollState = 'scrolling'
      }
      this.timePassedSinceLastScroll = 0
    },
    onClickErrorSend(value) {
      console.log(value)
    },
    loadSubCategories (quizResponse, reload) {
     // console.log('quizResponse in loadSubCategories:',quizResponse)
      const that = this
    //  console.log(' this.subCategoriesList :', this.subCategoriesList)
      this.subCategoriesList.fetch().then((response) => {
       // console.log('response after fetch :',response)
        if (reload) {
          this.$notify({
            group: 'notifs',
            title: 'توجه!',
            text: 'اطلاعات بروزرسانی شد',
            type: 'success'
          })
        }
        // that.quiz.sub_categories = new QuestSubcategoryList(response.data)
        that.quizData.sub_categories = new QuestSubcategoryList(response.data.data)
        let questions = quizResponse.data.data
        that.sortQuestions (questions)
        that.quizData.questions = new QuestionList(questions)
        // that.quiz = new Exam(that.quizData)
        that.QuIzDaTa = new Exam(that.quizData)
        this.cartData()
      })
    },
    cartData() {
     let list = this.quizData.questions.list
      list.forEach((item , index)=>{
        this.chartOptions.xAxis.categories.push(index+1)
        this.chartOptions.series[0].data.push( Math.trunc(Math.random()*100))
        this.chartOptions.series[1].data.push( Math.trunc(Math.random()*100))
        this.chartOptions.series[2].data.push( Math.trunc(Math.random()*100))

      })
    },
    loadQuizDataAndSubCategories (reload = false) {
      const that = this
      axios.post(API_ADDRESS.exam.examQuestion(this.$route.params.quizId), {
        sub_categories: [this.$route.params.lessonId]
      })
          .then((response) => {
           // console.log('response in loadQuizDataAndSubCategories :',response)
            if (response.data.data.length) {
              that.loadSubCategories(response, reload)
            } else {
              this.$router.push({ name: 'onlineQuiz.exams' })
            }

          })

    },
  }
}
</script>

<style>
.chart-dialog{
  width:800px;
}
.konkoor-view strong em strong {
  display: none;
  font-weight: normal;
  font-style: normal;
  text-decoration: none !important;
}

.konkoor-view.container--fluid {
  padding-top: 0;
}

.sidebar {
  overflow-y: auto;
}

/*.choices {*/
/*    display: block !important;*/
/*}*/

@media only screen and (max-width: 1263px) {
  .main {
    left: 0 !important;
  }
}
</style>

<style>
.konkoor-view .reading-duplicate {
  display: none;
}
</style>

<style scoped>
.answer-detail{
  float: left;
}
.questions-list {
  margin-bottom: 0;
}

.resizable-content {
  background-position: top left;
  width: 150px;
  height: 150px;
  padding: 0;
  border: 1px solid #003eff;
  background: #007fff;
  font-weight: normal;
  color: #ffffff;
  position: relative;
}


body, html {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.main {
  margin-left: 15px;
  float: right;
  position: absolute;
  height: 200px;
  right: 0;
  left: 800px;
  margin-top: 10px;

}

.sidebar {
  width: 800px;
  float: left;
  display: flex;
}

.dragbar {
  background-color: #d6d6d6;
  height: 100%;
  float: right;
  width: 20px;
  cursor: col-resize;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ghostbar {
  margin-top: 10px;
  width: 3px;
  background-color: #000;
  opacity: 0.5;
  cursor: col-resize;
  z-index: 999;
  position: absolute;
  height: 100%;
}
</style>