<template>
  <div class="exam-results">
<!--    <v-row class="d-flex justify-center">-->
    <div class="row wrap justify-center">
      <div class="col results-info-col">
        <info/>
      </div>
    </div>
    <div class="row wrap justify-center">
      <div class="col default-col-padding">
        <q-card
            flat
            class="infoCard content-center"
        >
          <div
            class="row main-tabs"
          >
            <div
              class="col col-12 col-xl-3 col-sm-6 exam-title default-result-padding"
            >
              نتیجه
              {{ quiz.title }}
              سه آ
            </div>
            <div
                v-if="report"
                class="col col-6 col-xl-1 col-sm-3 default-result-padding"
            >
              شهر:
              {{ report.location.city }}
            </div>
            <div
                v-if="report"
                class="col col-6 col-xl-1 col-sm-3 default-result-padding"
            >
              استان:
              {{ report.location.province }}
            </div>
            <div
                class="col col-12 col-xl-7 default-result-tabs-title"
                :style="{ padding: '0 12px' }"
            >
              <q-tabs
                v-model="tab"
                dense
                active-color="primary"
                indicator-color="primary"
                align="justify"
                class="result-tabs"
              >
                <q-tab name="result" label="کارنامه"></q-tab>
                <q-tab name="rank" label="تخمین رتبه"></q-tab>
                <q-tab name="lessons" label="ریزدرس ها"></q-tab>
                <q-tab name="KeyAnswers" label="پاسخبرگ کلیدی"></q-tab>
                <q-tab name="descriptiveAnswers" label="پاسخ نامه تشریحی"></q-tab>
                <q-tab name="videos" label="تحلیل ویدیویی"></q-tab>
              </q-tabs>
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <div class="row wrap justify-center">
      <div class="col">
        <q-tab-panels v-model="tab" animated swipeable>
          <q-tab-panel name="result">
            <PersonalResult :report="report"/>
          </q-tab-panel>
          <q-tab-panel name="rank">
            <takhmin-rotbe :report="report"/>
          </q-tab-panel>
          <q-tab-panel name="lessons">
            <StatisticResult :report="report"/>
          </q-tab-panel>
          <q-tab-panel name="KeyAnswers">
            <BubbleSheet
                :info="{ type: 'pasokh-nameh' }"
                delay-time="0"
            />
          </q-tab-panel>
          <q-tab-panel name="descriptiveAnswers">
            <q-card flat>
              <p class="tab-title pt-5 pr-5">
                دانلود پاسخنامه تشریحی
              </p>
              <div v-if="report">
                <div
                    v-for="(item, index) in report.exams_booklet"
                    :key="index"
                    class="row download-row"
                >
                  <div
                    class="col col-12 col-sm-6"
                  >
                    <div
                        v-if="item.descriptive_answers_url"
                        class="download-box"
                    >
                      <p class="download-title">
                        دانلود پاسخنامه تشریحی {{
                          item.title
                        }}
                      </p>
                      <q-btn
                        outline
                        :href="item.descriptive_answers_url"
                        target="_blank"
                      >
                        دانلود فایل PDF
                        <q-icon name="mdi-download" />
                      </q-btn>
                    </div>
                  </div>
                  <div
                    class="col col-12 col-sm-6"
                  >
                    <div
                        v-if="item.questions_url"
                        class="download-box"
                    >
                      <p class="download-title">
                        دانلود سوالات {{ item.title }}
                      </p>
                      <q-btn
                        outline
                        :href="item.questions_url"
                        target="_blank"
                      >
                        دانلود فایل PDF
                        <q-icon name="mdi-download" />
                      </q-btn>
                    </div>
                  </div>
                </div>
              </div>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="videos" class="video-tab">
            <tabs-of-lessons :report="report" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import Info from 'src/components/OnlineQuiz/Quiz/resultTables/info'
