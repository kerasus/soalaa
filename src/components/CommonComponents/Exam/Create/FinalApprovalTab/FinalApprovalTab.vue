<template>
  <div
    class="main-container ">
    <div class="row">
      <div
        :hidden="$q.screen.lt.sm"
        class="exam-detail-container col-xs-12 col-lg-3">
        <sticky-both-sides :max-width="1440">
          <q-skeleton v-if="exam.loading"
                      width="300px"
                      height="400px"
                      class="q-ml-xs" />
          <div v-else
               class="exam-detail-content">
            <div class="row q-col-gutter-x-lg">
              <div class="col-lg-12 col-md-8 col-sm-6">
                <div class="exam-details row q-col-gutter-x-lg">
                  <div class="col-12 exam-specifications">
                    <div class="header-title"> مشخصات آزمون</div>
                    <div class=" exam-title">
                      <p class="ellipsis">
                        آزمون {{ exam.id }}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-6 col-sm-12">
                    <div class=" exam-detail-item">
                      <div class="field">نوع آزمون:</div>
                      <div class="value">
                        عادی
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-6 col-sm-12">
                    <div class="exam-detail-item">
                      <div class="field">عنوان آزمون:</div>
                      <div class="value exam-title ellipsis">
                        {{ exam.title }}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-6 col-sm-12">
                    <div class="exam-detail-item">
                      <div class="field">رشته تحصیلی:</div>
                      <div class="value">
                        {{ examMajor() }}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-6 col-sm-12">
                    <div class="exam-detail-item">
                      <div class="field">پایه تحصیلی:</div>
                      <div class="value">
                        {{ examGrade() }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12 col-md-4 col-sm-6">
                <div class="selected-questions">
                  <div class="title"> سوالات انتخابی</div>
                  <div class="chart-box row ">
                    <div class="col-md-4 col-sm-12 type-box">
                      <div class="chart-titles">
                        <q-badge class="titles-icon hard"
                                 rounded />
                        <div>سخت</div>
                      </div>
                      <div class="chart-titles">
                        <q-badge class="titles-icon medium"
                                 rounded></q-badge>
                        <div>متوسط</div>
                      </div>
                      <div class="chart-titles">
                        <q-badge class="titles-icon easy"
                                 rounded></q-badge>
                        <div>آسان</div>
                      </div>
                    </div>
                    <div class="chart-b col-md-8 col-sm-12">
                      <chart ref="chart"
                             class="row justify-center"
                             :options="chartOptions" />
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm action-btn">
                    <div class=" confirm-b col-lg-12 col-sm-6">
                      <q-btn
                        unelevated
                        color="primary"
                        :disable="exam.loading"
                        class="full-width confirm q-mr-xl"
                        @click="confirmExam"
                      >
                        تایید نهایی
                        <span :hidden="$q.screen.lt.lg">و ساخت آزمون</span>
                      </q-btn>
                    </div>
                    <div class="previous-b col-lg-12 col-sm-6">
                      <q-btn
                        unelevated
                        :disable="exam.loading"
                        class="full-width q-mr-xl previous"
                        @click="goToPrevious"
                      >
                        بازگشت
                      </q-btn>
                    </div>
                  </div>
                </div>
              </div>
              <!--          <q-separator class="q-my-lg" />-->
            </div>

          </div>
        </sticky-both-sides>
      </div>
      <div class="col-lg-9 col-xs-12">
        <div class="question-item-content">
          <question-item v-if="exam.loading"
                         :question="loadingQuestion" />
          <template v-else-if="exam.questions.list.length > 0">
            <q-virtual-scroll
              ref="scroller"
              :items="exam.questions.list"
              :virtual-scroll-item-size="450"
              :virtual-scroll-slice-size="5"
            >
              <template v-slot="{ item , index}">
                <question-item
                  :key="item.id"
                  :question="item"
                  :questionIndex="index"
                  :questionsLength="exam.questions.list.length"
                  pageStrategy="question-bank"
                  final-approval-mode
                  @changeOrder="changeSelectedQuestionOrder"
                  @checkSelect="onClickedCheckQuestionBtn"
                />
              </template>
            </q-virtual-scroll>
          </template>
        </div>
      </div>
    </div>
    <questions-general-info
      :loading="exam.loading"
      final-approval-mode
      :selectedQuestions="exam.questions.list"
      :examInformation="examInfo"
      @lastTab="goToPrevious"
      @nextTab="confirmExam"
    />
  </div>
</template>

<script>
import QuestionsGeneralInfo from 'components/CommonComponents/Exam/Create/ExamSelectionTab/QuestionsGeneralInfo'
import { Question, QuestionList } from 'src/models/Question'
import QuestionItem from 'components/CommonComponents/Exam/Create/QuestionTemplate/QuestionItem'
import { Exam } from 'src/models/Exam'

import { Chart } from 'highcharts-vue'
import StickyBothSides from 'components/Utils/StickyBothSides'

export default {
  name: 'FinalApprovalTab',
  components: {
    StickyBothSides,
    QuestionItem,
    Chart,
    QuestionsGeneralInfo
  },
  emits: ['detachQuestion'],
  props: {
    exam: {
      type: Exam,
      default: new Exam()
    },
    majors: {
      type: Array,
      default: () => []
    },
    grades: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    'exam.loading': {
      handler() {
        this.loadingQuestion.loading = this.exam.loading
      }
    },
    'exam.questions.list': {
      deep: true,
      handler(val) {
        this.reIndexEamQuestions(this.exam.questions.list)
        this.questions = new QuestionList({ ...this.exam.questions })
        this.$nextTick(() => {
          this.setDifficultyLevelsChart()
          this.replaceTitle()
        })
      }
    }
  },
  mounted() {
    if (!this.exam.loading && this.exam.questions.list.length > 0) {
      this.setDifficultyLevelsChart()
      this.replaceTitle()
      // this.reIndexEamQuestions(this.exam.questions.list)
    }
  },
  data: () => ({
    chartOptions: {
      chart: {
        height: '150',
        width: '150',
        type: 'pie',
        plotShadow: false
      },
      credits: {
        enabled: false
      },
      tooltip: {
        shared: false,
        useHTML: true,
        borderWidth: 0,
        backgroundColor: 'rgba(255,255,255,0)',
        shadow: false,
        formatter: function () {
          const point = this.point
          return '<span class="myTooltip" style="background-color:' + point.color + ';">' + point.y + '&nbsp' + 'سوال' + '</span>'
        }
      },
      xAxis: {
        labels:
          {
            enabled: false
          }
      },
      yAxis: {
        labels:
          {
            enabled: false
          }
      },
      plotOptions: {
        pie: {
          innerSize: '98%',
          startAngle: -250,
          endAngle: 360,
          borderWidth: 19,
          center: ['50%', '52%'],
          size: '100%',
          borderColor: null,
          slicedOffset: 0,
          dataLabels: {
            connectorWidth: 0,
            enabled: false
          }
        }
      },
      title: {
        y: 26,
        style: {
          useHTML: true
        },
        verticalAlign: 'middle',
        floating: true,
        text: ''
      },
      series: [{
        id: 'idData',
        data: []
      }]
    },
    questionListKey: Date.now(),
    loadingQuestion: new Question(),
    questions: new QuestionList(),
    disablePagination: false,
    paginationMeta: {
      current_page: 1,
      from: 0,
      last_page: 1,
      links: [],
      path: '',
      per_page: 0,
      to: 0,
      total: 0
    }
  }),
  created () {
    this.initPageData()
  },
  computed: {
    examInfo() {
      return {
        id: this.exam.id,
        type: 'کنکور',
        title: this.exam.title,
        major: this.examMajor(),
        grade: this.examGrade()
      }
    },
    questionLvl () {
      if (this.exam.questions.list.length < 1) return
      return {
        hard: this.exam.questions.list.filter(question => parseInt(question.level) === 3).length,
        medium: this.exam.questions.list.filter(question => parseInt(question.level) === 2).length,
        easy: this.exam.questions.list.filter(question => parseInt(question.level) === 1).length
      }
    }
  },
  methods: {
    async initPageData () {
      this.questions = new QuestionList({ ...this.exam.questions })
      this.reIndexEamQuestions(this.exam.questions.list)
      this.reIndexEamQuestions(this.questions.list)
      this.setChartWidth()
    },

    setChartWidth() {
      const windowSize = this.$store.getters['AppLayout/windowSize']
      if (windowSize.x > 1439) {
        return
      }
      this.chartOptions.chart = {
        height: '130',
        width: '130',
        type: 'pie',
        plotShadow: false
      }
      this.chartOptions.plotOptions.pie.borderWidth = 15
    },

    examMajor() {
      return this.majors.find(item => item.id === this.exam.temp.major).value
    },

    examGrade() {
      return this.grades.find(item => item.id === this.exam.temp.grade).title
    },

    changeSelectedQuestionOrder (value) {
      const fromIndex = this.questions.list.findIndex(item => item.id === value.question.id)
      // if (value.mode === 'down') {
      //   this.questions.list[fromIndex].order++
      //   this.questions.list[fromIndex + 1].order--
      // } else {
      //   this.questions.list[fromIndex].order--
      //   this.q uestions.list[fromIndex - 1].order++
      // }

      if (value.mode === 'down') {
        this.questions.list[fromIndex].order = fromIndex + 2
        this.questions.list[fromIndex + 1].order = fromIndex + 1
      } else {
        this.questions.list[fromIndex].order = fromIndex
        this.questions.list[fromIndex - 1].order = fromIndex + 1
      }

      const data = {
        questions: []
      }
      this.questions.list.forEach(question => {
        data.questions.push({
          id: question.id,
          order: question.order
        })
      })
      this.$emit('updateOrders', this.questions.list)
    },

    onClickedCheckQuestionBtn (question) {
      this.$emit('detachQuestion', [question])
    },

    isValid() {
      let error = false
      const messages = []
      if (this.exam.questions.list.length === 0) {
        error = true
        messages.push('هیچ سوالی انتخاب نشده است.')
      }
      return { error, messages }
    },

    goToPrevious() {
      this.$emit('previousStep')
    },

    confirmExam() {
      this.$emit('confirmExam')
    },

    reIndexEamQuestions (list) {
      list.map((item, index) => {
        item.selected = true
        item.order = index + 1
        return true
      })
    },

    setDifficultyLevelsChart() {
      this.chartOptions.series[0].data = []
      if (this.questionLvl.medium) {
        this.chartOptions.series[0].data.push(
          { name: 'متوسط', y: this.questionLvl.medium, color: '#FFCA28' }
        )
      }
      if (this.questionLvl.easy) {
        this.chartOptions.series[0].data.push(
          { name: 'آسان', y: this.questionLvl.easy, color: '#8ED6FF' }
        )
      }
      if (this.questionLvl.hard) {
        this.chartOptions.series[0].data.push(
          { name: 'سخت', y: this.questionLvl.hard, color: '#DA5F5C' }
        )
      }
      // this.chartOptions.series[0].data.push(
      //   { name: 'سخت', y: this.questionLvl.hard, color: '#DA5F5C' }
      // )
    },

    replaceTitle () {
      this.chartOptions.title.text = '<span class="title-1"> ' + this.exam.questions.list.length + '<br>' + '<br>' + '</span>' + '<span dy="-8" class="title-2">سوال</span>'
    }
  }
}
</script>

<style scoped lang="scss">
.main-container {

  padding: 0;
  .exam-detail-container{
    padding-right: 24px;
    @media screen and (max-width: 1439px){
      padding-right: 0;
    }
    .action-btn{
      width: 100%;
      @media screen and(max-width: 1439px) {
        display: grid;
        justify-content: flex-end;
        grid-template-columns: 140px 140px;
        column-gap: 12px;
      }
      .confirm-b{
        margin-bottom: 12px;
        @media screen and (max-width: 1439px) {
          order:1
        }
      }
      .previous-b {
        @media screen and (max-width: 1439px) {
          order:0
        }
      }
      .previous{
        background: #F2F5F9;
        color: #6D708B;
        //margin-top: 12px;
        @media screen and (max-width: 1439px) {
          margin-top: 0;
        }
      }
      .confirm{
        font-weight: 700;
      }

    }
    .exam-detail-content{
      margin-bottom: 16px;
      box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
      border-radius: 20px;
      background: #FFFFFF;
      padding: 20px 24px 24px 24px;
      @media screen and (max-width: 1023px){
          padding: 16px 20px 20px 20px;
      }
      .exam-specifications{
        padding-bottom: 8px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        @media screen and (max-width: 1439px ){
          justify-content: flex-start;
          margin-bottom: 21px;
        }
        @media screen and (max-width: 1023px ){
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .header-title{
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 28px;
          color: #23263B;
        }
        .exam-title{
          padding: 1px 9px 1px 7px;
          background: #F4F5F6;
          border-radius: 10px 12px 12px 10px;
          font-weight: 400;
          font-size: 12px;
          line-height: 21px;
          color: #23263B;
          display: flex;
          align-items: center;
          p {
            max-width: 95px;
            margin-bottom: 0;
          }
          @media screen and (max-width: 1439px ){
            margin-left: 12px;
          }
          @media screen and (max-width: 599px ){
            margin-left: 0;
          }
        }
      }
      .exam-details{
        margin-bottom: 10px;
        @media screen and (max-width: 1439px){
          margin-right: 27px;
        }
        @media screen and (max-width: 1023px){
          margin-right: 0;
        }
        .exam-detail-item{
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        p{
          margin-bottom: 4px;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: #23263B;
        }
        .field{
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #23263B;
        }
        .value{
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #6D708B;
        }
        .exam-title{

        }
      }
      .selected-questions{
        @media screen and (max-width: 1439px){
          position: relative;
        }
        .title{
          font-weight: 500;
          font-size: 16px;
          line-height: 28px;
          color: #23263B;
          border-top: 1px solid #E4E8EF;
          padding-top: 13px;
          @media screen and (max-width: 1439px){
            border-top: none;
            padding-top: 0;
            position: absolute;
            top: 0;
            line-height: 25px;
          }
          @media screen and (max-width: 1023px){
            position: relative;
          }

        }
        .chart-box{
          align-items: center;
          justify-content: space-around;
          margin-bottom: 20px ;
          @media screen and (max-width: 1439px){
            align-items: flex-end;
            margin-bottom: 16px;
          }
          @media screen and (max-width: 1023px){
            justify-content: center;
            margin-bottom:0 ;
          }
          .type-box{
            @media screen and (max-width: 1023px){
              display: flex;
              justify-content: center;
              order: 1;
              margin-top: 20px;
              margin-bottom: 53px;
            }
          }

          .chart-b{
            &:deep( .myTooltip) {
              border-radius: 10px;
              direction: ltr;
              color: var(--3a-Neutral3);
              padding: 5px !important;
              width: 50px;
              white-space: normal !important;
              display: flex;
              justify-content: center;
            }

            &:deep( .title-1 ) {
              font-weight: 700;
              font-size: 24px;
              line-height: 20px;
              text-align: center;
              color: #23263B;
            }

            &:deep( .title-2) {
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              text-align: center;
              color: #23263B;
            }
            @media screen and (max-width: 1439px){
              //margin-top: 12px;
            }
            @media screen and (max-width: 1023px){
              order: 0;
            }
          }
          .chart-titles {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #23263B;
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            @media screen and (max-width: 1023px){
              margin-right: 10px;
            }

            .titles-icon {
              width: 13px;
              height: 13px;
              margin-right: 4px;
            }

            .hard {
              background-color: #DA5F5C;
            }

            .medium {
              background-color: #FFCA28;
            }

            .easy {
              background-color: #8ED6FF;
            }
          }
        }

      }
    }
    .exam-categories{
      box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
      border-radius: 20px;
      background: #FFFFFF;
      padding: 20px 24px 24px 24px;
      .title-show-categories{
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        color: #23263B;
      }
      .attached-exam-box {
        margin-bottom: 10px;
        overflow: auto;
        .exam-result-box {
          margin-top: 16px;
          margin-bottom: 8px;
          :first-child {
            margin-left: 0px !important;
          }
          .exam-result-title {
            font-weight: 400;
            font-size: 12px;
            line-height: 21px;
            margin-left: 10px;
            color: #9092A7;
          }
        }
        .attached-exam {
          align-items: center;
          .attached-exam-title {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-left: 0px !important;
          }
          .detach-box {
            margin-left: 16px;
            margin-bottom: 16px;
            color: #E86562;
          }
          .detach-btn {
            background: #F4F5F6;
            border-radius: 10px;
            width: 40px;
            height: 40px;
          }
          .exam-result {
            padding: 0;
            margin-left: 10px;
            background: #F4F5F6;
            border-radius: 10px;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #65677F;
            margin-bottom: 16px;
          }
          .order-exam-title {
            padding: 8px;
          }
        }
      }
    }
  }
  .question-item-content {
    margin-bottom: 16px;
  }
}

@media only screen and (max-width: 1919px) {
  .main-container {
    padding-left: 0;
    //padding-right: 24px;
  }
  .question-bank-filter {
    padding-right: 20px;
  }
}
@media only screen and (max-width: 1439px) {
  .main-container {
    padding-left: 0
  }
  .question-bank-header {
    padding-bottom: 20px;
  }

  .question-bank-filter {
    padding-right: 20px;
  }

  .question-bank-toolbar {
    padding-bottom: 20px;
  }
}
@media only screen and (max-width: 1023px) {
  .question-bank-filter {
    padding-right: 0px;
  }
}
@media only screen and (max-width: 599px) {
  .question-bank-toolbar {
    padding-bottom: 0;
  }
}
</style>
