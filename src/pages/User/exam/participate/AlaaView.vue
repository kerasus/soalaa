<template>

  <q-page
    :fluid="true"
    class="quiz-page"
    :style="{ height: '100%' }"
  >
    <div class="row " :style="{ 'min-height': '100%' }">
      <div class="col" :style="{ 'min-width': '100%' }"
      >
        <q-page
          class="q-flex align-stretch"
          width="100%"
          color="--background-2"
            :style="{ 'min-height': '100%' }"
        >
          <div class="row">
            <!--&lt;!&ndash;              v-if= "getQuestionNumberFromId(currentQuestion.id) !== 1"&ndash;&gt;-->
            <div class="col btnpre col-md-1 justify-center d-none"
            >
              <q-btn
                flat
                class="q-px-none"
                :style="{ 'width':'60px','height': '400px' }"
                no-shadow
                @click="goToPrevQuestion('onlineQuiz.alaaView')"
              >
                <q-icon
                  size="40px"
                  name="mdi-chevron-right"
                />
              </q-btn>
            </div>
            <div class="col col-md-10 q-py-sm ">
              <div class="row question-header">
                <div class="question-number">
                  <!--                    v-if="currentLesson"-->
                  <!--                    getQuestionNumberFromId(currentQuestion.id)-->
                  <p>
                    {{ "عربی عمومی" }}
                    -
                    سوال شماره
                    {{  "35" }}
                  </p>
                </div>
                <div class="question-buttons ">
                  <q-btn
                    size="12px"
                    round
                    flat
                  >
<!--                    @click="changeStatus(currentQuestion.id, 'o')"-->
<!--                    v-if="!getUserQuestionData(quiz.id, currentQuestion.id) || getUserQuestionData(quiz.id, currentQuestion.id).status !== 'o'"-->
                    <q-icon
                      :style="{ 'width':'24px','height': '24px' }"
                      color="grey-7"
                      size="30px"
                      name="mdi-checkbox-blank-circle-outline"
                    />
<!--                    v-if="getUserQuestionData(quiz.id, currentQuestion.id) && getUserQuestionData(quiz.id, currentQuestion.id).status === 'o'"-->
                    <q-icon
                      v-if="false "
                      color="amber"
                      size="30px"
                      name="mdi-checkbox-blank-circle"
                    />
                  </q-btn>
                  <q-btn
                    size="12px"
                    round
                    flat
                  >
<!--                    @click="changeStatus(currentQuestion.id, 'x')"-->
                    <!-- :color="getUserQuestionData(quiz.id, currentQuestion.id) && getUserQuestionData(quiz.id, currentQuestion.id).status === 'x' ? 'red' : '#888'"-->
                    <q-icon
                      size="30px"
                      color="grey-7"
                      name="mdi-close"
                    />
                  </q-btn>
<!--&lt;!&ndash;                  @click="changeBookmark(currentQuestion.id)"&ndash;&gt;-->
                  <q-btn
                    size="12px"
                    flat
                    round
                  >
<!--      v-if="!getUserQuestionData(quiz.id, currentQuestion.id) || !getUserQuestionData(quiz.id, currentQuestion.id).bookmarked"-->
                    <q-icon
                      v-if="false"
                      size="30px"
                      color="grey-7"
                      name="mdi-bookmark-outline"
                    />
<!--                    v-if="getUserQuestionData(quiz.id, currentQuestion.id) && getUserQuestionData(quiz.id, currentQuestion.id).bookmarked"-->
                    <q-icon
                      flat
                      color="blue-6"
                      size="30px"
                      name="mdi-bookmark"
                     />
                  </q-btn>
                </div>
              </div>

              <div class="row question-body">
                <div class="col" >
