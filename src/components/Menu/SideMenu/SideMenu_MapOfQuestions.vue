<template>
  <v-sheet class="map-of-questions">
    <div :style="{ 'padding-bottom': '120px' }">
      <div
        v-for="(categoryItem) in quiz.categories.list"
        :key="'category-'+categoryItem.id"
      >
        <div v-if="categoryItem.is_active">
          <v-btn
            :elevation="0"
            block
            class="categoryItem"
          >
            {{ categoryItem.title }}
          </v-btn>
          <v-expansion-panels
            accordion
            flat
            hover
            dense
          >
            <v-expansion-panel
              v-for="(subcategoryItem) in categoryItem.sub_categories.list"
              :key="'subcategory-'+subcategoryItem.id"
            >
              <v-expansion-panel-header>
                {{ subcategoryItem.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div
                  v-for="(question) in getQuestionsOfSubcategory(subcategoryItem.id)"
                  :key="'question-'+question.id"
                >
                  <v-btn
                    :class="{ active: currentQuestion.id === question.id }"
                    :elevation="0"
                    block
                    @click="changeQuestion(question.id)"
                  >
                    تست شماره
                    {{ getQuestionNumberFromIndex(question.index) }}
                    <v-icon
                      v-if="getUserQuestionData(question.id) && getUserQuestionData(question.id).status === 'x'"
                      color="red"
                    >
                      mdi-close
                    </v-icon>
                    <v-icon
                      v-if="getUserQuestionData(question.id) && getUserQuestionData(question.id).status === 'o'"
                      color="yellow"
                      size="15"
                    >
                      mdi-checkbox-blank-circle
                    </v-icon>
                    <v-icon
                      v-if="getUserQuestionData(question.id) && getUserQuestionData(question.id).answered_choice_id"
                      color="--success-1"
                    >
                      mdi-check
                    </v-icon>
                  </v-btn>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </div>
    <div class="end-exam">
      <v-btn
        v-if="true"
        :color="'#4caf50'"
        :style="{ backgroundColor: '#4caf50 !important' }"
        dark
        block
        class="end-exam-btn"
        :loading="confirmationBtnLoading"
        :disabled="confirmationBtnLoading"
        @click="getConfirmation"
      >
        ارسال پاسخنامه
      </v-btn>
      <v-btn
        v-if="true"
        :color="'#4caf50'"
        :style="{ backgroundColor: '#4caf50 !important' }"
        dark
        block
        class="end-exam-btn mt-5"
        @click="showSendAnswerPhotoDialog"
      >
        آپلود برگه پاسخنامه
      </v-btn>
      <br>
      <br>
      <br>
    </div>

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
          class="confirmationBubbleSheet"
        />
      </v-card>
    </v-dialog>


    <send-answer-photo
        :exam="bubbleSheetDialogExam"
        :dialog-status="bubbleSheetDialog"
        @closeDialog="bubbleSheetDialog = false"
    />

  </v-sheet>
</template>

<script>
    import mixinQuiz from '@/mixin/Quiz'
    import Time from "@/plugins/time";
    import VueConfirmDialog from 'vue-confirm-dialog'
    import BubbleSheet from '@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet'
    import ExamData from "@/assets/js/ExamData";
    import {Exam} from "@/models/Exam";
    import SendAnswerPhoto from "@/pages/user/exam/SendAnswerPhoto";

    export default {
        name: 'SideMenuMapOfQuestions',
        components: {BubbleSheet, SendAnswerPhoto, VueConfirmDialog},
        mixins: [mixinQuiz],
        data: () => ({

          bubbleSheetDialogExam: new Exam(),
          bubbleSheetDialog: false,


            confirmationBubbleSheet: false,
            confirmationBtnLoading: false,
            currentCat: null,
        }),
        created() {
            let that = this
            this.interval = setInterval(() => {
                that.currentCat = Time.getCurrentCategoryAcceptAt(that.quiz.categories)
            }, 1000)
        },
        methods: {

          showSendAnswerPhotoDialog () {
            this.bubbleSheetDialog = true
            this.bubbleSheetDialogExam = this.quiz
          },

            getUserQuestionData (questionId) {
                if (!this.quiz.id || !questionId || !this.userQuizListData[this.quiz.id]) {
                    return false
                }
                return this.userQuizListData[this.quiz.id][questionId]
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
            getConfirmation(){
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
              // this.$store.commit('AppLayout/showConfirmDialog', {
              //   message: 'از ارسال پاسخ ها اطمینان دارید؟',
              //   button: {
              //     no: 'ادامه میدم',
              //     yes: 'ثبت میکنم'
              //   },
              //   callback: (confirm) => {
              //     if (!confirm) {
              //       return
              //     }
              //     that.sendAnswersAndFinishExam()
              //   }
              // })
            },
            sendAnswersAndFinishExam() {
                let that = this
                this.syncUserAnswersWithDBAndSendAnswersToServerInExamTime(this.quiz.id, this.quiz.user_exam_id)
                    .then( () => {
                        that.$notify({
                            group: 'notifs',
                            text: 'اطلاعات آزمون شما ثبت شد.',
                            type: 'success'
                        })
                        that.$store.commit('clearExamData', that.quiz.id)
                        that.$router.push({ name: 'user.exam.list'})
                    })
                    .catch( () => {
                        that.$notify({
                            group: 'notifs',
                            title: 'توجه!',
                            text: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
                            type: 'error',
                            duration: 30000,
                        })
                        that.$router.push({ name: 'user.exam.list'})
                    })
            }
        }
    }
</script>

<style>
.end-exam {
  position: absolute;
  width: 240px;
  bottom: -78px;
  z-index: 5;
  background: #fff;
  padding: 20px 0;
}

.end-exam-btn .v-btn__content {
    display: flex;
    justify-content: center !important;
}

.map-of-questions {
    min-height: 42px !important;
    width: 80%;
    height: calc(100% - 200px);
    margin: 0 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.map-of-questions .v-expansion-panel-header {
    transition: all ease-in-out 0.3s;
    min-height: 42px;
    padding: 11px 24px;

}

.map-of-questions .theme--light.v-expansion-panels .v-expansion-panel-header--active .v-expansion-panel-header__icon .v-icon {
    color: var(--text-3);
}


.map-of-questions .v-expansion-panel-header--active {
    background: var(--primary-1);
    border-radius: 40px;
    min-height: 42px !important;
    max-height: 42px !important;
    padding: 5px 24px;
    color: white;
}

.map-of-questions .v-expansion-panel-content__wrap {
    padding: 16px 24px;
}

.map-of-questions .v-btn__content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.map-of-questions .v-btn {
    background: var(--surface-1) !important;
}

.v-navigation-drawer .v-navigation-drawer__content .map-of-questions .theme--light.v-btn.active {
    color: var(--accent-1);
}

.question-container .question-answers .answer-box,
.map-of-questions .v-expansion-panel .v-expansion-panel-content .v-btn.v-size--default {
    font-size: 0.87rem;
}
.map-of-questions .categoryItem.v-btn {
    font-size: 1.2rem;
    margin-top: 50px;
}
.map-of-questions .v-expansion-panel .v-expansion-panel-header {
    font-size: 1.2rem;
}
</style>

<style scoped>
.confirmationBubbleSheet {
  margin-bottom: 0;
}
</style>
