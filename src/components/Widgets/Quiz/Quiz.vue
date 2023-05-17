<template>
  <div class="quiz-container">
    <div v-if="allExamsList.loading"
         class="loading">
      <div v-if="upcomingExams.list.length > 0"
           class="row">
        <div class="col-12 col-md-4">
          <q-skeleton width="200px"
                      height="100px" />
        </div>
        <div class="col-12 col-md-4">
          <q-skeleton width="200px"
                      height="100px" />
        </div>
        <div class="col-12 col-md-4">
          <q-skeleton width="200px"
                      height="100px" />
        </div>
      </div>
      <div class="row q-mt-xl">
        <div class="col-12 q-mt-md">
          <q-skeleton type="rect" />
        </div>
        <div class="col-12 q-mt-md">
          <q-skeleton type="rect" />
        </div>
        <div class="col-12 q-mt-md">
          <q-skeleton type="rect" />
        </div>
        <div class="col-12 q-mt-md">
          <q-skeleton type="rect" />
        </div>
      </div>
    </div>
    <div v-else
         class="quiz-page-wrapper">
      <div
        class="userExamList"
        style="font-size: 16px;"
      >
        <div v-if="allExamsList.list.length > 0 || myExams.list.length > 0 || upcomingExams.list.length > 0"
             class="fit row wrap justify-center items-start content-start"
        >
          <div v-if="$q.screen.lt.sm"
               class="col-12">
            <div class="flex justify-start my-exam-btn">
              <q-btn color="dark"
                     icon="east"
                     flat
                     label="آزمون های من"
                     @click="gotoMyExam" />
            </div>
          </div>
          <div class="col col-12 examList-container">
            <div v-if="upcomingExams.list.length > 0"
                 class="slider-row">
              <future-quizzes-carousel :exams="upcomingExams" />
            </div>
            <div class="row">
              <div class="col-12">
                <div class="exam-list-title">
                  آزمون ها
                </div>
                <q-tabs
                  v-model="tab"
                  color="light1"
                  class="exam-tabs"
                  active-class="active-tab"
                  active-color="secondary"
                  align="left"
                >
                  <q-tab name="exam"
                         label="آزمون های سه آ" />
                  <q-tab name="myExam"
                         label="آزمون های من" />
                </q-tabs>
                <q-tab-panels v-model="tab"
                              class="quiz-panels"
                              animated>
                  <q-tab-panel name="exam">
                    <quiz-list
                      :key="examPagination"
                      :pagination="pagination.exam.current_page"
                      :pageCount="pageCount"
                      :quiz-type="'exam'"
                      :exams="allExamsList"
                      :personal="false"
                      @onFilter="filterAllExams"
                      @changePage="paginateList($event,'exam')"
                    />
                  </q-tab-panel>
                  <q-tab-panel name="myExam">
                    <quiz-list
                      :key="myExamPagination"
                      :pagination="pagination.myExam.current_page"
                      :pageCount="pageCount"
                      :quiz-type="'myExam'"
                      :exams="myExams"
                      :personal="true"
                      @onFilter="filterMyExams"
                      @changePage="paginateList($event,'myExam')"
                    />
                  </q-tab-panel>
                </q-tab-panels>
              </div>
            </div>
          </div>
        </div>
        <div v-else
             class="row">
          <div class="col-12 flex column flex-center">
            <img class="no-item"
                 src="https://nodes.alaatv.com/aaa/landing/Soalaa/States/empty_azmuns.png"
                 alt="no-item">
            <div class="no-item-title">
              شما آزمون ساخته شده ای ندارید
            </div>
            <q-btn class="new-link"
                   flat
                   unelevated
                   label="ثبت نام در آزمون"
                   @click="gotoSubscription" />
            <q-btn class="new-link"
                   flat
                   unelevated
                   label="ساخت آزمون جدید"
                   @click="gotoExamCreate" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import FutureQuizzesCarousel from 'src/components/Quiz/FutureQuizzesCarousel'
import QuizList from 'src/components/Quiz/QuizList'
import API_ADDRESS from 'src/api/Addresses'
import { ExamList } from 'src/models/Exam'
import moment from 'moment'
import Time from 'src/plugins/time.js'