<!--                :class="{ ltr: isLtrString(currentQuestion.statement)}"-->
<!--                  v-if="currentQuestion.in_active_category"-->
                  <div
                    class="renderedPanel"
                  >
                    «ذَهَبَ عَامِلٌ اِلَی الصَّیدَلِیَّةِ وَ قَالَ لِلصَّیدَلِيّ:« هَل لَدَیکَ مَرهَمٌ لِلاسمنت (سیمان)؟» فَضَحکَ الصَّیدَلِيُّ مِنهُ سَاخِراً وَ قَالَ لَهُ: «نَعَم، لَدَینَا. هَل تُرِیدُ نَوعِیَّةً مُمتَازَةً أم نَوعِیَّةً عَادِیَّةً؟» فَقَالَ العَامِلُ: «أعطِنِي النَّوعِیَّةَ المُمتَازَةَ» رَدَّ عَلَیه الصَّیدَلِيُّ مُستَهزِءاً: «إِنَّهَا غَالِیةٌ. أَقُولُ لَکَ ذَلِکَ مُقَدَّماً. ثُمَّ ذَهَبَ ضاحِکاً. رَفَعَ العَامِلُ یَدَیهِ أَمامَ الصَّیدَلِيّ وَ قَالَ لَهُ: «إِنّي عَامِلٌ أشتَغِلُ في الاسمنت وَ قَد عَلَّقَ الاسمنت في یَدَيَّ وَ لا أستَطیعُ أن أَلمسَ وَجهَ ابنَتِيَ الصَّغِیرَةِ لِکَي أداعِبَهَا. إِذَا کَانَتِ النَّوعِیَّةُ المُمتَازَةُ الَّتِي لَدَیکَ تُزِیلُ هذا الاسمنت، فَأعطِنِي إِیَّاهَا و سَأَتَدَبَّرُ ثَمَنَها.

                    تَجَمَّدَتِ الضَّحکاتُ السَّاخِرَةُ لِلصَّیدَلِيّ عَلَی شَفَتَیهِ وَ رَأَی نَفسَهُ حَقیراً صَغیراً کَمَا لَم یَرَهَا مِن قَبلُ.»
                    <!--                    <vue-katex :input="currentQuestion.statement" />-->
                  </div>
<!--                  v-if="!currentQuestion.in_active_category"-->
                  <q-feild
                    color="warning"
                    rounded
                    dark
                    height="400"
                    elevation="1"
                    class="d-flex align-center justify-center"
                  >
                    در حال حاضر امکان مشاهده سوالات این دفترچه امکان پذیر نمی باشد
                  </q-feild>
                </div>
              </div>

<!--&lt;!&ndash;              v-if="currentQuestion.in_active_category"&ndash;&gt;-->
              <div
                class="row question-answers"
              >
                <!--                  v-for="item in currentQuestion.choices.list"-->
                <!--                  :key="item.id"-->
                <!--                  :question-id="currentQuestion.id"-->
                <!--                  :choice="item"-->
                <!--                  :is-rtl="isRtl"-->
                <choice
                  v-for="key in linksList"
                  :key="key"
                />

<!--                  @answerClicked="answerClicked"-->

              </div>
            </div>
            <div class="col btnpre col-md-1 justify-center d-none"
            >
<!--              v-if="getQuestionNumberFromId(currentQuestion.id) !== getCurrentExamQuestionsInArray().length"-->
              <q-btn
                flat
                class="q-px-none q-ml-md"
                :style="{ 'width':'60px','height': '400px' }"
                no-shadow
                @click="goToNextQuestion('onlineQuiz.alaaView')"
              >
                <q-icon
                  size="40px"
                  name="mdi-chevron-left"
                />
              </q-btn>
            </div>
          </div>
        </q-page>
      </div>
    </div>
    <q-footer
      class="justify-center q-pl-none"
      color="transparent"
      elevation="0"
      padless
      inset
      app
    >
      <q-page-sticky
        fluid
        class="q-py-none"
      >
        "
        <div class="row timer-row justify-center">
          <div
            :md="10"
            class="col d-flex justify-center timer-container py-0"
          >
<!--            <Timer/>-->
          </div>
        </div>
      </q-page-sticky>
    </q-footer>
  </q-page>
</template>

<script>
import Choice from 'src/components/OnlineQuiz/Quiz/Choice'
// import Timer from 'src/components/OnlineQuiz/Quiz/Timer/Timer'
import { mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinDrawer, mixinWindowSize } from 'src/mixin/Mixins'
// import Assistant from 'src/plugins/assistant'
// import VueKatex from 'src/components/VueKatex'

