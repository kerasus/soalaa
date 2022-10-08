<template>
  <div
    class="main-container ">
    <div class="row">
      <div class="exam-detail-container col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
        <q-skeleton v-if="questions.loading"
                    width="330px"
                    height="400px"
                    class="q-ml-xs" />
        <div v-else
             class="exam-detail-content">
          <div class="exam-specifications q-mb-md flex justify-between">
            <div class="header-title"> مشخصات آزمون </div>
            <div class=" exam-title">
              <p class="ellipsis">
                آزمون  {{exam.id}}
              </p>
            </div>
          </div>
          <div class="exam-details">
            <div class="exam-detail-item">
              <div class="field">نوع آزمون:</div>
              <div class="value">
                عادی
              </div>
            </div>
            <div class="exam-detail-item">
              <div class="field">عنوان آزمون: </div>
              <div class="value">
                {{ exam.title }}
              </div>
            </div>
            <div class="exam-detail-item">
              <div class="field">رشته تحصیلی:</div>
              <div class="value">
                {{ examMajor() }}
              </div>
            </div>
            <div class="exam-detail-item">
              <div class="field">پایه تحصیلی:</div>
              <div class="value">
                {{ examGrade() }}
              </div>
            </div>
          </div>
          <q-separator class="q-my-lg" />
          <div class="selected-questions">
            <div class="title"> سوالات انتخابی</div>
            <div class="chart-box row justify-around items-center q-mt-md">
              <div class="col-4">
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
              <div class="col-8">
                <chart class="row justify-end"
                       :options="chartOptions" />
              </div>
            </div>
          </div>
          <div class="action-btn">
            <q-btn
              unelevated
              color="primary"
              class="full-width confirm q-mr-xl"
              @click="confirmExam"
            >
              تایید نهایی و ساخت آزمون
            </q-btn>
            <q-btn
              unelevated
              class="full-width q-mr-xl previous"
              @click="goToPrevious"
            >
              بازگشت
            </q-btn>
          </div>
        </div>
        <div v-if="exam.categories.length > 2"
             class="exam-categories">
          <div class="title-show-categories">دفترچه های تعریف شده </div>
          <div class="attached-exam-box">
            <div class="flex row exam-result-box">
              <div class="col-6 exam-result-title">
                دفترچه
              </div>
              <div class="col-3 exam-result-title">
                زمان
              </div>
              <div class="col-1 exam-result-title">
                ترتیب
              </div>
            </div>
            <div>
              <div v-for="(category, index) in exam.categories"
                   :key="index"
                   class="flex row attached-exam">
                <div class="detail-box exam-result attached-exam-title  detail-box-first col-6">
                  {{category?.title}}
                </div>
                <div class="detail-box exam-result detail-box-first col-3">
                  {{category?.time}}
                </div>
                <div class="detail-box exam-result order-exam-title detail-box-last col-1">
                  {{category?.order}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12 ">
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
                  :loading="exam.loading"
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
  </div>
</template>

<script>
import { Question, QuestionList } from 'src/models/Question'
import QuestionItem from 'components/CommonComponents/Exam/Create/QuestionTemplate/QuestionItem'
import { Exam } from 'src/models/Exam'

import { Chart } from 'highcharts-vue'
export default {
  name: 'FinalApprovalTab',
  components: { QuestionItem, Chart },
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
            connectorWidth: 0
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
    questionLvl () {
      if (this.exam.questions.list.length < 1) return
      return {
        hard: this.exam.questions.list.filter(question => parseInt(question.level) === 3).length,
        medium: this.exam.questions.list.filter(question => parseInt(question.level) === 2).length,
        easy: this.exam.questions.list.filter(question => parseInt(question.level) === 1).length
      }
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
      handler() {
        this.exam.questions.list.forEach(question => {
          question.selected = true
        })
        this.$nextTick(() => {
          this.setDifficultyLevelsChart()
          this.replaceTitle()
          this.reIndexEamQuestions(this.exam.questions.list)
        })
      }
    }
  },
  methods: {
    async initPageData () {
      this.questions = new QuestionList({ ...this.exam.questions })
      this.reIndexEamQuestions(this.exam.questions.list)
      this.reIndexEamQuestions(this.questions.list)
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
      //   this.questions.list[fromIndex - 1].order++
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
      this.chartOptions.series[0].data = [
        { name: 'متوسط', y: this.questionLvl.medium, color: '#FFCA28' },
        { name: 'آسان', y: this.questionLvl.easy, color: '#8ED6FF' },
        { name: 'سخت', y: this.questionLvl.hard, color: '#DA5F5C' }
      ]
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
    @media screen and (max-width: 1023px){
      padding-right: 0;
    }
    .action-btn{
      .previous{
        background: #F2F5F9;
        color: #6D708B;
        margin-top: 12px;
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
      .exam-specifications{
        padding-bottom: 8px;
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
        }
      }
      .exam-details{
        margin-bottom: 10px;
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
      }
      .selected-questions{
        margin-bottom: 30px;
        .chart-box{
          .chart-titles {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #23263B;
            display: flex;
            align-items: center;
            margin-bottom: 8px;

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
        .title{
          font-weight: 500;
          font-size: 16px;
          line-height: 28px;
          color: #23263B;

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