export default defineComponent({
  name: 'List',
  //       ToDo : ProgressLinear
  components: {
    FutureQuizzesCarousel,
    QuizList
  },
  data() {
    return {
      tab: 'exam',
      pagination: {
        exam: {
          total: 0,
          per_page: 0,
          current_page: 1
        },
        myExam: {
          total: 0,
          per_page: 0,
          current_page: 1
        }
      },
      filterData: {},
      date: moment(new Date(Time.now())).format('YYYY-MM-DD'),
      examPagination: 1,
      myExamPagination: 1,
      paginationPage: 1,
      allExamsList: new ExamList(),
      upcomingExams: new ExamList(),
      myExams: new ExamList()
    }
  },
  computed: {
    pageCount() {
      let pageCount
      if (this.tab === 'exam') {
        pageCount = this.pagination.exam.total / this.pagination.exam.per_page
      } else {
        pageCount = this.pagination.myExam.total / this.pagination.myExam.per_page
      }
      if (pageCount < 0 || pageCount === undefined) {
        return 0
      } else {
        return Math.ceil(pageCount)
      }
    }
  },
  mounted() {
    // this.getAllExams()
    this.getBaseExamList()
    this.getMyExams()
    this.getUpcomingExams()
  },
  methods: {
    getBaseExamList () {
      this.allExamsList.loading = true
      this.$axios.get(API_ADDRESS.exam.userExamList.base(), {
        params:
          {
            start_at_till: this.date,
            page: 1
          }
      })
        .then((response) => {
          this.allExamsList = new ExamList(response.data.data)
          this.pagination.exam = response.data.meta
          this.allExamsList.loading = false
          this.filterData.to = this.date
        }).catch(() => {
          this.allExamsList.loading = false
        })
    },
    filterMyExams(filterData) {
      this.filterData = filterData
      this.getMyExams(filterData.title, filterData.from, filterData.to)
    },
    filterAllExams(filterData) {
      this.filterData = filterData
      this.getAllExams(filterData.title, filterData.from, filterData.to)
    },
    getAllExams (title, start, end, page) {
      this.allExamsList.loading = true
      this.$axios.get(API_ADDRESS.exam.userExamList.base(),
        {
          params:
            {
              ...(title && { title }),
              ...(start && { start_at_from: start }),
              ...(end && { start_at_till: end }),
              ...(page && { page })
            }
        })
        .then((response) => {
          this.allExamsList = new ExamList(response.data.data)
          this.pagination.exam = response.data.meta
          this.allExamsList.loading = false
          this.examPagination++
        }).catch(() => {
          this.allExamsList.loading = false
        })
    },
    getMyExams (title, start, end, page) {
      this.myExams.loading = true
      this.$axios.get(API_ADDRESS.exam.userExamList.myExams(),
        {
          params:
            {
              ...(title && { title }),
              ...(start && { created_at_from: start }),
              ...(end && { created_at_till: end }),
              ...(page && { page })
            }
        })
        .then((response) => {
          this.myExams = new ExamList(response.data.data)
          this.pagination.myExam = response.data.meta
          this.myExams.loading = false
          this.myExamPagination++
        }).catch(() => {
          this.allExamsList.loading = false
        })
    },
    getUpcomingExams () {
      this.upcomingExams.loading = true
      const today = moment(new Date(Time.now())).format('YYYY-MM-DD')
      this.$axios.get(API_ADDRESS.exam.userExamList.upcomingExams(today))
        .then((response) => {
          this.upcomingExams = new ExamList(response.data.data)
          this.upcomingExams.loading = false
        }).catch(() => {
          this.allExamsList.loading = false
        })
    },
    gotoMyExam() {
      this.tab = 'myExam'
    },
    gotoSubscription() {
      this.$router.push({ name: 'Landing.3aExams' })
    },
    gotoExamCreate() {
      this.$router.push({ name: 'User.Create.Exam' })
    },
    paginateList(event, exam) {
      if (exam === 'exam') {
        this.getAllExams(this.filterData.title, this.filterData.from, this.filterData.to, event)
      } else {
        this.getMyExams(this.filterData.title, this.filterData.from, this.filterData.to, event)
      }
    }
  }

})
</script>

<style lang="scss" scoped>
.userExamList {
  font-size: 16px;
}
:deep(.q-tab__indicator) {
  width: 100%;
  height: 6px;
  border-radius: 6px 6px 0 0;
}
.exam-tabs {
  color: #8A8CA6;

  :deep(.active-tab){
      .q-tab__label{
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;

        @media only screen and (max-width: 600px) {
          font-size: 12px;
          font-weight: 500;
        }
      }
  }

  &:deep(.q-tab) {
    color: var(--3a-TextSecondary);
    padding: 0;
  }

  &:deep(.q-tab__content) {
    padding: 0 24px;
  }

  &:deep(.q-tab__label) {
    font-style: normal;
    font-size: 16px;
    line-height: 25px;
    padding-bottom: 8px;
    text-align: center;
    letter-spacing: -0.03em;

    @media only screen and (max-width: 600px) {
      font-size: 12px;
      font-weight: 500;
    }
  }

  @media only screen and (max-width: 600px) {
    width: 240px;
  }
}

.my-exam-btn {
  margin-bottom: 24px;
}

.exam-list-title {
  margin: 20px 0 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  text-align: left;
  color: #434765;
}

.q-tab-panels {
  background: transparent;
  border-top: 2px solid #E4E8EF;

  .q-tab-panel {
    padding: 2px 0;
  }
}

.no-item {
  width: 290px;
  height: 290px;
  margin: 160px 0 30px 0;

  @media only screen and (max-width: 390px) {
    width: 230px;
    height: 230px;
    margin: 100px 0 30px 0;

  }
}

.no-item-title {
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 34px;
  text-align: center;
  color: #6D708B;

  @media only screen and (max-width: 600px) {
    font-size: 20px;
    line-height: 31px;
  }
  @media only screen and (max-width: 390px) {
    font-size: 18px;
    line-height: 28px;
  }
}

.new-link {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: #8075DC;
  text-transform: none;
  margin-top: 12px;
}
</style>
