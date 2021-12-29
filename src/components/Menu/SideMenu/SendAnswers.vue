<template>
<div>
  <q-btn
    v-if="true"
    :color="'#4caf50'"
    :style="{ backgroundColor: '#4caf50 !important' }"
    dark
    block
    class="end-exam-btn"
    @click="getConfirmation"
  >
    ارسال پاسخنامه
  </q-btn>
  <bubble-sheet
    v-if="false"
    :info="{ type: 'pasokh-nameh' }"
    delay-time="0"
  />
  <br>
  <br>
  <br>
  <br>
</div>
</template>

<script>
import BubbleSheet from 'components/OnlineQuiz/Quiz/bubbleSheet/bubbleSheet'
import ExamData from 'assets/js/ExamData'
export default {
  name: 'SendAnswers',
  components: {
    BubbleSheet
  },
  data: () => ({

  }),
  methods: {
    getConfirmation () {
      console.log('getConfirmation')
      const that = this
      this.confirmationBtnLoading = true
      this.sendUserQuestionsDataToServer(this.quiz.id, this.quiz.user_exam_id, false)
        .then((res) => {
          console.log('res :', res)
          const examData = new ExamData()
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
        .catch(() => {
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
    }
  }
}
</script>

<style scoped>

</style>