import PersonalResult from 'src/components/OnlineQuiz/Quiz/resultTables/personalResult'
import BubbleSheet from 'src/components/OnlineQuiz/Quiz/bubbleSheet/bubbleSheet'
import Assistant from 'src/plugins/assistant'
import { AlaaSet } from 'src/models/AlaaSet'
import { mixinAuth, mixinQuiz } from 'src/mixin/Mixins'
import { AlaaContent } from 'src/models/AlaaContent'
import StatisticResult from 'src/components/OnlineQuiz/Quiz/resultTables/statisticResult'
import TakhminRotbe from 'src/components/OnlineQuiz/Quiz/TakhminRotbe'
import ExamData from 'src/assets/js/ExamData'
import TabsOfLessons from 'components/OnlineQuiz/Quiz/videoPlayerSection/tabsOfLessons'

export default {
  name: 'Result',
  components: { TabsOfLessons, TakhminRotbe, StatisticResult, BubbleSheet, Info, PersonalResult },
  mixins: [
    mixinAuth,
    mixinQuiz
  ],
  data: () => ({
    tab: null,
    selectedTimepoint: null,
    timepointsHeights: 0,
    videoLesson: null,
    alaaSet: new AlaaSet(),
    alaaContent: new AlaaContent(),
    alaaVideos: null,
    report: null,
    tab2: null,
    innerTab: 'innerMails',
    splitterModel: 20
  }),
  created () {
    // console.log('report.exams_booklet', this.report.exams_booklet)
    this.getUserData()
    window.currentExamQuestions = null
    window.currentExamQuestionIndexes = null
  },
  mounted () {
    this.getExamData()
    // setTimeout(() => { this.tab = 'result' }, 2000)
  },
  methods: {
    getExamData () {
      // ToDo : loading: false not working
      // this.$store.dispatch('loading/overlayLoading', { loading: true, message: '' })
      // this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
      const that = this
      const user_exam_id = this.$route.params.user_exam_id
      const exam_id = this.$route.params.exam_id
      const examData = new ExamData(this.$axios)
      examData.getUserExamWithCorrectAnswers(user_exam_id, exam_id)
        .loadQuestionsFromFile()
        .getUserExamData(user_exam_id)
        .getUserExamDataReport(user_exam_id)
        .run()
        .then(() => {
          // save questions in localStorage
          that.saveCurrentExamQuestions(examData.exam.questions.list)
          // save exam info in vuex store (remove questions of exam then save in store)
          that.$store.commit('Exam/updateQuiz', examData.exam)
          that.$store.commit('Exam/mergeDbAnswersIntoLocalstorage', {
            dbAnswers: examData.userExamData,
            exam_id: examData.exam.id
          })
          that.report = examData.studentReport
          that.loadKarname(examData.studentReport)
          this.tab = 'result'
          // that.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
        })
        .catch((error) => {
          that.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
          that.goToExamList()
          console.log(error)
          this.$q.notify({
            type: 'negative',
            message: 'مشکلی در دریافت اطلاعات کارنامه رخ داده است.',
            position: 'top'
          })
        })
    },
    goToExamList () {
      if (this.$route.name !== 'user.exam.list') {
        this.$router.push({ name: 'user.exam.list' })
      }
    },
    loadKarname (report) {
      this.loadSubCategory(report)
      this.loadZirGrooh(report.zirgorooh)
      this.loadBest(report.best)
      report.main.taraaz = parseFloat(report.main.taraaz).toFixed(0)
    },
    loadBest (best) {
      best.sub_category.forEach((item, index) => {
        item.top_ranks_taraaz_mean = parseFloat(item.top_ranks_taraaz_mean).toFixed(0)
        item.mean = parseFloat(item.mean).toFixed(1)
        item.top_ranks_percent_mean = parseFloat(item.top_ranks_percent_mean).toFixed(1)
        item.index = index + 1
      })
    },
    loadSubCategory (report) {
      report.sub_category.forEach((item, index) => {
        const targetBest = report.best.sub_category.find(sub_categoryItem => sub_categoryItem.sub_category === item.sub_category)
        item.percent = parseFloat(item.percent).toFixed(1)
        item.taraaz = parseFloat(item.taraaz).toFixed(0)
        item.empty = item.total_answer - item.right_answer - item.wrong_answer
        item.index = index + 1
        if (targetBest) {
          item.top_ranks_taraaz_mean = parseFloat(targetBest.top_ranks_taraaz_mean).toFixed(0)
          item.top_ranks_percent_mean = parseFloat(targetBest.top_ranks_percent_mean).toFixed(1)
          item.average = parseFloat(targetBest.mean).toFixed(1)
          item.taraaz_average = parseFloat(targetBest.taraaz_mean).toFixed(1)
        }
      })
    },
    loadZirGrooh (zirgorooh) {
      zirgorooh.sort((first, second) => {
        return first.title.localeCompare(second.title)
      })
      zirgorooh.forEach((item) => {
        item.percent = parseFloat(item.percent).toFixed(1)
        item.taraaz = parseFloat(item.taraaz).toFixed(0)
      })
    },
    getContent (contentId, sub_categoryIndex) {
      const that = this
      this.alaaContent.show(contentId)
        .then((response) => {
          that.currentVideo = response.data.data
          that.initVideoJs(that.currentVideo.file.video, sub_categoryIndex)
        })
        .catch((error) => {
          Assistant.reportErrors(error)
          that.currentVideo = null
        })
    },
    getAlaaSet (setId, sub_categoryIndex) {
      const that = this
      this.alaaSet.loading = true
      this.alaaSet.show(setId)
        .then((response) => {
          that.alaaSet.loading = false
          that.alaaSet = new AlaaSet(response.data.data)
          that.alaaVideos = that.alaaSet.contents.getVideos()
          that.getContent(that.alaaVideos[0].id, sub_categoryIndex)
        })
        .catch(() => {
          that.alaaSet.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
.exam-results {
  margin-top: 16px;
  padding: 12px;
  .default-col-padding{
    padding: 12px 0px;
  }
  .results-info-col {
    padding: 12px 0px;
  }
  .result-tabs{
    //width: 50%;
  }
  .main-tabs {
    font-size: 16px;
  }
  .default-result-padding {
    padding: 12px;
  }
  .default-result-tabs-title {
    max-width: 700px;
    color: rgba(0, 0, 0, 0.54);
  }
  .download-box {
    .download-title {
      font-size: 16px;
    }
    .q-btn--outline {
      border: 5px solid currentColor;
      border-radius: 40px;
      color: #fbcf4b;
      height: 75px;
      width: 250px;
      .q-btn__content {
        color: #666;
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
  }
}

@media only screen and (min-width: 960px) {
  .video-tab,
  .video-tab .v-tabs .v-slide-group__wrapper {
    background-color: #f4f4f4 !important;
  }

  .video-tab .v-tabs .v-slide-group__wrapper {
    padding: 25px 0;
  }

  .video-tab .v-window.v-item-group.theme--light.v-tabs-items {
    border-radius: 25px;
  }

  .video-tab .v-tab {
    width: 200px;
    background: #ebeaea;
    margin: 5px 0 5px 20px;
    height: 48px !important;
    border-radius: 10px;
  }

  .video-tab .v-tab.v-tab--active {
    background-color: #fff;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    margin-left: 0 !important;
    box-sizing: content-box;
    border-right: 10px solid rgb(255, 193, 7);
    padding-right: 0;
  }
}
@media only screen and (max-width: 670px) {
  .exam-results .main-tabs {
    .q-tabs--horizontal {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
}

.text-center {
  direction: ltr;
}

.tab-title {
  margin: 25px;
  font-size: 16px;
}

.download-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
}

.video-player {
  border-radius: 25px;
  margin: 20px 0;
}

.download-row .v-btn__content {
  color: #666;
}

.download-row .v-btn--outlined {
  border: 5px solid currentColor;
  border-radius: 30px;
}
</style>

<style scoped>
.theme--light.v-tabs-items {
  background-color: transparent;
}

.exam-title {
  display: flex;
  align-items: center;
}

.download-row {
  margin: 0 10%;
}

.video-title {
  margin-top: 20px;
}
/*TODO : TEMP */
.q-tab-panel {
  padding: 0;
}
</style>
