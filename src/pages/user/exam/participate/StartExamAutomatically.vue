<template>
  <v-row class="justify-center">
    <v-col
      md="8"
      class="text-center"
    >
      <v-progress-linear
        v-if="exam.loading"
        indeterminate
        color="yellow darken-2"
      />
      <v-banner
        v-if="exam.loading"
        elevation="7"
      >
        درحال دریافت اطلاعات آزمون
      </v-banner>

      <v-card
        v-if="!exam.loading"
        elevation="2"
      >
        <v-img
          v-if="exam.photo"
          :src="exam.photo"
        />
        <v-card-title v-text="exam.title" />
        <v-card-actions>
          <v-btn
            color="primary"
            @click="goToParticipateExamPage"
          >
            شروع آزمون
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mixinAuth} from "@/mixin/Mixins";
import {Exam} from "@/models/Exam";

export default {
  name: "StartExamAutomatically",
  mixins: [mixinAuth],
  data () {
    return {
      exam: new Exam()
    }
  },
  mounted() {
    this.exam.id = this.$route.params.examId
    this.getExamInfo()
  },
  methods: {
    registerExam (examId) {
      // window.location.href = exam.alcaa_product_link
      this.user.registerExam(examId)
          .then( (response) => {
            if (response.data.data.redirect_url) {
              window.location.href = response.data.data.redirect_url
            } else {
              this.$notify({
                group: 'notifs',
                title: 'توجه!',
                text: 'ثبت نام در آزمون با موفقیت انجام شد',
                type: 'success'
              })
            }
          })
    },
    getExamInfo () {
      this.exam.loading = true
      this.exam.show()
      .then( response => {
        this.exam = new Exam(response.data.data)
        this.exam.loading = false
      })
    },
    goToParticipateExamPage() {
      let routeName = 'onlineQuiz.alaaView'
      if (this.exam.type && this.exam.type.value && this.exam.type.value === 'psychometric') {
        routeName = 'onlineQuiz.mbtiBartle'
      }
      this.$router.push({ name: routeName, params: { quizId: this.exam.id, questNumber: 1 } })
    },
  }
}
</script>

<style scoped>

</style>
