<template>
  <v-container
    v-resize="updateWindowSize"
    class="konkoor-view"
    :fluid="true"
    :style="{ height: '100%', background: 'rgb(244,244,244)' }"
  >
    <v-row :style="{ 'min-height': '100%' }">
      <v-col
        id="questions"
        ref="questionsColumn"
        :md="5"
        class="questions"
        :style="{ height: windowSize.y }"
      >
        <!--                <div class="lesson">{{ currentLesson.title }}</div>-->
        <DynamicScroller
          ref="scroller"
          :items="questions"
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
            >
              <Item
                :app-socket="socket"
                :source="item"
                :questions-column="$refs.questionsColumn"
                @inView="test"
              />
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </v-col>
      <v-col
        ref="leftSideList"
        :md="7"
        class="left-side-list"
      >
        <v-row>
          <v-col
            class="px-10 py-0 d-flex justify-space-between"
            dir="ltr"
          >
            <div class="rounded-b-xl rounded-r-xl">
              <v-menu
                bottom
                :offset-y="true"
                class="rounded-b-xl rounded-r-xl"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    large
                    tile
                    v-bind="attrs"
                    elevation="0"
                    class="pl-3"
                    v-on="on"
                  >
                    <v-icon
                      class="mr-2"
                      :size="30"
                      color="#666"
                    >
                      mdi-account-circle
                    </v-icon>
                    <span v-if="user.last_name">
                      {{ user.last_name }}
                    </span>
                    <span v-if="user.first_name">
                      {{ user.first_name }}
                    </span>
                  </v-btn>
                </template>
                <v-card
                  max-width="375"
                  class="mx-auto"
                  rounded="b-xl r-xl"
                >
                  <TopMenu_OnlineQuiz />
                </v-card>
              </v-menu>
            </div>
            <v-btn
              icon
              @click="changeView('alaa')"
            >
              <v-icon>mdi-table-split-cell</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <BubbleSheet
              :app-socket="socket"
              :info="{ type: 'pasokh-barg' }"
              :delay-time="0"
              @clickChoice="choiceClicked"
              @scrollTo="scrollTo"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="timer-row">
      <v-btn
        class="end-exam-btn"
        :loading="confirmationBtnLoading"
        :disabled="confirmationBtnLoading"
        @click="getConfirmation"
      >
        ارسال پاسخنامه
      </v-btn>
      <v-btn
        class="end-exam-btn end-exam-btn-with-send-photo"
        :loading="confirmationBtnLoading"
        :disabled="confirmationBtnLoading"
        @click="showSendAnswerPhotoDialog"
      >
        ارسال تصویر پاسخنامه
      </v-btn>
      <v-col :class="{ 'high-z-index': timerIsOpen }">
        <Timer
          :daftarche="'عمومی'"
          :quiz-started-at="1607963897"
          :daftarche-end-time="1607999897"
          :height="100"
          @timerOpen="timerOpen"
        />
      </v-col>
    </v-row>
    <booklets-dialog
      v-model="bookletsDialog"
      :quiz="quiz"
    />

    <v-dialog
      v-model="confirmationBubbleSheet"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="confirmationBubbleSheet = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>پاسخنامه کاربر</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items v-if="false">
            <v-btn
              dark
              text
              @click="confirmSendingAllAnswers"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card>
          <v-card-text>
            از ارسال پاسخ ها اطمینان دارید؟
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="ma-1"
              color="grey"
              plain
              @click="confirmationBubbleSheet = false"
            >
              ادامه میدم
            </v-btn>

            <v-btn
              class="ma-1"
              color="success"
              plain
              @click="confirmSendingAllAnswers"
            >
              ثبت میکنم
            </v-btn>
          </v-card-actions>
        </v-card>
        <BubbleSheet
          :info="{ type: 'pasokh-nameh' }"
          delay-time="0"
        />
      </v-card>
    </v-dialog>

    <send-answer-photo
        :exam="bubbleSheetDialogExam"
        :dialog-status="bubbleSheetDialog"
        @closeDialog="bubbleSheetDialog = false"
    />
  </v-container>
</template>

