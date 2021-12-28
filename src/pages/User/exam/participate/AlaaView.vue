<template>

  <div
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
            <div class="col btnpre col-md-1 justify-start sm-hide xs-hide"
            >
              <q-btn
                v-if= "getQuestionNumberFromId(currentQuestion.id) !== 1"
                flat
                class="q-px-none"
                :style="{ 'width':'64px','height': '400px' }"
                no-shadow
                @click="goToPrevQuestion('onlineQuiz.alaaView')"
              >
                <q-icon
                  size="40px"
                  name="mdi-chevron-right"
                />
              </q-btn>
            </div>
            <div class="col col-md-10 q-px-sm ">
              <div class="row flex question-header">
                <div class="question-number">
                  <p v-if="currentLesson">
                    {{ currentLesson.title }}
                    -
                    سوال شماره
                    {{ getQuestionNumberFromId(currentQuestion.id) }}
                  </p>
                </div>
                <div class="question-buttons ">
                  <q-btn
                    size="12px"
                    round
                    flat
                    @click="changeStatus(currentQuestion.id, 'o')"
                  >
                    <q-icon
                      v-if="!getUserQuestionData(quiz.id, currentQuestion.id) || getUserQuestionData(quiz.id, currentQuestion.id).status !== 'o'"
                      :style="{ 'width':'24px','height': '24px' }"
                      color="grey-7"
                      size="30px"
                      name="mdi-checkbox-blank-circle-outline"
                    />
                    <q-icon
                      v-if="getUserQuestionData(quiz.id, currentQuestion.id) && getUserQuestionData(quiz.id, currentQuestion.id).status === 'o'"
                      color="amber"
                      size="30px"
                      name="mdi-checkbox-blank-circle"
                    />
                  </q-btn>
                  <q-btn
                    size="12px"
                    round
                    flat
                    @click="changeStatus(currentQuestion.id, 'x')"
                  >
                    <q-icon
                      size="30px"
                      :color="getUserQuestionData(quiz.id, currentQuestion.id) && getUserQuestionData(quiz.id, currentQuestion.id).status === 'x' ? 'red' : 'grey-7'"
                      name="mdi-close"
                    />
                  </q-btn>
                  <q-btn
                    size="12px"
                    flat
                    round
                    @click="changeBookmark(currentQuestion.id)"
                  >
                    <q-icon
                      v-if="!getUserQuestionData(quiz.id, currentQuestion.id) || !getUserQuestionData(quiz.id, currentQuestion.id).bookmarked"
                      size="30px"
                      color="grey-7"
                      name="mdi-bookmark-outline"
                    />
                    <q-icon
                      v-if="getUserQuestionData(quiz.id, currentQuestion.id) && getUserQuestionData(quiz.id, currentQuestion.id).bookmarked"
                      flat
                      color="blue-6"
                      size="30px"
                      name="mdi-bookmark"
                     />
                  </q-btn>
                </div>
              </div>

              <div class="row question-body">
                <div class="col"
                     :class="{ ltr: isLtrString(currentQuestion.statement)}"
                >
                  <div
                    v-if="currentQuestion.in_active_category"
                    class="renderedPanel"
                  >
                    <vue-katex :input="currentQuestion.statement" />
                  </div>
                  <q-card-section
                    v-if="!currentQuestion.in_active_category"
                    color="red"
                    rounded
                    dark
                    height="400"
                    elevation="1"
                    class="d-flex align-center justify-center"
                  >
                    در حال حاضر امکان مشاهده سوالات این دفترچه امکان پذیر نمی باشد
                  </q-card-section>
                </div>
              </div>
              <div class="row question-answers"
                   v-if="currentQuestion.in_active_category"
              >
                <choice
                  v-for="item in currentQuestion.choices.list"
                  :key="item.id"
                  :question-id="currentQuestion.id"
                  :choice="item"
                  :is-rtl="isRtl"
                  @answerClicked="answerClicked"
                />
              </div>
            </div>
            <div class="col btnpre col-md-1 justify-start sm-hide xs-hide"
            >
              <q-btn
                v-if="getQuestionNumberFromId(currentQuestion.id) !== getCurrentExamQuestionsInArray().length"
                flat
                class="q-px-none"
                :style="{ 'width':'64px','height': '400px' }"
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
    <div class="footer flex row">
    <div class="d-flex col"
    >
      <Timer/>
    </div>
    </div>
  </div>
</template>

<script>
import Choice from 'src/components/OnlineQuiz/Quiz/Choice'
import Timer from 'src/components/OnlineQuiz/Quiz/timer/timer'
import { mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinDrawer, mixinWindowSize } from 'src/mixin/Mixins'
import Assistant from 'src/plugins/assistant'
import VueKatex from 'components/VueKatex'

export default {
  name: 'AlaaView',
  components: {
    Choice,
    VueKatex,
    Timer
  },
  mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinDrawer, mixinWindowSize],
  data () {
    return {
      isRtl: false
    }
  },
  mounted () {
    const that = this
    that.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: '' })
    this.showAppBar()
    this.updateDrawerBasedOnWindowSize()
    console.log('this.$route.params.quizId', this.$route.params.quizId)
    this.startExam(this.$route.params.quizId, 'onlineQuiz.alaaView')
      .then(() => {
        that.isRtl = !that.isLtrString(that.currentQuestion.statement)
        that.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: '' })
      })
      .catch((error) => {
        Assistant.reportErrors(error)
        this.$q.notify({
          type: 'negative',
          message: 'مشکلی در دریافت اطلاعات آزمون رخ داده است. لطفا دوباره امتحان کنید.',
          position: 'top'
        })
        that.$router.push({ name: 'user.exam.list' })
      })
  },
  unmounted () {
    this.changeAppBarAndDrawer(false)
  },
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
  padding-top: 20px;
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

.high-z-index {
  z-index: 3;
}
.footer {
  position: absolute;
  bottom: 0;
  max-width: 75%;
  width: 100%;
}

.quiz-page {
  background: #f1f1f1;
  width: 100%;
  height: 100%;
  padding: 12px 12px 12px 12px;
}
.btnpre {
  display: flex;
  padding : 12px 12px 12px 24px;
}

.user-name {
  margin-bottom: 0;
  align-self: center;
  margin-left: 10px;
  color: var(--text-2);
}

@media only screen and (max-width: 1024px) {
  .question-body {
    margin-top: 20px;
  }
}

@media only screen and (max-width: 600px) {
  .question-buttons button {
    margin-left: 0;
  }
}

@media only screen and (max-width: 320px) {
  .question-header {
    justify-content: center;
  }
}
</style>