export default {
  name: 'AlaaView',
  components: {
    Choice
    // ,
    // VueKatex,
    // Timer
  },
  mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinDrawer, mixinWindowSize],
  data () {
    return {
      linksList: [
        {
          title: 'Profile',
          caption: ''
        },
        {
          title: 'hasan',
          caption: ''
        },
        {
          title: 'Profile',
          caption: ''
        },
        {
          title: 'hasan',
          caption: ''
        }
      ],
      isRtl: false
    }
  },
  mounted () {
    // const that = this
    // that.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: '' })
    // this.showAppBar()
    // this.updateDrawerBasedOnWindowSize()
    // console.log('this.$route.params.quizId', this.$route.params.quizId)
    // this.startExam(this.$route.params.quizId, 'onlineQuiz.alaaView')
    //   .then(() => {
    //     that.isRtl = !that.isLtrString(that.currentQuestion.statement)
    //     that.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: '' })
    //   })
    //   .catch((error) => {
    //     Assistant.reportErrors(error)
    //     this.$q.notify({
    //       type: 'negative',
    //       message: 'مشکلی در دریافت اطلاعات آزمون رخ داده است. لطفا دوباره امتحان کنید.',
    //       position: 'top'
    //     })
    //     that.$router.push({ name: 'user.exam.list' })
    //   })
  },
  // unmounted () {
  //   this.changeAppBarAndDrawer(false)
  // },
  methods: {
    changeAppBarAndDrawer (state) {
      this.$store.commit('AppLayout/updateAppBarAndDrawer', state)
    },
    showAppBar () {
      this.$store.commit('AppLayout/updateAppBar', true)
    },
    updateDrawerBasedOnWindowSize () {
      if (this.windowSize.x > 1263) {
        this.$store.commit('AppLayout/updateDrawer', true)
      }
    }
  }
}
</script>

<style>
.quiz-page strong em strong {
  font-weight: normal;
  font-style: normal;
  text-decoration: none !important;
}

.ltr .renderedPanel {
  direction: ltr !important;
}

.v-navigation-drawer.mapOfQuestions .v-navigation-drawer__content {
  overflow-y: scroll;
}

/*.quiz-page .katex-display {*/
/*    display: inline-block;*/
/*    direction: ltr;*/
/*}*/

.base.textstyle.uncramped {
  display: flex;
  flex-wrap: wrap;
}

img {
  max-width: 100%;
}
</style>

<style scoped>
.question-buttons button {
  margin-left: 20px;
  height: 24px;
  width: 24px;
  size: 12px;
}

.question-number p {
  margin-bottom: 0;
  line-height: 40px;
  font-size: 16px;
}

.question-header {
  display: flex;
  color: var(--text-2);
  flex-direction: row;
  justify-content: space-between;
  position: sticky;
  top: 60px;
  z-index: 1;
  margin: -12px -12px -12px -12px;
  background: #f1f1f1;
}

.question-body {
  margin-top: 50px;
  margin-left: -12px;
  margin-right: -12px;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  line-height: 35px;
  display: inline-block;
  direction: inherit;
  box-sizing: inherit;
  color: var(--text-2);
}

.question-answers {
  margin-top: 90px;
  margin-left: -12px;
  margin-right: -12px;
}

.answer-sheet {
  background: #f1f1f1;
  width: 90%;
  height: 100px;
  padding: 2% 3%;
  border-radius: 10px;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.answer-text {
  height: 100%;
  width: 100%;
  display: block !important;
}

.answer-checkbox {
  height: 100px;
  width: 100px;
}

.quiz-page {
  background: #f1f1f1;
  width: 100%;
  height: 100%;
  padding: 12px 12px 12px 12px;
}
.btnpre {
  padding: 12px 12px 12px 12px;
  flex-direction: column;

}

.user-name {
  margin-bottom: 0;
  align-self: center;
  margin-left: 10px;
  color: var(--text-2);
}

@media only screen and (max-width: 960px) {
  .question-body {
    margin-top: 20px;
  }
}

@media only screen and (max-width: 450px) {
  .question-buttons button {
    margin-right: 0;
  }
}

@media only screen and (max-width: 320px) {
  .question-header {
    justify-content: center;
  }
}
</style>