<script>
    import {Exam} from '@/models/Exam'
    import Assistant from '@/plugins/assistant'
    import {DynamicScroller, DynamicScrollerItem} from 'vue-virtual-scroller'
    import Item from '@/components/OnlineQuiz/Quiz/ViewTypes/components/question'
    import Timer from '@/components/OnlineQuiz/Quiz/Timer/Timer'
    import BubbleSheet from '@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet'
    import {TopMenu_OnlineQuiz} from '@/components/Menu/Menus'
    import BookletsDialog from '@/components/OnlineQuiz/Quiz/BookletsDialog'
    import {mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinWindowSize} from '@/mixin/Mixins'
    import SendAnswerPhoto from "@/pages/user/exam/SendAnswerPhoto";

    import '@/assets/scss/markdownKatex.scss'
    import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
    import ExamData from "@/assets/js/ExamData";

    export default {
        name: 'KonkoorView',
        components: {
            Timer,
            TopMenu_OnlineQuiz,
            BubbleSheet,
            DynamicScroller,
            DynamicScrollerItem,
          SendAnswerPhoto,
            BookletsDialog,
            Item
        },
        mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinWindowSize],
        data() {
            return {

              bubbleSheetDialogExam: new Exam(),
              bubbleSheetDialog: false,

                quizData: new Exam(),
                item: Item,
                lastTimeScrollRange: {start: 0, end: 29},
                scrollState: 'not scrolling',
                timePassedSinceLastScroll: 0,
                setIntervalCallback: null,
                renderedQuestions: {startIndex: 0, endIndex: 0},
                questions: [],
                inView: [],
                confirmationBubbleSheet: false,
                confirmationBtnLoading: false,
                timerIsOpen: false
            }
        },
        watch: {
            'windowSize.y': function () {
                this.setHeights()
            },
            'windowSize.x': function () {
                this.$store.commit('AppLayout/updateDrawer', false)
            }
        },
        created() {
            if (this.windowSize.x > 959) {
                this.changeAppBarAndDrawer(false)
            } else {
                this.$router.push({
                    name: 'onlineQuiz.alaaView',
                    params: {quizId: this.$route.params.quizId, questNumber: 1}
                })
            }
            // if (!this.questions.length) {
            //     this.questions = this.getCurrentExamQuestionsInArray()
            // }
        },
        mounted() {
          let that = this
          this.startExam(this.$route.params.quizId, 'onlineQuiz.KonkoorView')
              .then(() => {
                // that.loadFirstActiveQuestionIfNeed()
                that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
                that.questions = that.getCurrentExamQuestionsInArray()
                const callbacks = {
                  'question.file-link:update': {
                    afterReload () {
                      that.questions = that.getCurrentExamQuestionsInArray()
                    }
                  }
                }
                that.setSocket(that.$store.getters['Auth/accessToken'], that.quiz.id, callbacks)
              })
              .catch((error) => {
                Assistant.reportErrors(error)
                that.$notify({
                  group: 'notifs',
                  title: 'توجه!',
                  text: 'مشکلی در دریافت اطلاعات آزمون رخ داده است. لطفا دوباره امتحان کنید.',
                  type: 'error'
                })
                // ToDo: uncomment
                // that.$router.push({ name: 'user.exam.list'})
              })
            this.setHeights()
            if (this.currentQuestion.id === null) {
                this.loadFirstQuestion()
            }
            this.scrollTo(this.currentQuestion.id)
            this.changeAppBarAndDrawer(false)
        },
        destroyed() {
            this.changeAppBarAndDrawer(true)
        },
        methods: {

          showSendAnswerPhotoDialog () {
            this.bubbleSheetDialog = true
            this.bubbleSheetDialogExam = this.quiz
          },

            loadFirstActiveQuestionIfNeed() {
                let activeCcategory = this.quiz.getFirstActiveCategory()
                if (!activeCcategory) {
                    this.loadFirstQuestion()
                } else {
                    if (
                        Assistant.getId(this.currentQuestion.sub_category.category_id) !== Assistant.getId(activeCcategory.id) &&
                        activeCcategory.sub_categories.list.length > 0
                    ) {
                        let questionsOfSubcategory = this.getQuestionsOfSubcategory(activeCcategory.sub_categories.list[0].id)
                        if (questionsOfSubcategory.length > 0) {
                            this.currentQuestion = questionsOfSubcategory[0]
                        }
                    }
                }

                this.scrollTo(this.currentQuestion.id)

                // if (!this.currentQuestion.in_active_category) {//category_id
                //     let firstActiveQuestion = this.quiz.questions.getFirstActiveQuestion()
                //     if (!firstActiveQuestion) {
                //         this.loadFirstQuestion()
                //     } else {
                //         this.changeQuestion(firstActiveQuestion.id)
                //     }
                //     this.scrollTo(this.currentQuestion.id)
                // }
            },
            timerOpen(value) {
                this.timerIsOpen = value
            },
            confirmSendingAllAnswers () {
              this.syncUserAnswersWithDBAndSendAnswersToServerInExamTime(this.quiz.id, this.quiz.user_exam_id, false)
                  .then( () => {
                    this.$router.push({name: 'user.exam.list'})
                    this.confirmationBubbleSheet = true
                  })
                  .catch( erroe => {
                    console.log('erroe : ', erroe)
                  })
            },
            getConfirmation() {
              let that = this
              this.confirmationBtnLoading = true
              this.syncUserAnswersWithDBAndSendAnswersToServerInExamTime(this.quiz.id, this.quiz.user_exam_id, false)
                  .then( () => {
                    let examData = new ExamData()
                    examData.getUserExamData(this.quiz.user_exam_id)
                        .run()
                        .then(() => {
                          that.$store.commit('mergeDbAnswersIntoLocalstorage', {
                            dbAnswers: examData.userExamData,
                            exam_id: examData.exam.id
                          })
                          that.confirmationBubbleSheet = true
                          that.confirmationBtnLoading = false
                        })
                        .catch(() => {
                          that.confirmationBubbleSheet = true
                          that.confirmationBtnLoading = false
                        })
                  })
                  .catch( () => {
                    that.confirmationBubbleSheet = true
                    that.confirmationBtnLoading = false
                  })
                //
                // this.$store.commit('AppLayout/showConfirmDialog', {
                //     message: 'از ارسال پاسخ ها اطمینان دارید؟',
                //     button: {
                //         no: 'ادامه میدم',
                //         yes: 'ثبت میکنم'
                //     },
                //     callback: (confirm) => {
                //         if (!confirm) {
                //             return
                //         }
                //         that.sendAnswersAndFinishExam()
                //     }
                // })
            },
            sendAnswersAndFinishExam() {
                let that = this
                this.quiz.sendAnswersAndFinishExam()
                    .then(() => {
                        that.$store.commit('clearExamData', that.quiz.id)
                        that.$notify({
                            group: 'notifs',
                            text: 'اطلاعات آزمون شما ثبت شد.',
                            type: 'success'
                        })
                        that.$router.push({name: 'user.exam.list'})
                    })
                    .catch(() => {
                        that.$notify({
                            group: 'notifs',
                            title: 'توجه!',
                            text: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
                            type: 'warn',
                            duration: 30000,
                        })
                        that.$router.push({name: 'user.exam.list'})
                    })
            },
            test(payload) {
                if (payload.isInView) {
                    for (let i = 0; i < this.inView.length; i++) {
                        if (this.inView[i] === payload.number) {
                            return
                        }
                    }
                    this.inView.push(payload.number)
                } else {
                    for (let i = 0; i < this.inView.length; i++) {
                        if (this.inView[i] === payload.number) {
                            this.inView.splice(i, 1)
                        }
                    }
                }
            },
            changeAppBarAndDrawer(state) {
                this.$store.commit('AppLayout/updateAppBarAndDrawer', state)
            },
            changeCurrentQuestionIfScrollingIsDone() {
                // console.Log('time since last: ', this.timePassedSinceLastScroll)
                // if (startIndex !== this.lastTimeScrollRange.start || endIndex !== this.lastTimeScrollRange.end) {
                //     this.lastTimeScrollRange.start = startIndex
                //     this.lastTimeScrollRange.end = endIndex
                // }
                if (this.timePassedSinceLastScroll >= 1000) {
                    this.changeCurrentQuestionToFirstQuestionInView()
                    this.timePassedSinceLastScroll = 0
                    this.scrollState = 'not scrolling'
                    clearInterval(this.setIntervalCallback)
                    this.setIntervalCallback = null
                }
                this.timePassedSinceLastScroll += 250
            },
            updateLtr() {
              setTimeout(() => {
                document.querySelectorAll('.katex:not([dir="ltr"])').forEach(item => {
                  item.setAttribute('dir', 'ltr')
                })
              }, 1000)
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
            changeCurrentQuestionToFirstQuestionInView() {
                const firstInViewQuestion = this.getFirstInViewQuestionNumber()
                if (firstInViewQuestion.id === this.currentQuestion.id) {
                    return
                }
                this.changeQuestion(firstInViewQuestion.id, 'onlineQuiz.konkoorView')
            },
            // scrollTo (questionId) {
            //     if (this.quiz.questions.getQuestionById(questionId).isInView === false) {
            //         const questionIndex = this.quiz.questions.getQuestionIndexById(questionId)
            //         this.$refs.scroller.scrollToIndex(questionIndex)
            //         for (let i = 1; i < 4; i++) {
            //             setTimeout(() => {
            //                 this.$refs.scroller.scrollToIndex(questionIndex)
            //             },
            //             500 / Math.ceil(this.quiz.questions.list.length / 100) * i)
            //         }
            //     }
            // },
            scrollTo(questionId) {
                const questionIndex = this.getQuestionIndexById(questionId)
                this.$refs.scroller.scrollToItem(questionIndex)
                for (let i = 1; i < 4; i++) {
                    setTimeout(() => {
                            this.$refs.scroller.scrollToItem(questionIndex)
                        },
                        333 * i)
                }
            },
            // onIntersect (entries) {
            //     this.quiz.questions.getQuestionById(entries[0].target.id).isInView = (entries[0].intersectionRatio >= 0.5)
            // },
            // ToDo: check for removal
            getFirstInViewQuestionNumber() {
                // console.Log(this.renderedQuestions.startIndex, this.renderedQuestions.endIndex, 'haha2')
                let firstQuestionInView
                for (let i = this.renderedQuestions.startIndex; i <= this.renderedQuestions.endIndex; i++) {
                    // console.Log(i, ': ', this.questions[i].isInView)
                    if (this.questions[i] && this.questions[i].isInView === true) {
                        firstQuestionInView = this.questions[i]
                        break
                    }
                }
                if (firstQuestionInView && firstQuestionInView.id !== null) {
                    return firstQuestionInView
                } else {
                    return false
                }
            },
            // isThisFirstQuestionInView (questionId) {
            //     if (this.getFirstInViewQuestionNumber().id === questionId) {
            //         return true
            //     }
            //     return false
            // },
            // getQuestionNumber (question) {
            //     if (question.isInView === false) {
            //         return '.question:nth-child('+(this.quiz.questions.getQuestionIndexById(question.id) + 2)+')'
            //     }
            //     return ''
            // },
            choiceClicked(questionId) {
                this.scrollTo(questionId)
                this.changeQuestion(questionId)
            },
            // changeCurrentQuestion (question) {
            //     if (question.id !== this.currentQuestion.id) {
            //         this.currentQuestion = question
            //     }
            // }
            setHeights() {
                this.$refs.questionsColumn.style.height = this.windowSize.y + 'px'
                if (this.$refs.scroller.$el) {
                    this.$refs.scroller.$el.style.height = this.windowSize.y + 'px'
                }
                this.$refs.leftSideList.style.height = (this.windowSize.y - 24) + 'px'
            }
        }
    }
