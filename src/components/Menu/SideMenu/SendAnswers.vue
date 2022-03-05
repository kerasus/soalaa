<template>
  <div
    :style="{'width':'240px'}"
    class="send-answer-box"
  >
    <q-btn
      v-if="quiz.id"
      :color="'#4caf50'"
      :style="{ backgroundColor: '#4caf50 !important' }"
      class=" end-exam-btn full-width"
      @click="getConfirmation"
    >
      ارسال پاسخنامه
    </q-btn>
    <q-btn
      v-if="quiz.id"
      :color="'#4caf50'"
      :style="{ backgroundColor: '#4caf50 !important'}"
      class=" end-exam-btn full-width"
      @click="showSendAnswerPhotoDialog"
    >
      آپلود برگه پاسخنامه
    </q-btn>
    <q-dialog
      v-model="confirmationBubbleSheet"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="">
        <q-bar class="bg-blue text-white q-pa-lg">
          <div>
            پاسخنامه کاربر
          </div>
          <q-space></q-space>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-blue">بستن</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-card flat>
            <q-card-section>
              از ارسال پاسخ ها اطمینان دارید؟
            </q-card-section>
            <q-card-section>
              <q-btn
                flat style="color: #585858"
                @click="confirmationBubbleSheet = false"
              >
                ادامه میدم
              </q-btn>
              <q-btn
                flat
                color="secondary"
                @click="confirmSendingAllAnswers"
              >
                ثبت میکنم
              </q-btn>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section>
          <bubble-sheet
            :info="{ type: 'pasokh-nameh' }"
            delay-time="0"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import BubbleSheet from 'components/OnlineQuiz/Quiz/bubbleSheet/bubbleSheet'
import ExamData from 'assets/js/ExamData'
import mixinQuiz from 'src/mixin/Quiz'
import { Exam } from 'src/models/Exam'

export default {
  name: 'SendAnswers',
  mixins: [mixinQuiz],
  js: [ExamData],
  components: {
    BubbleSheet
  },
  data: () => ({
    confirmationBubbleSheet: false,
    confirmationBtnLoading: false,
    bubbleSheetDialogExam: new Exam(),
    bubbleSheetDialog: false
  }),
  methods: {
    async getConfirmation () {
      try {
        this.confirmationBubbleSheet = true
        this.confirmationBtnLoading = true
        await this.sendAnswer()
        await this.getBackEndRes()
      } catch (err) {
        this.confirmationBtnLoading = false
      }
    },
    sendAnswer () {
      return this.sendUserQuestionsDataToServer(this.quiz.id, this.quiz.user_exam_id, false)
    },
    async getBackEndRes () {
      try {
        const that = this
        const examData = new ExamData()
        console.log('this.quiz :', this.quiz)
        await examData.getExamDataAndParticipate(this.quiz.id)
        await examData.getUserExamData(this.quiz.user_exam_id).run()
        if (examData.exam) {
          that.$store.commit('quiz/mergeDbAnswersIntoLocalstorage', {
            dbAnswers: examData.userExamData,
            exam_id: examData.exam.id
          })
        }
        this.confirmationBtnLoading = false
      } catch (err) {
        this.confirmationBtnLoading = false
      }
    },
    confirmSendingAllAnswers () {
      this.sendUserQuestionsDataToServer(this.quiz.id, this.quiz.user_exam_id, false)
        .then(response => {
          this.confirmationBubbleSheet = true
        })
        .catch(erroe => {
          console.log('erroe : ', erroe)
        })
    },
    showSendAnswerPhotoDialog () {
      this.bubbleSheetDialog = true
      this.bubbleSheetDialogExam = this.quiz
    }
  }
}
</script>

<style lang="scss" scoped>
.send-answer-box {
  .end-exam-btn {
    &:first-child {
      margin: 20px 0;
    }
  }
}
</style>
