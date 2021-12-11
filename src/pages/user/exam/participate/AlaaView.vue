    <template>
      <v-container
          :fluid="true"
          class="quiz-page"
          :style="{ height: '100%' }"
      >
        <v-row :style="{ 'min-height': '100%' }">
          <v-col
              :md="12"
              :class="{ 'question-container': true }"
              :style="{ 'min-height': '100%' }"
          >
            <v-sheet
                class="d-flex align-stretch"
                width="100%"
                color="--background-2"
                :style="{ 'min-height': '100%' }"
            >
              <v-row>
                <v-col
                    :md="1"
                    class="d-md-flex justify-center d-none"
                >
                  <v-btn
                      v-if="getQuestionNumberFromId(currentQuestion.id) !== 1"
                      :min-width="64"
                      class="px-0"
                      :height="400"
                      :elevation="0"
                      @click="goToPrevQuestion('onlineQuiz.alaaView')"
                  >
                    <v-icon :size="40">
                      mdi-chevron-right
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col
                    :md="10"
                    class="px-md-0 px-5"
                >
                  <v-row class="question-header">
                    <div class="question-number">
                      <p v-if="currentLesson">
                        {{ currentLesson.title }}
                        -
                        سوال شماره
                        {{ getQuestionNumberFromId(currentQuestion.id) }}
                      </p>
                    </div>
                    <div class="question-buttons">
                      <v-btn
                          icon
                          @click="changeStatus(currentQuestion.id, 'o')"
                      >
                        <v-icon
                            v-if="!getUserQuestionData(quiz.id, currentQuestion.id) || getUserQuestionData(quiz.id, currentQuestion.id).status !== 'o'"
                            color="#888"
                            size="30"
                        >
                          mdi-checkbox-blank-circle-outline
                        </v-icon>
                        <v-icon
                            v-if="getUserQuestionData(quiz.id, currentQuestion.id) && getUserQuestionData(quiz.id, currentQuestion.id).status === 'o'"
                            color="--primary-2"
                            :size="30"
                        >
                          mdi-checkbox-blank-circle
                        </v-icon>
                      </v-btn>
                      <v-btn
                          icon
                          @click="changeStatus(currentQuestion.id, 'x')"
                      >
                        <v-icon
                            :color="getUserQuestionData(quiz.id, currentQuestion.id) && getUserQuestionData(quiz.id, currentQuestion.id).status === 'x' ? 'red' : '#888'"
                            :size="30"
                        >
                          mdi-close
                        </v-icon>
                      </v-btn>
                      <v-btn
                          icon
                          @click="changeBookmark(currentQuestion.id)"
                      >
                        <v-icon
                            v-if="!getUserQuestionData(quiz.id, currentQuestion.id) || !getUserQuestionData(quiz.id, currentQuestion.id).bookmarked"
                            :size="30"
                            color="#888"
                        >
                          mdi-bookmark-outline
                        </v-icon>
                        <v-icon
                            v-if="getUserQuestionData(quiz.id, currentQuestion.id) && getUserQuestionData(quiz.id, currentQuestion.id).bookmarked"
                            color="--accent-1"
                            :size="30"
                        >
                          mdi-bookmark
                        </v-icon>
                      </v-btn>
                    </div>
                  </v-row>
                  <v-row class="question-body">
                    <v-col :class="{ ltr: isLtrString(currentQuestion.statement) }">
                      <div
                          v-if="currentQuestion.in_active_category"
                          class="renderedPanel"
                      >
                        <vue-katex :input="currentQuestion.statement"/>
                      </div>
                      <v-sheet
                          v-if="!currentQuestion.in_active_category"
                          color="warning"
                          rounded
                          dark
                          height="400"
                          elevation="1"
                          class="d-flex align-center justify-center"
                      >
                        در حال حاضر امکان مشاهده سوالات این دفترچه امکان پذیر نمی باشد
                      </v-sheet>
                    </v-col>
                  </v-row>
                  <v-row
                      v-if="currentQuestion.in_active_category"
                      class="question-answers"
                  >
                    <choice
                        v-for="item in currentQuestion.choices.list"
                        :key="item.id"
                        :question-id="currentQuestion.id"
                        :choice="item"
                        :is-rtl="isRtl"
                        @answerClicked="answerClicked"
                    />
                  </v-row>
                </v-col>
                <v-col
                    :md="1"
                    class="d-md-flex justify-center d-none"
                >
                  <v-btn
                      v-if="getQuestionNumberFromId(currentQuestion.id) !== getCurrentExamQuestionsInArray().length"
                      :min-width="64"
                      class="px-0"
                      :height="400"
                      :elevation="0"
                      @click="goToNextQuestion('onlineQuiz.alaaView')"
                  >
                    <v-icon :size="40">
                      mdi-chevron-left
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
        <v-footer
            class="justify-center pl-0"
            color="transparent"
            elevation="0"
            padless
            inset
            app
        >
          <v-container
              fluid
              class="py-0"
          >
            <v-row class="timer-row justify-center">
              <v-col
                  :md="10"
                  class="d-flex justify-center timer-container py-0"
              >
                <Timer/>
              </v-col>
            </v-row>
          </v-container>
        </v-footer>
      </v-container>
    </template>

    <script>
    import Choice from '@/components/OnlineQuiz/Quiz/Choice'
    import Timer from '@/components/OnlineQuiz/Quiz/Timer/Timer'
    import {mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinDrawer, mixinWindowSize} from '@/mixin/Mixins'
    import Assistant from "@/plugins/assistant";
    import VueKatex from "@/components/VueKatex";

    export default {
      name: 'AlaaView',
      components: {
        Choice,
        VueKatex,
        Timer
      },
      mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinDrawer, mixinWindowSize],
      data() {
        return {
          isRtl: false
        }
      },
      sockets: {
        // connecting() {
        //   this.onSocketStatusChange('on connection')
        // },
        // disconnect() {
        //   this.onSocketStatusChange('Socket to break off')
        //   // this.isConnected = false;
        // },
        // connect_failed() {
        //   this.onSocketStatusChange('connection failed')
        // },
        // connect() {
        //   this.onSocketStatusChange('socket connected')
        //   // Fired when the socket connects.
        //   // this.isConnected = true
        // },


        // Fired when the server sends something on the "messageChannel" channel.
        messageChannel() {
          // console.log('messageChannel: ', data)
        },
        'question.file-link:update': function (data) {
          console.log('question.file-link:update: ', data)
        },
        questionFileLinkUpdate(data) {
          console.log('questionFileLinkUpdate: ', data)
          // let that = this
          // this.reloadQuestionFile ('questionsFileUrl', 'onlineQuiz.alaaView', this.$route.params.quizId)
          //     .then(() => {
          //       that.isRtl = !that.isLtrString(that.currentQuestion.statement)
          //       that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
          //     })
          //     .catch( (error) => {
          //       Assistant.reportErrors(error)
          //       that.$notify({
          //         group: 'notifs',
          //         title: 'توجه!',
          //         text: 'مشکلی در دریافت اطلاعات آژمون رخ داده است. لطفا دوباره امتحان کنید.',
          //         type: 'error'
          //       })
          //       that.$router.push({ name: 'user.exam.list'})
          //     })
        }
      },
      mounted() {
        let that = this
        this.showAppBar()
        this.updateDrawerBasedOnWindowSize()
        this.startExam(this.$route.params.quizId, 'onlineQuiz.alaaView')
            .then(() => {
              that.isRtl = !that.isLtrString(that.currentQuestion.statement)
              that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
            })
            .catch((error) => {
              Assistant.reportErrors(error)
              that.$notify({
                group: 'notifs',
                title: 'توجه!',
                text: 'مشکلی در دریافت اطلاعات آژمون رخ داده است. لطفا دوباره امتحان کنید.',
                type: 'error'
              })
              that.$router.push({name: 'user.exam.list'})
            })
      },
      destroyed() {
        this.changeAppBarAndDrawer(false)
      },
      methods: {
        changeAppBarAndDrawer(state) {
          this.$store.commit('AppLayout/updateAppBarAndDrawer', state)
        },
        showAppBar() {
          this.$store.commit('AppLayout/updateAppBar', true)
        },
        updateDrawerBasedOnWindowSize() {
          if (this.windowSize.x > 1263) {
            this.$store.commit('AppLayout/updateDrawer', true)
          }
        }
      },
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

    .quiz-page .katex-display {
      display: inline-block;
      direction: ltr;
    }

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
      margin-right: 20px;
    }

    .question-number p {
      margin-bottom: 0;
      line-height: 40px;
    }

    .question-header {
      display: flex;
      color: var(--text-2);
      flex-direction: row;
      justify-content: space-between;
      position: sticky;
      top: 60px;
      z-index: 1;
      padding-top: 20px;
      background: var(--background-2);
    }

    .question-body {
      margin-top: 50px;
      line-height: 35px;
      color: var(--text-2);
    }

    .question-answers {
      margin-top: 90px;
    }

    .answer-sheet {
      background: var(--surface-1);
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
      background: var(--background-2);
      height: 100%;
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