</script>

<style scoped>
    .high-z-index {
        z-index: 3;
    }

    .end-exam-btn {
        position: absolute;
        bottom: 0;
        background: rgb(76, 175, 80) !important;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        height: 103px !important;
        box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
        width: 200px;
        border-radius: 20px 20px 0 0;
        right: 0;
    }

    .end-exam-btn.end-exam-btn-with-send-photo{
      right: 220px;
    }

    .lesson {
        height: 50px;
        border-bottom: 1px solid #ececec;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .questionss {
        overflow: hidden;
    }

    .scroller {
        height: 100%;
    }

    .timer-row {
        width: calc(58% - 150px);
        position: absolute;
        bottom: 12px;
        left: 100px;
    }

    .buttons-group {
        float: left;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .left-side-list {
        overflow-y: auto;
    }

    .question-body {
        margin-bottom: 20px;
        line-height: 40px;
    }

    .questions {
        background: #fff;
        overflow-y: hidden;
        overflow-x: hidden;
        position: relative;
        /*padding-right: 25px;*/
        padding: 0;
    }

    .question {
        padding: 10px 30px 10px 10px;
    }

    .choices {
        display: flex;
        flex-direction: row;
    }

    .choice {
        cursor: pointer;
        transition: all ease-in-out 0.3s;
        display: flex;
        align-items: flex-start;
    }

    .choice.active::before {
        content: "\F012C";
        display: inline-block;
        font: normal normal normal 24px/1 "Material Design Icons";
        text-rendering: auto;
        line-height: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin-left: 10px;
        color: var(--success-1);
        font-size: 20px;
    }

    .choice:hover {
        background: #e1e1e1;
    }

    .konkoor-view {
        padding: 0;
        margin-top: 12px;
    }

    .test {
        margin: 20px;
        border-bottom: 1px solid;
    }
</style>

<style>
    /*.choices {*/
    /*    display: block !important;*/
    /*}*/

    .konkoor-view .reading-duplicate {
      display: none;
    }

    .base.textstyle.uncramped {
        display: flex;
        flex-wrap: wrap;
    }

    .konkoor-view strong em strong {
        display: none;
        font-weight: normal;
        font-style: normal;
        text-decoration: none !important;
    }

    .timer-row .col {
        padding: 0;
    }

    .v-application p {
        margin-bottom: 4px;
    }

    html {
        overflow-y: auto;
    }

    .choice p {
        display: inline-block;
        margin-right: 5px;
    }

    .question-body p:first-child {
        display: inline;
    }

    .katex-display {
        margin: 0;
    }
</style>
