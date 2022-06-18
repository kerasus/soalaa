<template>
  <div class="main-container">
    <div class="row">
      <div class="exam-detail-container col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
        <q-skeleton v-if="questions.loading" width="330px" height="400px" class="q-ml-xs"/>
          <div class="exam-detail-content" v-else>
            <div class="exam-specifications flex justify-between">
              <div class="header-title"> مشخصات آزمون </div>
              <div class="exam-title"> آزمون ۱۲۳۴۵۶۷</div>
            </div>
            <div class="exam-details">
              <p> <span class="field">نوع آزمون:</span> {{exam.type_id}}</p>
              <p> <span class="field">عنوان آزمون:</span> {{ exam.title }}</p>
              <p> <span class="field">رشته تحصیلی:</span> {{exam.major}}</p>
              <p> <span class="field">پایه تحصیلی:</span> {{exam.grade}}</p>
              <p> <span class="field">شروع آزمون:</span> {{exam.start_at}}</p>
              <p> <span class="field">پایان آزمون:</span> {{exam.finish_at}}</p>
              <p> <span class="field">مدت زمان آزمون:</span> {{exam.exam_time}} </p>
              <p> <span class="field">مدت تاخیر آزمون:</span> {{exam.delay_time}}</p>
            </div>
            <div class="selected-questions">
                <div class="title"> سوالات انتخابی</div>
                <div> highchart</div>
            </div>
            <div class="exam-btns">
              <q-btn
                unelevated
                class="q-mr-xl btn-md"
                :icon="'isax:arrow-right-3'"
                style="width: 100%;background: #F4F5F6;margin-bottom: 12px"
                @click="goToLastStep"
              >
                بازگشت
              </q-btn>
              <q-btn
                unelevated
                color="primary"
                class="q-mr-xl btn-md"
                style="width: 100%;"
                @click="goToNextStep"
              >
               تایید نهایی
              </q-btn>
            </div>
          </div>
      </div>
      <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12 ">
        <div class="question-item-content">
            <question-item v-if="questions.loading" :question="loadingQuestion" />
            <template v-else-if="exam.questions.length > 0">
              <q-virtual-scroll
                ref="scroller"
                :items="exam.questions"
                :virtual-scroll-item-size="450"
                :virtual-scroll-slice-size="5"
              >
                <template v-slot="{ item }">
                  <question-item
                    :key="item.id"
                    :question="item"
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
import moment from 'moment-jalaali'
import { Question, QuestionList } from 'src/models/Question'
import QuestionItem from 'components/Question/QuestionItem/QuestionItem'
import { Exam } from 'src/models/Exam'
// import QuestionFilter from 'components/Question/QuestionBank/QuestionFilter'

export default {
  name: 'FinalExamApproval',
  components: { QuestionItem },
  inject: {
    exam: {
      from: 'providedExam', // this is optional if using the same key for injection
      default: new Exam()
    }
  },
  data () {
    return {
      filterQuestions: {
        major_type: [],
        reference_type: [],
        year_type: []
      },
      questionListKey: Date.now(),
      selectedQuestions: [],
      questionId: [],
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
    }
  },
  created () {
    console.log(this.exam)
    this.getExamQuestions()
    this.changeTime()
  },

  methods: {
    changeTime () {
      this.exam.start_at = moment(this.exam.start_at, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
      this.exam.finish_at = moment(this.exam.finish_at, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
    },
    changeSelectedQuestionOrder (value) {
      const fromIndex = this.exam.questions.findIndex(item => item.id === value.question.id)
      let toIndex = fromIndex - 1 // the index before
      if (value.mode === 'down') {
        toIndex = fromIndex + 1 // the index after
      }
      const element = this.exam.questions.splice(fromIndex, 1)[0]
      this.exam.questions.splice(toIndex, 0, element)
      this.reIndexEamQuestions(this.exam.questions)
    },
    RemoveChoice (subcategoryId) {
      const target = this.exam.questions.findIndex(question => question.id === subcategoryId)
      this.exam.questions.splice(target, 1)
    },
    toggleQuestionSelected (question) {
      question.selected = !question.selected
    },
    handleAddOrDelete (question) {
      if (question.selected) {
        this.addQuestionToSelectedList(question)
      } else {
        this.deleteQuestionFromSelectedList(question)
      }
      this.reIndexEamQuestions(this.exam.questions)
    },
    onClickedCheckQuestionBtn (question) {
      this.toggleQuestionSelected(question)
      this.handleAddOrDelete(question)
    },
    addQuestionToSelectedList (question) {
      this.exam.questions.push(question)
      this.questionListKey = Date.now()
    },
    deleteQuestionFromSelectedList (question) {
      const target = this.exam.questions.findIndex(questionItem => questionItem.id === question.id)
      if (target === -1) {
        return
      }
      this.exam.questions.splice(target, 1)
      this.questionListKey = Date.now()
    },
    updatePage (page) {
      this.getExamQuestions(page)
    },
    reIndexEamQuestions (questionList) {
      questionList.map((item, index) => {
        item.selected = true
        item.order = index + 1
        return true
      })
    },
    fakeExamQuestionScenario (questionList) {
      this.reIndexEamQuestions(questionList)
      this.exam.questions = questionList
    },
    getExamQuestions (page) {
      this.fakeExamQuestionScenario(this.exam.questions.list)
    },
    goToLastStep () {
      this.$emit('goToLastStep')
    },
    goToNextStep () {
      this.$emit('goToNextStep')
    },
    watch: {
      selectedCategory: {
        handler () {
          this.selectedLesson = ''
        },
        deep: true
      }
    }
  }
}
</script>

<style scoped lang="scss">

.main-container {
  padding: 0 80px 0 84px;
  .exam-detail-container{
    padding-right: 24px;
    .exam-detail-content{
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
        }
      }
      .exam-details{
        margin-bottom: 10px;
        p{
          margin-bottom: 4px;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: #23263B;
        }
        .field{
          font-weight: 700;
          font-size: 14px;
          line-height: 24px;
          text-align: right;
          color: #23263B;
        }
      }
      .selected-questions{
        margin-bottom: 30px;
        .title{
          font-weight: 500;
          font-size: 16px;
          line-height: 28px;
          color: #23263B;

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
    padding-right: 24px;
  }
  .question-bank-filter {
    padding-right: 20px;
  }
}
@media only screen and (max-width: 1439px) {
  .main-container {
    padding-left: 30px;
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
